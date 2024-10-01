
export interface StudentModel {
    id: string,
    name: string,
    class: string,
    phoneNum?: string
    creationDate?: Date | null,
    createdBy?: string,
    deletedBy?: string,
    deletionDate?: Date | null,
    modifiedBy?: string,
    modifiedDate?: Date | null,
    version: number
}

export interface StudentModelRes {
    data: Array<StudentModel>
}