export interface FileType {
	id: number
	name: string
	url: string
	size: number
	isOverwritten: boolean
	isConcat: boolean
	isSaved: boolean
	folder: string
	mimetype: string
	createdAt: Date
	updatedAt: Date
}
