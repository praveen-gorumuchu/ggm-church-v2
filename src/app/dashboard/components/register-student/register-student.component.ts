import { MessageBarService } from './../../../shared/services/message-bar.service';
import { filter } from 'rxjs';
import { EncriptionService } from './../../../shared/services/encription.service';
import { UtilSharedService } from './../../../shared/services/util-shared.service';
import { LoginService } from './../../../shared/services/login.service';
import { GenerateIdConst } from './../../../shared/constants/generate-id.constant';
import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DashboardTitles } from '../../constants/dashboard-title.constant';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { StudentService } from '../../service/student.service';
import { IdGenerationService } from '../../../shared/services/generate-id.service';
import { NumberConstant } from '../../../shared/constants/number-constant';
import { StudentModel, StudentModelRes } from '../../models/students/student-list.model';
import { UserInfo } from '../../../shared/models/user-data/uder-list.model';
import { FormsService } from '../../../shared/services/forms.service';
import { StringConstant } from '../../../shared/constants/string-constant';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss', '../../dashboard-style.scss']
})
export class RegisterStudentComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {
  titles = DashboardTitles;
  studentForm!: FormGroup;
  studentList: StudentModel[] = [];
  loginUser!: UserInfo
  @ViewChild('idELe') idELe!: ElementRef
  constructor(private fb: FormBuilder, private idGenerationService: IdGenerationService,
    private localStorageService: LocalStorageService, private studentService: StudentService,
    private loginService: LoginService, private utilService: UtilSharedService,
    private encriptionService: EncriptionService, private formService: FormsService,
    private messageBarService: MessageBarService
  ) {
    this.loginUser = this.loginService.loginUser;
    this.studentForm = this.createForm();
    this.initializeData();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngAfterViewInit(): void {
    // this.studentsFormArray.controls.forEach((ctrl) => {
    //   ctrl.get('id')?.disable();
    // })

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
    if (!this.studentForm.valid) {
      this.messageBarService.showErorMsgBar(StringConstant.ERROR_MSG);
      return
    }
    const combinedData: StudentModel[] = [...this.getNewData(), ...this.studentList];
    const uniqueData = this.utilService.removeDuplicates(combinedData);
    this.localStorageService.setData(GenerateIdConst.studentID, uniqueData);
    this.messageBarService.showSuccessMsgBar(StringConstant.CREATE_SUCCESS);
    this.studentsFormArray.clear();
    this.initializeData();
    
  }

  getNewData(): StudentModel[] {
    const newData: StudentModel[] = [];
    if (this.studentsFormArray && this.studentsFormArray.valid &&
      this.studentsFormArray.controls.length > NumberConstant.ZERO) {
      (this.studentsFormArray.value as Array<StudentModel>).every((student: StudentModel, i: number) => {
        const idCtrl = this.studentsFormArray.controls[i].get('id') as AbstractControl;
        if (student.name) {
          const data: StudentModel = {
            id: idCtrl.value, name: student.name, class: student.class,
            phoneNum: student.phoneNum ? this.encriptionService.encrypt((student.phoneNum)) : '',
            createdBy: this.loginUser.name,
            creationDate: new Date(),
            modifiedBy: '', modifiedDate: null, deletedBy: '', deletionDate: null,
            version: NumberConstant.ZERO
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

  setErrors(i: number, key: string, invalid?: string, min?: number, max?: number) {
    const name = this.studentsFormArray.controls[i].get(key) as AbstractControl;
    return this.formService.setErrors(name, invalid, min, max);
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
      age: ['', [Validators.minLength(1), Validators.maxLength(4)]],
      id: [{ value: id, disabled: true }, [Validators.required]],
      phoneNum: ['', [Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  ngOnDestroy(): void {
    this.idGenerationService.resetId();

  }
}
