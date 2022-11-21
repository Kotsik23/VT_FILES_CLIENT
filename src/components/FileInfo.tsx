import { Text, VStack } from "@chakra-ui/react"
import { FC } from "react"
import { FileType } from "../types/file.type"
import moment from "moment"
import "moment/locale/ru"

const FileInfo: FC<{ file: FileType }> = ({ file }) => {
	return (
		<VStack alignItems={"flex-start"}>
			<Text>Size: {Math.floor(file.size / 1000)} kb</Text>
			<Text>Type: {file.mimetype}</Text>
			<Text>Created: {moment(file.createdAt).locale("ru").format("lll")}</Text>
			<Text>Updated: {moment(file.updatedAt).locale("ru").format("lll")}</Text>
			<Text>Folder: {file.folder}</Text>
			<Text>IsSaved: {file.isSaved.toString()}</Text>
			<Text>Is Overwritten: {file.isOverwritten.toString()}</Text>
			<Text>Is Concat: {file.isConcat.toString()}</Text>
		</VStack>
	)
}

export default FileInfo
