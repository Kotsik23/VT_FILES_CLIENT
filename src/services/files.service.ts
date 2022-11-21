import axios from "axios"
import { CopyFileType } from "../types/copy-file.type"
import { DeleteFileType } from "../types/delete-file.type"
import { FileType } from "../types/file.type"
import { RenameType } from "../types/rename.type"
import { instance } from "./axios"

export const getFilesInFolder = async (folder: string) => {
	return instance.get<FileType[]>(`/folder/${folder}`)
}

export const getFileContent = async (url: string) => {
	return axios.get(url)
}

export const rename = async (data: RenameType) => {
	return instance.patch("", data)
}

export const uploadFile = async (data: FormData, folder: string) => {
	return instance.post<FileType>(`?folder=${folder}`, data)
}

export const deleteFile = async (data: DeleteFileType) => {
	return instance.post<FileType>("/delete", data)
}

export const copyFile = async (data: CopyFileType) => {
	return instance.patch<FileType>("/copy", data)
}
