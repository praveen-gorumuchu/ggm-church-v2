import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGenerationService {
  private latestId: number = 0; // Stores the latest ID

  constructor() { }

  // Initialize the latest ID from existing data (from localStorage or API)
  initializeLatestId(data: any[]): void {
    if (data.length > 0) {
      const maxId = Math.max(...data.map(item => parseInt(item.id, 10))); // Find the highest ID
      this.latestId = maxId;
    }
  }

  // Generate a new ID by incrementing the latest one
  generateId(): string {
    this.latestId += 1;
    return this.latestId.toString().padStart(4, '0'); // Pad the ID with leading zeros
  }

  // Return the current latest ID
  getLatestId(): string {
    return this.latestId.toString().padStart(4, '0');
  }

  // Method to update latest ID if the provided data has a higher ID
  updateLatestId(newData: any): string {
    this.initializeLatestId(newData);
    this.latestId += 1;

    return this.latestId.toString().padStart(4, '0'); // Return the updated latest ID
  }

  resetId() {
    this.latestId = 0;
  }

}
