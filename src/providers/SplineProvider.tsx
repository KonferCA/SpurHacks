// SplineProvider.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Spline from "@splinetool/react-spline";

type Entry = { url: string; loaded: boolean; visible: boolean };
type Store = Record<string, Entry>;

interface Context {
  registerSpline(id: string, url: string): void;
  setVisible(id: string, visible: boolean): void;
}
const SplineContext = createContext<Context>({
  registerSpline: () => {},
  setVisible: () => {},
});
export const useSpline = () => useContext(SplineContext);

export const SplineProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [splines, setSplines] = useState<Store>({});

  const registerSpline = useCallback((id: string, url: string) => {
    setSplines((prev) =>
      prev[id]
        ? prev
        : {
            ...prev,
            [id]: { url, loaded: false, visible: false },
          }
    );
  }, []);

  const setVisible = useCallback((id: string, visible: boolean) => {
    setSplines((prev) =>
      prev[id] ? { ...prev, [id]: { ...prev[id], visible } } : prev
    );
  }, []);

  return (
    <SplineContext.Provider value={{ registerSpline, setVisible }}>
      {children}

      {Object.entries(splines).map(([id, { url, loaded, visible }]) => {
        const container = document.getElementById(`spline-portal-${id}`);
        if (!container) return null;

        return createPortal(
          <div
            key={id}
            style={{
              width: "100%",
              height: "100%",
              opacity: visible ? 1 : 0,
              pointerEvents: visible ? "auto" : "none",
              transition: "opacity 0.3s ease",
            }}
          >
            <Spline
              scene={url}
              onLoad={() =>
                setSplines((prev) => ({
                  ...prev,
                  [id]: { ...prev[id], loaded: true },
                }))
              }
              style={{
                width: "100%",
                height: "100%",
                opacity: loaded ? 1 : 0,
                transition: "opacity 0.3s ease-in",
              }}
            />
          </div>,
          container
        );
      })}
    </SplineContext.Provider>
  );
};
