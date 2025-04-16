import Spline from "@splinetool/react-spline";
import { HorizontalLogo } from "../assets/";
import { Link, Text, HStack, Image } from "@chakra-ui/react";

export const Landing = () => {
    return (
        <main>
            <div className="w-screen h-screen flex flex-col items-center justify-center">
                <Spline
                    scene="https://prod.spline.design/TmAYMNy2qJHyDE9m/scene.splinecode"
                    className="w-screen h-screen absolute top-0 left-0 z-0"
                />
                <div className="text-white text-bold w-full h-full z-10 flex flex-col items-center justify-center gap-10">
                    <Image src={HorizontalLogo} px={6} />

                    <HStack
                        fontSize={["xs", "lg", "2xl"]}
                        gap={6}
                        justify="center"
                        fontFamily="Geist"
                    >
                        <Text>June 20-22, 2025</Text>
                        <Text>|</Text>
                        <Text>In-person</Text>
                        <Text>|</Text>
                        <Text>Waterloo, ON</Text>
                    </HStack>

                    <Text fontFamily="Geist">
                        <Link
                            href="https://linktr.ee/spurhacks"
                            target="_blank"
                            color="white"
                            fontSize={["xs", "sm", "md"]}
                        >
                            Coming soon – stay tuned!
                        </Link>
                    </Text>
                </div>
            </div>
        </main>
    );
};
