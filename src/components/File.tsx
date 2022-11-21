import {
	Popover,
	PopoverTrigger,
	Button,
	Icon,
	PopoverContent,
	PopoverArrow,
	PopoverCloseButton,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	ButtonGroup,
	useDisclosure,
	useToast,
} from "@chakra-ui/react"
import { FC } from "react"
import { IoMdDocument } from "react-icons/io"
import { MdImage } from "react-icons/md"
import { deleteFile, rename } from "../services/files.service"
import { DeleteFileType } from "../types/delete-file.type"
import { FileType } from "../types/file.type"
import { RenameType } from "../types/rename.type"
import CopyFileModal from "./CopyFileModal"
import DeleteConfirmModal from "./DeleteConfirmModal"
import FileContentModal from "./FileContentModal"
import FileInfo from "./FileInfo"
import RenameModal from "./RenameModal"

const File: FC<{ file: FileType }> = ({ file }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
	const { isOpen: isOpenRename, onOpen: onOpenRename, onClose: onCloseRename } = useDisclosure()

	const { isOpen: isOpenCopy, onOpen: onOpenCopy, onClose: onCloseCopy } = useDisclosure()

	const toast = useToast()

	const renameClickHandler = async (data: RenameType) => {
		try {
			const response = await rename(data)
			onCloseRename()
			toast({
				status: "success",
				title: "Renamed",
				description: `File ${response.data} successfully renamed`,
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

	const deleteConfirmHandler = async (data: DeleteFileType) => {
		try {
			const response = await deleteFile(data)
			toast({
				status: "warning",
				title: "Deleted",
				description: `File ${response.data.name} successfully deleted`,
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

	return (
		<>
			<Popover>
				<PopoverTrigger>
					<Button fontSize={"2xl"} w={"full"}>
						{file.mimetype.includes("text") ? (
							<Icon mr={3} as={IoMdDocument} color={"facebook.400"} />
						) : (
							<Icon mr={3} as={MdImage} color={"purple.600"} />
						)}
						{file.name}
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton />
					<PopoverHeader>{file.name}</PopoverHeader>
					<PopoverBody>
						<FileInfo file={file} />
					</PopoverBody>
					<PopoverFooter>
						<ButtonGroup size={"sm"} w={"full"}>
							<Button colorScheme={"blue"} w={"full"} onClick={onOpen}>
								View
							</Button>
							<Button
								colorScheme={"yellow"}
								w={"full"}
								variant={"outline"}
								onClick={onOpenCopy}
							>
								Copy
							</Button>
							<Button
								colorScheme={"orange"}
								w={"full"}
								variant={"outline"}
								onClick={onOpenRename}
							>
								Rename
							</Button>
							<Button
								colorScheme={"red"}
								w={"full"}
								variant={"outline"}
								onClick={onOpenConfirm}
							>
								Delete
							</Button>
						</ButtonGroup>
					</PopoverFooter>
				</PopoverContent>
			</Popover>
			{isOpen && <FileContentModal isOpen={isOpen} onClose={onClose} file={file} />}
			{isOpenConfirm && (
				<DeleteConfirmModal
					isOpen={isOpenConfirm}
					onClose={onCloseConfirm}
					onConfirm={() => deleteConfirmHandler({ folder: file.folder, name: file.name })}
				/>
			)}
			{isOpenRename && (
				<RenameModal
					isOpen={isOpenRename}
					onClose={onCloseRename}
					file={file}
					renameClickHandler={renameClickHandler}
				/>
			)}
			{isOpenCopy && <CopyFileModal isOpen={isOpenCopy} onClose={onCloseCopy} file={file} />}
		</>
	)
}

export default File
