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

export enum AttendanceStatusEnum {
    PRESENT = 'Present',
    ABSENT = 'Absent',
    LATE = 'Late',
    EXCUSED = 'Excused',
    ON_LEAVE = 'On Leave',
    HALF_DAY = 'Half-Day',
    PENDING = 'Pending',
}

export enum QuizParticipantStatus {
    YES = 'Yes',
    NO = 'No'
  }
  