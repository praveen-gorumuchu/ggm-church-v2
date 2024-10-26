import { AttendanceStatusEnum, QuizParticipantStatus } from "../quiz-models/attendance/attendance.model"

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
    version: number,
    //attendance and quiz added for temprorary, should be removed after new logic implemented
    attendance?: AttendanceStatusEnum
    quiz?: QuizParticipantStatus
}

export interface StudentModelRes {
    data: Array<StudentModel>
}

