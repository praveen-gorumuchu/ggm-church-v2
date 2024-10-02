import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  // Retrieve data from localStorage
  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  // Save data to localStorage
  setData(key: string, data: any[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Check if an ID already exists in the stored data
  checkForDuplicates(newId: string, existingData: any[]): boolean {
    return existingData.some(item => item.id === newId);
  }
  
}
