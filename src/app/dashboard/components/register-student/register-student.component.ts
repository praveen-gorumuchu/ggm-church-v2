import { EncriptionService } from './../../../shared/services/encription.service';
import { UtilSharedService } from './../../../shared/services/util-shared.service';
import { LoginService } from './../../../shared/services/login.service';
import { GenerateIdConst } from './../../../shared/constants/generate-id.constant';
import { Component, SimpleChanges } from '@angular/core';
import { DashboardTitles } from '../../constants/dashboard-title.constant';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { StudentService } from '../../service/student.service';
import { IdGenerationService } from '../../../shared/services/generate-id.service';
import { NumberConstant } from '../../../shared/constants/number-constant';
import { StudentModel, StudentModelRes } from '../../models/students/student-list.model';
import { UserInfo } from '../../../shared/models/user-data/uder-list.model';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss', '../../dashboard-style.scss']
})
export class RegisterStudentComponent {
  titles = DashboardTitles;
  studentForm!: FormGroup;
  studentList: StudentModel[] = [];
  loginUser!: UserInfo

  constructor(private fb: FormBuilder, private idGenerationService: IdGenerationService,
    private localStorageService: LocalStorageService, private studentService: StudentService,
    private loginService: LoginService, private utilService: UtilSharedService,
    private encriptionService: EncriptionService
  ) {
    this.loginUser = this.loginService.loginUser;
    this.studentForm = this.createForm();
    this.initializeData();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  initializeData(): void {
    const existing = this.localStorageService.getData(GenerateIdConst.studentID);
    if (existing && existing.length > 0) {
      this.studentList = existing;
      this.idGenerationService.initializeLatestId(this.studentList);
      this.addNewStudent();
    } else {
      this.studentService.getStudentIds().subscribe((res: StudentModelRes) => {
        if (res && res.data && res.data.length > NumberConstant.ZERO) {
          this.studentList = res.data;
          this.idGenerationService.initializeLatestId(this.studentList);
          this.addNewStudent();
        }
      })
    }
  }

  onSubmit(): void {
    if (!this.studentForm.valid) return
    const combinedData: StudentModel[] = [...this.getNewData(), ...this.studentList];
    const uniqueData = this.utilService.removeDuplicates(combinedData);
    this.localStorageService.setData(GenerateIdConst.studentID, uniqueData);
    this.studentForm.reset();
  }

  getNewData(): StudentModel[] {
    const newData: StudentModel[] = [];
    if (this.studentsFormArray && this.studentsFormArray.valid &&
      this.studentsFormArray.controls.length > NumberConstant.ZERO) {
      this.studentsFormArray.value.forEach((student: StudentModel) => {
        if (student.id && student.name) {
          const data: StudentModel = {
            id: student.id, name: student.name, class: student.class,
            phoneNum: this.encriptionService.encrypt(String(student.phoneNum) || ''),
            createdBy: this.loginUser.name,
            creationDate: new Date()
          };
          newData.push(data);
        }
      });
    }
    return newData
  }

  addNewStudent(): void {
    const newId = this.idGenerationService.generateId();
    this.studentsFormArray.push(this.createStudentGroup(newId));
  }

  removeStudent(index: number): void {
    this.studentsFormArray.removeAt(index);
  }


  setErrorsForName() {

  }

  deleteAll() {
    this.studentsFormArray.reset()
    this.studentsFormArray.clear();
    const newId = this.idGenerationService.updateLatestId(this.studentList);
    this.studentsFormArray.push(this.createStudentGroup(newId));
  }

  disableSubmit(): boolean {
    let disable = false;

    disable = this.studentsFormArray.controls.some((ctrl: AbstractControl) => {
      const name = ctrl?.get('name')?.value;
      const id = ctrl.get('id')?.value;
      return !name || !id || ctrl?.get?.('name')?.invalid || ctrl?.get?.('id')?.invalid;
    })

    return disable;
  }

  downLoadData() {
    this.utilService.downloadJsonFile(GenerateIdConst.studentID, 'data');
  }


  get studentsFormArray(): FormArray {
    return this.studentForm.get('students') as FormArray;
  }

  createForm(): FormGroup {
    return this.fb.group({
      students: this.fb.array([])
    });
  }

  createStudentGroup(id: string): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      class: ['', Validators.required],
      age: ['', []],
      id: [id, [Validators.required]],
      phoneNum: ['', []]

    });
  }



  ngOnDestroy(): void {
    this.idGenerationService.resetId();

  }
}
