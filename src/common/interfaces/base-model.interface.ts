export interface BaseModel {
  id: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string | null;
}
