import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react"
import { FC, useState } from "react"
import { FileType } from "../types/file.type"
import { RenameType } from "../types/rename.type"

type RenameModalProps = {
	isOpen: boolean
	onClose: () => void
	renameClickHandler: (data: RenameType) => void
	file: FileType
}

const RenameModal: FC<RenameModalProps> = ({ isOpen, onClose, renameClickHandler, file }) => {
	const [newName, setNewName] = useState<string>(file.name)

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Rename file</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl>
						<FormLabel>New file name</FormLabel>
						<Input value={newName} onChange={e => setNewName(e.target.value)} />
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button
						colorScheme={"orange"}
						mr={3}
						onClick={() =>
							renameClickHandler({
								name: file.name,
								folder: file.folder,
								newName: newName,
							})
						}
					>
						Rename
					</Button>
					<Button colorScheme={"facebook"} variant={"outline"} onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default RenameModal
