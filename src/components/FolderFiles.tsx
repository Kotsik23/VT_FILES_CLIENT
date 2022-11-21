import { Container, Flex, Heading, IconButton, SimpleGrid, Spinner, Stack } from "@chakra-ui/react"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getFilesInFolder } from "../services/files.service"
import { FileType } from "../types/file.type"
import { ArrowBackIcon } from "@chakra-ui/icons"
import File from "./File"
import RenameFolderButton from "./RenameFolderButton"
import DeleteFolderButton from "./DeleteFolderButton"
import UploadFileForm from "./UploadFileForm"

const FolderFiles = () => {
	const [files, setFiles] = useState<FileType[]>([])
	const [loading, setLoading] = useState(true)

	const { folder } = useParams<string>()

	useEffect(() => {
		getFilesInFolder(folder!).then(({ data }) => {
			setFiles(data)
			setLoading(false)
		})
	}, [folder, files])

	return (
		<Container maxW={"container.lg"} rounded={"2xl"} shadow={"xl"} p={6} mt={16}>
			{loading ? (
				<Spinner size={"md"} />
			) : (
				<>
					<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
						<Flex alignItems={"center"} gap={4} mb={6}>
							<Heading size={"lg"}>Folder: {folder}</Heading>
							<RenameFolderButton name={folder!} />
							<DeleteFolderButton />
						</Flex>
						<IconButton aria-label="back to root" icon={<ArrowBackIcon />} as={Link} to={"/"} />
					</Stack>
					<UploadFileForm setFiles={setFiles} />
					<SimpleGrid columns={3} spacing={3} mt={6}>
						{files.map(file => (
							<File file={file} key={file.id} />
						))}
					</SimpleGrid>
				</>
			)}
		</Container>
	)
}

export default FolderFiles
