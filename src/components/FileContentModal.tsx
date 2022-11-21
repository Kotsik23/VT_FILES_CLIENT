import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Text,
	Image,
} from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { getFileContent } from "../services/files.service"
import { FileType } from "../types/file.type"

type FileContentModalProps = {
	isOpen: boolean
	onClose: () => void
	file: FileType
}

const FileContentModal: FC<FileContentModalProps> = ({ isOpen, onClose, file }) => {
	const [fileContent, setFileContent] = useState<string>("")
	const [isImage, setIsImage] = useState(false)

	useEffect(() => {
		if (file.mimetype.includes("text")) {
			getFileContent(file.url).then(({ data }) => setFileContent(data))
		} else {
			setIsImage(true)
		}
	}, [file])

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>File content</ModalHeader>
				<ModalCloseButton />
				<ModalBody justifyContent={"center"} display={"flex"} w={"full"}>
					{isImage ? (
						<Image boxSize={300} objectFit={"cover"} alt={file.name} src={file.url} />
					) : (
						<Text>{fileContent}</Text>
					)}
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default FileContentModal
