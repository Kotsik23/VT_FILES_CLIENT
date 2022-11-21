import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import theme from "./theme"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<BrowserRouter>
		<ChakraProvider resetCSS theme={theme}>
			<App />
		</ChakraProvider>
	</BrowserRouter>
)
