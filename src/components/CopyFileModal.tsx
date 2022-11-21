import {
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Spinner,
	Text,
	useToast,
} from "@chakra-ui/react"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { copyFile } from "../services/files.service"
import { readDirectory } from "../services/folder.service"
import { CopyFileType } from "../types/copy-file.type"
import { FileType } from "../types/file.type"

type CopyFileModalProps = {
	isOpen: boolean
	onClose: () => void
	file: FileType
}

const CopyFileModal: FC<CopyFileModalProps> = ({ isOpen, onClose, file }) => {
	const [folders, setFolders] = useState<string[]>([])
	const [selectedFolder, setSelectedFolder] = useState<string>()
	const [loading, setLoading] = useState(true)
	const [fileName, setFileName] = useState(file.name)

	const toast = useToast()

	const from = `${file.folder}/${file.name}`

	const folderChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedFolder(e.target.value)
	}

	const copyClickHandler = async (data: CopyFileType) => {
		try {
			const response = await copyFile(data)
			onClose()
			toast({
				status: "success",
				title: "Copied",
				description: `File ${response.data.name} successfully copied to ${response.data.folder}`,
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
	}, [])

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			{loading ? (
				<>
					<ModalOverlay>
						<Center minH={"80vh"}>
							<Spinner size={"md"} />
						</Center>
					</ModalOverlay>
				</>
			) : (
				<>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Copy file</ModalHeader>

						<ModalBody>
							<FormControl>
								<FormLabel>From</FormLabel>
								<Input readOnly value={from} />
							</FormControl>

							<FormControl mt={2}>
								<FormLabel>To</FormLabel>
								<Flex alignItems={"center"}>
									<Select placeholder={"Select folder"} value={selectedFolder} onChange={folderChangeHandler}>
										{folders
											.filter(item => item !== file.folder)
											.map((folder, idx) => (
												<option key={idx} value={folder}>
													{folder}
												</option>
											))}
									</Select>
									<Text mx={2} fontSize={"xl"}>
										/
									</Text>
									<Input
										placeholder={"File name..."}
										value={fileName}
										onChange={e => setFileName(e.target.value)}
									/>
								</Flex>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button
								colorScheme={"orange"}
								onClick={() =>
									copyClickHandler({
										from: from,
										to: `${selectedFolder}/${fileName}`,
									})
								}
								mr={3}
							>
								Copy
							</Button>
							<Button colorScheme={"facebook"} variant={"outline"} onClick={onClose}>
								Cancel
							</Button>
						</ModalFooter>
					</ModalContent>
				</>
			)}
		</Modal>
	)
}

export default CopyFileModal
