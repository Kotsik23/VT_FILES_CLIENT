import { Heading, useColorModeValue } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"

const AppHeading: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const headingColor = useColorModeValue("gray.700", "gray.100")

	return (
		<Heading size={"xl"} color={headingColor} mb={6}>
			{children}
		</Heading>
	)
}

export default AppHeading
