import { Flex, Heading, Text, Box } from "@chakra-ui/react";
import { CountUp } from "@components";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSpline } from "../../providers/SplineProvider";

export const Statistics = () => {
  // 1) pick a unique ID
  const splineId = "statistics-spline";
  const splineSceneUrl =
    "https://prod.spline.design/TmAYMNy2qJHyDE9m/scene.splinecode";

  // 2) grab the provider methods
  const { registerSpline, setVisible } = useSpline();

  // 3) track scroll-into-view
  const { ref: portalRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // 4) register this spline once on mount
  useEffect(() => {
    registerSpline(splineId, splineSceneUrl);
  }, [registerSpline]);

  // 5) flip visibility whenever inView changes
  useEffect(() => {
    setVisible(splineId, inView);
  }, [inView, setVisible]);

  return (
    <Flex className="relative bg-black min-h-screen" ref={portalRef}>
      {/* 6) this is where the provider will portal in your Spline */}
      <Box
        id={`spline-portal-${splineId}`}
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex={0}
      />

      {/* 7) your overlaid stats */}
      <Flex
        direction="column"
        gap={8}
        w="70%"
        justify="center"
        align="center"
        className="
          absolute top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2
          md:static md:translate-x-0 md:translate-y-0
          md:bg-gradient-to-l from-black/70 to-transparent
          z-10
        "
      >
        <Flex
          gap={[10, 20]}
          direction="column"
          fontWeight="extralight"
          className="text-white"
        >
          <Flex direction="column" gap={6}>
            <Text fontFamily="Geist">Prize Value</Text>
            <Heading
              fontFamily="Geist"
              fontSize={["5xl", "7xl"]}
              color="white"
              fontWeight="light"
            >
              <CountUp to={100} prefix="$" suffix="k+" />
            </Heading>
          </Flex>
          <Flex direction="column" gap={6}>
            <Text fontFamily="Geist">Participants</Text>
            <Heading
              fontFamily="Geist"
              fontSize={["5xl", "7xl"]}
              color="white"
              fontWeight="light"
            >
              <CountUp to={2000} />
            </Heading>
          </Flex>
          <Flex direction="column" gap={6}>
            <Text fontFamily="Geist">Valuation</Text>
            <Heading
              fontFamily="Geist"
              fontSize={["5xl", "7xl"]}
              color="white"
              fontWeight="light"
            >
              <CountUp to={23.4} suffix="B" allowDecimal />
            </Heading>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
