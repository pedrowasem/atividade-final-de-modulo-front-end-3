export default interface NotesModel {
	id: string;
	title: string;
	description: string;
	createdAt: string;
	modified?: boolean;
	modifiedAt?: string;
	createdBy: string;
}
