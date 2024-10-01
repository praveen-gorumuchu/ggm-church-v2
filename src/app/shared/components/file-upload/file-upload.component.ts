import {
  Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter,
  SimpleChanges, OnChanges
} from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';


import { NumberConstant } from '../../constants/number-constant';
import { StringConstant } from '../../constants/string-constant';


import { UtilSharedService } from '../../services/util-shared.service';
import { PreviewFileData } from '../../models/files/file-upload-res';
import { FileReaderService } from '../../services/file-reader.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnChanges {
  @Input() fileData!: any;
  @Input() preview: boolean = false;
  @Input() previewData!: PreviewFileData;
  @Output() filesList = new EventEmitter<File[]>();
  formGroup!: FormGroup;
  files: any[] = [];
  @ViewChild('fileDropRef') fileDropRef!: ElementRef;

  constructor(private fb: FormBuilder, public utilSharedService: UtilSharedService,
    private fileReaderService: FileReaderService) {
    this.formGroup = this.createFormGroup();
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.previewDoc();
      this.setValidators();
    }
  }

  previewDoc() {
    if (this.preview && this.previewData) {
      const blob: any = this.previewData.file;
      const fileList: FileList[] = [blob];
      this.prepareFilesList(fileList);
    }
  }

  previewDocument(file: File | Blob) {
    this.fileReaderService.previewUploadedFile(file)
  }

  downloadFile(file: Blob) {
    saveAs(file);
  }

  onFileDropped(event: any) {
    this.prepareFilesList(event);
  }

  fileBrowseHandler(event: any) {
    this.prepareFilesList(event.target.files);
  }


  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
    this.validateFormat();
    this.setValidators();
    this.filesList.emit(this.files);
  }

  validateFormat() {
    this.setFileSize();
    if (this.fileData) {
      this.files.map((file: File, index: number) => {
        if (this.fileData.acceptedFiles && !this.fileData.acceptedFiles.includes(file.type)) {
          this.files[index].invalid = true;
        }
        if (file.size > this.fileData.fileSize) {
          this.files[index].maxSize = true;
        }
      })
    }
  }

  setFileSize() {
    this.files.map((file: File) => {
      this.fileData.fileSize = file.type == 'video/mp4' ? NumberConstant.FOURTY * NumberConstant.ONE_KB * NumberConstant.ONE_KB : NumberConstant.FIFTEEN * NumberConstant.ONE_KB * NumberConstant.ONE_KB
    })

  }

  deleteFile(index: number) {
    const deleted: File[] = this.files.splice(index, 1);
    const files: FileList = this.fileDropRef.nativeElement.files;
    const lastFile: File = this.files[this.files.length - NumberConstant.ONE];
    if (deleted[NumberConstant.ZERO] && deleted[NumberConstant.ZERO].name === files[NumberConstant.ZERO]?.name) {
      Array.from(files).splice(NumberConstant.ZERO, 1)
      this.fileCtrl.patchValue(null);
    }
    this.setValidators();
    this.filesList.emit(this.files);
    this.setFileSize();
  }


  setValidators() {
    if (this.fileData && this.fileData.required && this.files.length <= NumberConstant.ZERO)
      this.fileCtrl.addValidators([Validators.required]);
    else this.fileCtrl.clearValidators();
    this.fileCtrl.updateValueAndValidity();
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files && !this.files[index]) {
            clearInterval(progressInterval);
          } else {
            if (this.files && this.files[index] && this.files[index].progress >= 100) {
              clearInterval(progressInterval);
              this.uploadFilesSimulator(index + 1);
            } else {
              this.files[index].progress += 15;
            }
          }
        }, 200);
      }
    }, 1000);
  }

  get setErrorsForFile(): string {
    const touched = this.fileCtrl.touched;
    if (touched && this.files.length <= NumberConstant.ZERO && this.fileCtrl.hasError(StringConstant.required))
      return `${StringConstant.REUIRED}`;
    else return ''
  }

  get fileCtrl(): AbstractControl {
    return this.formGroup.get('file') as AbstractControl;
  }

  createFormGroup() {
    return this.fb.group({
      file: [null]
    })
  }

}

