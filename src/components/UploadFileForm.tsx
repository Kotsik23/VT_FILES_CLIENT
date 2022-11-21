import { Button, Flex, IconButton, Input, Tooltip, useToast, VStack, Text } from "@chakra-ui/react"
import { Dispatch, FC, SetStateAction, useRef, useState } from "react"
import { BsFileArrowUp } from "react-icons/bs"
import { GrPowerReset } from "react-icons/gr"
import { SmallAddIcon } from "@chakra-ui/icons"
import { uploadFile } from "../services/files.service"
import { useParams } from "react-router-dom"
import { FileType } from "../types/file.type"
import FileInfo from "./FileInfo"

type UploadFileFormProps = {
	setFiles: Dispatch<SetStateAction<FileType[]>>
}

const UploadFileForm: FC<UploadFileFormProps> = ({ setFiles }) => {
	const [file, setFile] = useState<File>()
	const inputRef = useRef<HTMLInputElement>(null)

	const { folder } = useParams<string>()
	const toast = useToast()

	const uploadClickHandler = async () => {
		try {
			const formData = new FormData()

			formData.append("file", file!)
			const response = await uploadFile(formData, folder!)
			setFile(undefined)
			setFiles(prev => [...prev, response.data])
			toast({
				status: "success",
				title: "Success",
				description: (
					<VStack>
						<Text>{`File ${response.data.name} successfully uploaded`}</Text>
						<FileInfo file={response.data} />
					</VStack>
				),
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

	const openUpload = () => {
		inputRef.current?.click()
	}

	return (
		<Flex alignItems={"center"} gap={4}>
			<Button
				w={"full"}
				onClick={openUpload}
				colorScheme={file ? "green" : "facebook"}
				variant={file ? "solid" : "outline"}
				leftIcon={<BsFileArrowUp />}
			>
				<Input
					type={"file"}
					placeholder={"Select file..."}
					ref={inputRef}
					hidden
					accept=".txt, .png, .jpg, .jpeg, .gif"
					multiple={false}
					onChange={() => setFile(inputRef.current?.files![0])}
				/>
				{file ? file.name : "Select file"}
			</Button>
			<Tooltip label={"Upload file"}>
				<Button
					leftIcon={<SmallAddIcon />}
					colorScheme={"facebook"}
					w={"full"}
					flexShrink={1.6}
					onClick={uploadClickHandler}
				>
					Upload
				</Button>
			</Tooltip>
			<Tooltip label={"Reset file"}>
				<IconButton
					disabled={!file}
					aria-label={"reset file"}
					icon={<GrPowerReset />}
					onClick={() => setFile(undefined)}
					colorScheme={"facebook"}
				/>
			</Tooltip>
		</Flex>
	)
}

export default UploadFileForm
