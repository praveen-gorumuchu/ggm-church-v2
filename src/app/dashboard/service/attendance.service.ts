import { Injectable } from '@angular/core';
import { StorageKeyConstant } from '../../shared/constants/storage-keys.constant';
import { StudentModel } from '../models/students/student-list.model';
import { AttendanceModel } from '../models/quiz-models/attendance/attendance.model';


@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private storageKey = StorageKeyConstant.attendance;
  private studentList: StudentModel[] = [];

  constructor() {}

  // Set student list from direct input
  setStudentList(response: StudentModel[]): void {
    this.studentList = response;
  }

  // Get student list
  getStudentList(): StudentModel[] {
    return this.studentList;
  }

  // Generate a key for each Sunday based on the date
  private getSundayKey(): string {
    const today = new Date();
    const sunday = new Date(
      today.setDate(today.getDate() - today.getDay()) // Adjust to last Sunday
    );
    return `${StorageKeyConstant.attendance}${sunday.toISOString().split('T')[0]}`;
  }

  // Get attendance for the current Sunday from local storage
  getAttendance(): AttendanceModel[] {
    const key = this.getSundayKey();
    const attendance = localStorage.getItem(key);
    return attendance ? JSON.parse(attendance) : this.generateEmptyAttendance();
  }


  private generateEmptyAttendance(): AttendanceModel[] {
    return this.studentList.map(student => ({
      studentId: student.id,
      studentName: student.name,
      attendance: false,
      day: new Date(),
      markedby: '', 
      markedDate: new Date(),
      quiz: false
    }));
  }

  saveAttendance(attendanceData: AttendanceModel[]) {
    const key = this.getSundayKey();
    localStorage.setItem(key, JSON.stringify(attendanceData));
  }

  submitAttendance(attendanceData: AttendanceModel[], markedBy: string) {
    const updatedAttendance = attendanceData.map((entry) => ({
      ...entry,
      markedby: markedBy,
      markedDate: new Date(),
    }));

    this.saveAttendance(updatedAttendance);
  }
}
