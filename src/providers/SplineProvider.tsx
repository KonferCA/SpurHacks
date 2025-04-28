import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface SplineContextType {
  activeSpline: string | null;
  setActiveSpline: (id: string | null) => void;
  registerSpline: (id: string) => void;
  unregisterSpline: (id: string) => void;
}

const SplineContext = createContext<SplineContextType>({
  activeSpline: null,
  setActiveSpline: () => {},
  registerSpline: () => {},
  unregisterSpline: () => {},
});

export const useSpline = () => useContext(SplineContext);

export const SplineProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeSpline, setActiveSpline] = useState<string | null>(null);
  const [registeredSplines, setRegisteredSplines] = useState<Set<string>>(
    new Set()
  );

  // Use useCallback to memoize these functions to prevent recreation on every render
  const registerSpline = useCallback((id: string) => {
    setRegisteredSplines((prev) => {
      // Check if the spline is already registered to avoid unnecessary updates
      if (!prev.has(id)) {
        const newSet = new Set(prev);
        newSet.add(id);
        return newSet;
      }
      return prev;
    });
  }, []);

  const unregisterSpline = useCallback((id: string) => {
    setRegisteredSplines((prev) => {
      // Only update if the spline is actually registered
      if (prev.has(id)) {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      }
      return prev;
    });
  }, []);

  // Handle visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setActiveSpline(null);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Check if the active spline is still registered
  useEffect(() => {
    if (activeSpline && !registeredSplines.has(activeSpline)) {
      setActiveSpline(null);
    }
  }, [activeSpline, registeredSplines]);

  // Provide memoized value to avoid unnecessary re-renders
  const value = React.useMemo(
    () => ({
      activeSpline,
      setActiveSpline,
      registerSpline,
      unregisterSpline,
    }),
    [activeSpline, registerSpline, unregisterSpline]
  );

  return (
    <SplineContext.Provider value={value}>{children}</SplineContext.Provider>
  );
};
