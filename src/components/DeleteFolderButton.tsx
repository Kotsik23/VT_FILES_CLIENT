import { DeleteIcon } from "@chakra-ui/icons"
import { IconButton, Tooltip, useDisclosure, useToast } from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteFolder } from "../services/folder.service"
import DeleteConfirmModal from "./DeleteConfirmModal"

const DeleteFolderButton = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const { folder } = useParams<string>()

	const toast = useToast()
	const navigate = useNavigate()

	const confirmClickHandler = async (folder: string) => {
		try {
			const response = await deleteFolder({ name: folder })
			onClose()
			toast({
				status: "warning",
				title: "Success",
				description: `Folder ${response.data} successfully deleted`,
				duration: 4000,
				isClosable: true,
			})
			navigate("/")
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
			<Tooltip label={"Delete folder"}>
				<IconButton
					aria-label="delete folder"
					icon={<DeleteIcon />}
					colorScheme={"red"}
					variant={"outline"}
					onClick={onOpen}
				/>
			</Tooltip>
			{isOpen && (
				<DeleteConfirmModal isOpen={isOpen} onClose={onClose} onConfirm={() => confirmClickHandler(folder!)} />
			)}
		</>
	)
}

export default DeleteFolderButton
