import { UserRoleEnum } from "../../../../shared/models/new/user-role-enum";

export interface AttendanceModel {
    studentId: string,
    studentName: string,
    attendance: boolean,
    day: Date, // date of attendance
    markedby: string,
    markedDate: Date | null // marked Date,
    quiz: boolean
}