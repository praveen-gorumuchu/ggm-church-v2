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
  initialize(data: any[]): void {
    if (Array.isArray(data) && data.length > 0) {
      // Extract numeric part from the IDs and find the maximum
      const maxId = Math.max(...data.map(item => {
        // Ensure the item has an id property and it's a string
        if (item.id && typeof item.id === 'string') {
          const numericPart = parseInt(item.id.replace(/\D/g, ''), 10); // Remove non-digit characters
          return isNaN(numericPart) ? 0 : numericPart; // Handle non-numeric cases
        }
        return 0; // If no valid id, return 0
      }));
      
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

  // Updte the latest key 

  updateId(newData: any[]): void {
    this.initialize(newData);
    this.latestId += 1; // Increment after initialization
  }

  generateIdWithKey(key: string): string {
    this.latestId += 1;
    return `${key}${this.latestId}`;
  }


}
