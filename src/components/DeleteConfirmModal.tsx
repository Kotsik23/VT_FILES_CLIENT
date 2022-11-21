import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react"
import { FC } from "react"

type DeleteConfirmModalProps = {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
}

const DeleteConfirmModal: FC<DeleteConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Delete confirmation</ModalHeader>
				<ModalCloseButton />
				<ModalBody>This action cannot be undone</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" onClick={onClose} mr={3}>
						Cancel
					</Button>
					<Button colorScheme={"red"} variant={"outline"} onClick={onConfirm}>
						Confirm
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default DeleteConfirmModal
