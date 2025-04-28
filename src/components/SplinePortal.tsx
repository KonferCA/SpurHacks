import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Spline from "@splinetool/react-spline";
import { Box } from "@chakra-ui/react";

interface SplinePortalProps {
  sceneUrl: string;
  id: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: (error: any) => void;
  visible: boolean;
}

export const SplinePortal = ({
  sceneUrl,
  id,
  style = {},
  onLoad,
  onError,
  visible,
}: SplinePortalProps) => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );
  const [isReady, setIsReady] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const splineLoaded = useRef(false);
  const portalRef = useRef<HTMLElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Create or find the portal container
    let element = document.getElementById(`spline-portal-${id}`);
    if (!element) {
      element = document.createElement("div");
      element.id = `spline-portal-${id}`;
      element.style.position = "fixed";
      element.style.top = "0";
      element.style.left = "0";
      element.style.width = "100%";
      element.style.height = "100%";
      element.style.pointerEvents = "none";
      element.style.zIndex = "-1";
      element.style.display = "none"; // Hide by default
      document.body.appendChild(element);
    }

    portalRef.current = element;

    // Wait a frame before initializing to ensure DOM is ready
    requestAnimationFrame(() => {
      setPortalContainer(element);
      setIsReady(true);
    });

    // Clean up on unmount
    return () => {
      if (element && element.parentNode) {
        element.style.display = "none";
      }
    };
  }, [id]);

  // Handle visibility changes
  useEffect(() => {
    if (!portalRef.current) return;

    if (visible) {
      // Only show when visible and ready
      portalRef.current.style.display = "block";
      portalRef.current.style.zIndex = "-1";

      // Delay rendering for a moment to ensure container is ready
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, 100);

      return () => clearTimeout(timer);
    } else {
      // Hide when not visible
      portalRef.current.style.display = "none";
      portalRef.current.style.zIndex = "-10";
      setShouldRender(false);
    }
  }, [visible]);

  // Add container size tracking
  useEffect(() => {
    if (!portalContainer || !visible) return;

    // Check container dimensions
    const updateSize = () => {
      setContainerSize({
        width: portalContainer.clientWidth,
        height: portalContainer.clientHeight,
      });
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(portalContainer);

    return () => resizeObserver.disconnect();
  }, [portalContainer, visible]);

  const handleLoad = () => {
    splineLoaded.current = true;
    if (onLoad) onLoad();
  };

  const handleError = (error: any) => {
    console.error(`Spline (${id}) loading error:`, error);
    if (onError) onError(error);
  };

  // Only render Spline if container has non-zero dimensions
  if (
    !portalContainer ||
    !isReady ||
    !visible ||
    !shouldRender ||
    !containerSize.width ||
    !containerSize.height
  ) {
    return null;
  }

  return createPortal(
    <Box
      position="absolute"
      top="0"
      left="0"
      width="100%"
      height="100%"
      pointerEvents="none"
      transition="opacity 0.5s ease-in"
    >
      <Spline
        scene={sceneUrl}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: visible ? "auto" : "none",
          ...style,
        }}
      />
    </Box>,
    portalContainer
  );
};
