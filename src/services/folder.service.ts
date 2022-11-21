import { instance } from "./axios"

export const readDirectory = async () => {
	return instance.get<string[]>("/folder")
}

export const createFolder = async (data: { folder: string }) => {
	return instance.post<string>("/folder", data)
}

export const deleteFolder = async (data: { name: string }) => {
	return instance.post<string>("/folder/delete", data)
}
