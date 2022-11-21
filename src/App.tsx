import { Route, Routes } from "react-router-dom"
import FolderFiles from "./components/FolderFiles"
import Root from "./components/Root"

const App = () => {
	return (
		<Routes>
			<Route path={"/"} element={<Root />}>
				<Route path=":folder" element={<FolderFiles />} />
			</Route>
		</Routes>
	)
}

export default App
