
export interface StudentModel {
    id: string,
    name: string,
    class: string,
    phoneNum?: string
    creationDate?: Date,
    createdBy?: string,
    deletedBy?: string,
    deletionDate?: Date,
    modifiedBy?: string,
    modifiedDate?: Date
}

export interface StudentModelRes {
    data: Array<StudentModel>
}