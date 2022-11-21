import { EditIcon } from "@chakra-ui/icons"
import {
	IconButton,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverCloseButton,
	PopoverArrow,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	Flex,
	Button,
	Input,
	useDisclosure,
	useToast,
	FormControl,
	FormLabel,
} from "@chakra-ui/react"
import React, { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { rename } from "../services/files.service"

type RenameFolderButtonProps = {
	name: string
}

const RenameFolderButton: FC<RenameFolderButtonProps> = ({ name }) => {
	const { onOpen, onClose, isOpen } = useDisclosure()
	const [newName, setNewName] = useState<string>("")

	const toast = useToast()
	const navigate = useNavigate()

	const newNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewName(e.target.value)
	}

	const clickRenameHandler = async () => {
		try {
			const response = await rename({
				name,
				newName,
			})
			setNewName("")
			navigate(`/${newName}`)
			toast({
				status: "success",
				title: "Success",
				description: `Folder ${name} successfully renamed to ${response.data}`,
				duration: 4000,
				isClosable: true,
			})
			onClose()
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
		<Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
			<PopoverTrigger>
				<IconButton aria-label={"rename folder"} icon={<EditIcon />} />
			</PopoverTrigger>

			<PopoverContent>
				<PopoverCloseButton />
				<PopoverArrow />
				<PopoverHeader>Rename folder {name}</PopoverHeader>

				<PopoverBody>
					<FormControl>
						<FormLabel>Old Name</FormLabel>
						<Input readOnly value={name} mb={2} />
					</FormControl>

					<FormControl>
						<FormLabel>New Name</FormLabel>
						<Input placeholder={"New folder name..."} value={newName} onChange={newNameChange} />
					</FormControl>
				</PopoverBody>

				<PopoverFooter>
					<Flex gap={4}>
						<Button colorScheme={"facebook"} w={"full"} onClick={clickRenameHandler}>
							Confirm
						</Button>
						<Button colorScheme={"red"} variant={"outline"} w={"full"} onClick={onClose}>
							Cancel
						</Button>
					</Flex>
				</PopoverFooter>
			</PopoverContent>
		</Popover>
	)
}

export default RenameFolderButton
