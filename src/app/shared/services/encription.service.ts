import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';
import { UserDataList } from '../models/user-data/uder-list.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EncriptionService {

  constructor() { }

  encrypt(value: string): string {
    const bytes = CryptoJS.AES.encrypt(value, environment.barrer).toString();
    return bytes;
  }

  decrypt(inputVal: string): string {
    const bytes = CryptoJS.AES.decrypt(inputVal.trim(), environment.barrer);
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedValue) {
      throw new Error('Decryption failed, returned an empty string');
    }
    return decryptedValue;
  }


}
