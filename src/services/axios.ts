import axios from "axios"

export const instance = axios.create({
	baseURL: "http://localhost:8001/api/files",
})
