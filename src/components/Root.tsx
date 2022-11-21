import { Center, Container, Spinner, SimpleGrid, Button, Icon, Stack, Input, useToast } from "@chakra-ui/react"
import React, { useState, useEffect } from "react"
import { createFolder, readDirectory } from "../services/folder.service"
import { MdFolder, MdAdd } from "react-icons/md"
import { Link, Outlet } from "react-router-dom"
import ToggleColorModeButton from "./ToggleColorModeButton"
import AppHeading from "./AppHeading"

const Root = () => {
	const [folders, setFolders] = useState<string[]>([])
	const [loading, setLoading] = useState(true)
	const [folderName, setFolderName] = useState<string>("")

	const toast = useToast()

	const folderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFolderName(e.target.value)
	}

	// eslint-disable-next-line
	const createClickHandler = async (data: { folder: string }) => {
		if (!data.folder) {
			return
		}
		try {
			const response = await createFolder(data)
			setFolderName("")
			toast({
				status: "success",
				title: "Success",
				description: `Folder ${response.data} successfully created`,
				duration: 4000,
				isClosable: true,
			})
		} catch (error: any) {
			toast({
				status: "error",
				title: error.response.data.error,
				description: error.response.data.message,
				duration: 4000,
				isClosable: true,
			})
		}
	}

	useEffect(() => {
		readDirectory().then(({ data }) => {
			setFolders(data)
			setLoading(false)
		})
	}, [createClickHandler])

	return (
		<>
			<Center minH={"70vh"} justifyContent={"flex-start"} flexDir={"column"} my={16}>
				<Container maxW={"container.lg"} rounded={"2xl"} shadow={"xl"} p={6}>
					<AppHeading>Root</AppHeading>
					<Stack direction={"row"} gap={2} mb={4}>
						<Input placeholder={"Folder name..."} value={folderName} onChange={folderNameChange} />
						<Button
							colorScheme={"facebook"}
							rightIcon={<MdAdd />}
							w={"full"}
							flexShrink={1.5}
							onClick={() => createClickHandler({ folder: folderName })}
						>
							Create folder
						</Button>
					</Stack>

					{loading ? (
						<Spinner size={"md"} />
					) : (
						<SimpleGrid columns={3} spacing={3}>
							{folders.map((folder, idx) => (
								<Button key={idx} fontSize={"2xl"} w={"full"} as={Link} to={`/${folder}`}>
									<Icon mr={3} as={MdFolder} color={"facebook.400"} />
									{folder}
								</Button>
							))}
						</SimpleGrid>
					)}
				</Container>
				<Outlet />
			</Center>
			<ToggleColorModeButton />
		</>
	)
}

export default Root
