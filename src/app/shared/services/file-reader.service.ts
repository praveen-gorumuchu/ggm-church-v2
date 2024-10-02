import { Injectable } from '@angular/core';
import saveAs from 'file-saver';
import JSZip, { file } from 'jszip';
import moment from 'moment';

import { StringConstant } from '../constants/string-constant';
import { BlobData, PreviewFileData } from '../models/files/file-upload-res';

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  constructor() { }

  setBlob(data: BlobData): Blob {
    const base64: Uint8Array =
      this.convertBase64toUnitArray(data.fileData);
    const blob: any = new Blob([base64], { type: data.fileType });
    blob[StringConstant.NAME] = data.fileName;
    return blob as Blob
  }

  convertBase64toUnitArray(str: string): Uint8Array {
    const byteStr = atob(str);
    const byteNumbers = new Array(byteStr.length);
    for (let i = 0; i < byteStr.length; i++) {
      byteNumbers[i] = byteStr.charCodeAt(i);
    }
    return new Uint8Array(byteNumbers);
  }

  previewUploadedFile(file: File | Blob) {
    const fileUrl = URL.createObjectURL(file);
    const a: any = document.createElement('a');
    a.href = fileUrl;
    a.download = (file as File).name;
    a.style = StringConstant.none;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  previewFiles(data: BlobData) {
    const base64: Uint8Array =
      this.convertBase64toUnitArray(data.fileData);
    const blob: Blob = new Blob([base64], { type: data.fileType });
    const fileUrl = URL.createObjectURL(blob);
    const previewWindow = window.open(fileUrl, '_blank');
  }

  downloadFile(file: BlobData) {
    if (file.fileData) {
      const base64: Uint8Array = this.convertBase64toUnitArray(file.fileData);
      const blob: Blob = new Blob([base64], { type: file.fileType });
      saveAs(blob, file.fileName);
    }
  }

  downalodZipFile(files: PreviewFileData[]) {
    const zip = new JSZip();
    files.forEach((file: PreviewFileData) => {
      if (file && file.fileData && file.fileName) {
        const base64: Uint8Array =
          this.convertBase64toUnitArray(file.fileData);
        zip.file(file.fileName, base64, { binary: true, compression: 'DEFLATE' });
      }
    });

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'myZipFile.zip')
    })
  }

  downloadTraininMatZipFile(files: any[]) {
    const zip = new JSZip();

    files.forEach((data: any, index: number) => {
      if (data && data.fileData && data.fileType) {
        const base64: Uint8Array = this.convertBase64toUnitArray(data.fileData);
        zip.file(data.uploadedFileName, base64, { binary: true, compression: 'DEFLATE' });
      }
    })
    zip.generateAsync({ type: 'blob' }).then((content:any) => {
      const date = moment().format(StringConstant.MOMENT_DD_MM_YYYY);
      const fileName = `${StringConstant.TM_ZIP_FILE_NAME}_${date}`;
      saveAs(content, fileName)
    })

  }


}
