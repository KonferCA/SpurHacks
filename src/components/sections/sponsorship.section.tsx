import { Quanta, Quark, Entang, Sing } from "@assets";
import {
	Heading,
	Text,
	Button,
	Flex,
	Box,
	Image,
	Grid,
	Stack,
	Link,
} from "@chakra-ui/react";

export const Sponsorship = () => {
	const singularitySponsors = [
		{
			name: "Snglrty Co.",
			image: Sing,
			slogan: "Which came first, the chicken or chicken jockey?",
		},
		{
			name: "Snglrty Co.",
			image: Sing,
			slogan: "Which came first, the chicken or chicken jockey?",
		},
	];

	const entanglementSponsors = [
		{
			name: "Company",
			image: Entang,
		},
		{
			name: "Company",
			image: Entang,
		},
		{
			name: "Company",
			image: Entang,
		},
	];

	const quarkSponsors = [
		{
			name: "Company",
			image: Quark,
		},
		{
			name: "Company",
			image: Quark,
		},
		{
			name: "Company",
			image: Quark,
		},
	];

	const quantaSponsors = [
		{
			name: "This Company",
			image: Quanta,
		},
		{
			name: "This Company",
			image: Quanta,
		},
		{
			name: "This Company",
			image: Quanta,
		},
		{
			name: "This Company",
			image: Quanta,
		},
		{
			name: "This Company",
			image: Quanta,
		},
		{
			name: "This Company",
			image: Quanta,
		},
		{
			name: "This Company",
			image: Quanta,
		},
	];

	const partners = [
		{
			name: "Konfer",
			image: Quanta,
		},
		{
			name: "Konfer",
			image: Quanta,
		},
		{
			name: "Konfer",
			image: Quanta,
		},
	];

	// Reusable width for all tiers
	const MAX_WIDTH = "1200px";

	return (
		<div className="bg-black text-white min-h-screen grid place-items-center">
			<Flex
				direction="column"
				gap={20}
				py={20}
				align="center"
				justify="center"
				textAlign="center"
				className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:90px_90px]"
			>
				{/* Header and Text */}
				<Flex
					direction="column"
					gap={8}
					align="center"
					justify="center"
					textAlign="center"
					className="max-w-3xl"
				>
					<Heading fontSize={["2xl", "3xl", "4xl", "5xl"]}>
						Sponsor a Special Weekend
					</Heading>
					<Text>
						Placerat maecenas aliquam primis duis viverra integer.
						Vehicula nulla bibendum facilisis per quis vehicula
						risus donec euismod. Curabitur aliquet sem vel fermentum
						lacinia. Aliquam sodales neque lorem, aliquam luctus
						tellus viverra ut. Curabitur.
					</Text>
					<Text>
						Vehicula nulla bibendum facilisis per
						<strong> sponsors@spurhacks.com.</strong>
					</Text>
					<Link href="https://konfer.ca">
						<Button
							color="black"
							background="orange.default"
							rounded="full"
							p={5}
							_hover={{ bg: "orange.hover" }}
							transition="all 0.3s ease-in-out"
						>
							BECOME A SPONSOR
						</Button>
					</Link>
				</Flex>

				<Stack gap={{ base: 10, lg: 20 }} align="center" w="90%">
					{/* SINGULARITY SPONSORS (1RST) */}
					<Box w="full" maxW={MAX_WIDTH} mx="auto">
						<Grid
							templateColumns="1fr"
							gap={{ base: 6, lg: 10 }}
							justifyItems="center"
						>
							{singularitySponsors.map((sponsor, index) => (
								<Box
									key={index}
									bg="offWhite"
									rounded="3xl"
									w="full"
									h={{ base: "200px", md: "180px" }}
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									<Image
										src={sponsor.image}
										alt={sponsor.name}
										boxSize={{ base: "200px", md: "180px" }}
										objectFit="contain"
										py={6}
									/>
								</Box>
							))}
						</Grid>
					</Box>
					{/* ENTANGLEMENT SPONSORS (2ND) */}
					<Box w="full" maxW={MAX_WIDTH} mx="auto">
						<Grid
							templateColumns={{
								base: "repeat(1, 1fr)",
								md: "repeat(2, 1fr)",
							}}
							gap={{ base: 6, lg: 10 }}
							justifyItems="center"
						>
							{entanglementSponsors.map((sponsor, index) => {
								const isLastItem =
									index === entanglementSponsors.length - 1;
								const isOdd =
									entanglementSponsors.length % 2 === 1;

								return (
									<Box
										key={index}
										bg="offWhite"
										rounded="3xl"
										w="full"
										h={{ base: "150px", md: "150px" }}
										display="flex"
										alignItems="center"
										justifyContent="center"
										gridColumn={{
											base: "auto",
											md:
												isLastItem && isOdd
													? "1 / span 2"
													: "auto",
										}}
										justifySelf={{
											base: "stretch",
											md:
												isLastItem && isOdd
													? "center"
													: "stretch",
										}}
										maxWidth={{
											base: "100%",
											md:
												isLastItem && isOdd
													? "50%"
													: "100%",
										}}
									>
										<Image
											src={sponsor.image}
											alt={sponsor.name}
											boxSize={{
												base: "100px",
												md: "150px",
											}}
											objectFit="contain"
											py={5}
										/>
									</Box>
								);
							})}
						</Grid>
					</Box>
					{/* QUARK SPONSORS (3RD) */}
					<Box w="full" maxW={MAX_WIDTH} mx="auto">
						<Grid
							templateColumns={{
								base: "repeat(2, 1fr)",
								md: "repeat(3, 1fr)",
							}}
							gap={{ base: 6, lg: 10 }}
							justifyItems="center"
						>
							{quarkSponsors.map((sponsor, index) => {
								const isLastItem =
									index === quarkSponsors.length - 1;
								const isOdd = quarkSponsors.length % 2 === 1;

								return (
									<Box
										key={index}
										bg="offWhite"
										rounded="3xl"
										w="full"
										h={{ base: "auto", md: "150px" }}
										display="flex"
										alignItems="center"
										justifyContent="center"
										gridColumn={{
											base:
												isLastItem && isOdd
													? "1 / span 2"
													: "auto",
											md: "auto",
										}}
										justifySelf={{
											base:
												isLastItem && isOdd
													? "center"
													: "stretch",
											md: "stretch",
										}}
										maxWidth={{
											base:
												isLastItem && isOdd
													? "50%"
													: "100%",
											md: "100%",
										}}
									>
										<Image
											src={sponsor.image}
											alt={sponsor.name}
											boxSize={{
												base: "100px",
												md: "150px",
											}}
											objectFit="contain"
											py={5}
										/>
									</Box>
								);
							})}
						</Grid>
					</Box>
					{/* QUANTA SPONSORS (4TH) */}
					<Box w="full" maxW={MAX_WIDTH} mx="auto">
						<Flex
							wrap="wrap"
							justify="center"
							gap={6}
							maxW={MAX_WIDTH}
							mx="auto"
							w="full"
						>
							{quantaSponsors.map((sponsor, index) => (
								<Box
									key={index}
									bg="offWhite"
									rounded="3xl"
									flex={{ base: "1 1 45%", md: "1 1 21%" }}
									maxW={{ base: "45%", md: "22%" }}
									minW="150px"
									h={{ base: "100px", md: "125px" }}
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									<Image
										src={sponsor.image}
										alt={sponsor.name}
										boxSize={{ base: "100px", md: "125px" }}
										objectFit="contain"
										py={5}
									/>
								</Box>
							))}
						</Flex>
					</Box>
				</Stack>
				<Stack gap={{ base: 10, lg: 20 }} align="center" w="90%">
					<Heading fontSize={["2xl", "3xl", "4xl", "5xl"]}>
						Our Partners
					</Heading>
					{/* QUARK SPONSORS (3RD) */}
					<Box w="full" maxW={MAX_WIDTH} mx="auto">
						<Grid
							templateColumns={{
								base: "repeat(2, 1fr)",
								md: "repeat(3, 1fr)",
							}}
							gap={{ base: 6, lg: 10 }}
							justifyItems="center"
						>
							{partners.map((sponsor, index) => {
								const isLastItem =
									index === partners.length - 1;
								const isOdd = partners.length % 2 === 1;

								return (
									<Box
										key={index}
										bg="offWhite"
										rounded="3xl"
										w="full"
										h={{ base: "auto", md: "125px" }}
										display="flex"
										alignItems="center"
										justifyContent="center"
										gridColumn={{
											base:
												isLastItem && isOdd
													? "1 / span 2"
													: "auto",
											md: "auto",
										}}
										justifySelf={{
											base:
												isLastItem && isOdd
													? "center"
													: "stretch",
											md: "stretch",
										}}
										maxWidth={{
											base:
												isLastItem && isOdd
													? "50%"
													: "100%",
											md: "100%",
										}}
									>
										<Image
											src={sponsor.image}
											alt={sponsor.name}
											boxSize={{
												base: "100px",
												md: "125px",
											}}
											objectFit="contain"
											py={5}
										/>
									</Box>
								);
							})}
						</Grid>
					</Box>
				</Stack>
			</Flex>
		</div>
	);
};
