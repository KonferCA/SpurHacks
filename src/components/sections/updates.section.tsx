import { useEffect } from "react";
import { Box, Flex, Text, Button, Heading, Link } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { useSpline } from "../../providers/SplineProvider";

export const UpdatesSection = () => {
  const splineId = "updates-spline";
  const splineSceneUrl =
    "https://prod.spline.design/TmAYMNy2qJHyDE9m/scene.splinecode";

  // 1) grab the two provider methods
  const { registerSpline, setVisible } = useSpline();

  // 2) track when this section scrolls into view
  const { ref: portalRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // 3) register this spline once
  useEffect(() => {
    registerSpline(splineId, splineSceneUrl);
  }, [registerSpline]);

  // 4) toggle its visibility by inView
  useEffect(() => {
    setVisible(splineId, inView);
  }, [inView, setVisible]);

  return (
    <Flex className="relative bg-black min-h-screen" ref={portalRef}>
      {/*
        5) this Box is your portal target.
           The provider will portal the actual <Spline> here,
           and fade it in/out based on the visibility flag.
      */}
      <Box
        id={`spline-portal-${splineId}`}
        position="absolute"
        top="0"
        left="0"
        width="50%"
        height="100%"
        zIndex={0}
      />

      {/*
        6) your overlaid copy/buttons remain unchanged
      */}
      <Flex
        direction="column"
        gap={8}
        w="70%"
        justify="center"
        align="flex-end"
        className="
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          md:static md:translate-x-0 md:translate-y-0
          md:bg-gradient-to-l from-black/70 to-transparent
          z-10
        "
      >
        <Flex
          direction="column"
          maxW="480px"
          gap={6}
          fontWeight="extralight"
          mr={{ base: 0, md: 12 }}
          className="text-white"
        >
          <Heading fontSize={["xl", "2xl", "3xl", "4xl"]}>
            Stay in the know
          </Heading>
          <Text
            color="white"
            fontFamily="Geist"
            fontSize={{ base: "sm", md: "md" }}
            mb={8}
          >
            Get the latest updates from our Discord server accusamus et iusto
            odio dignissimos ducimus qui blanditiis praesentium voluptatum
            deleniti.
          </Text>
          <Link href="https://discord.gg/spurhacks" target="_blank">
            <Button
              size={{ base: "sm", md: "md" }}
              bg="#FFA75F"
              color="black"
              borderRadius="full"
              px={6}
              py={4}
              mt={-8}
              width={{ base: "100%", md: "auto" }}
              _hover={{ bg: "#FFA75F", opacity: 0.9 }}
              rel="noopener noreferrer"
            >
              TAKE ME THERE
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
