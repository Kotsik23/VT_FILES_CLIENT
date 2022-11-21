import { IconButton, useColorMode } from "@chakra-ui/react"
import { MdLightMode, MdDarkMode } from "react-icons/md"

const ToggleColorModeButton = () => {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<IconButton aria-label="color-mode" onClick={toggleColorMode} position={"absolute"} top={-6} right={10}>
			{colorMode === "dark" ? <MdDarkMode /> : <MdLightMode />}
		</IconButton>
	)
}

export default ToggleColorModeButton
