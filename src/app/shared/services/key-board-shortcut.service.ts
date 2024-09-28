import { Injectable, HostListener, EventEmitter } from '@angular/core';
import { ZoomService } from './zoom.service'; // Adjust the path as needed

@Injectable({
    providedIn: 'root',
})
export class KeyboardShortcutsService {
    toggleDrawer: EventEmitter<void> = new EventEmitter<void>();
    highlightedTexts: any[] = [];

    constructor(private zoomService: ZoomService) { }

    // Define keyboard shortcuts
    private shortcuts = {
        zoomIn: (event: KeyboardEvent) => {
            event.preventDefault();
            this.zoomService.zoomIn();
        },
        zoomOut: (event: KeyboardEvent) => {
            event.preventDefault();
            this.zoomService.zoomOut();
        },
        undo: (event: KeyboardEvent) => {
            // event.preventDefault();
        },
        toggleMenu: (event: KeyboardEvent) => {
            event.preventDefault();
            this.toggleDrawer.emit(); // Emit the toggle event
        },
    };

    @HostListener('window:keydown', ['$event'])
    onKeydown(event: KeyboardEvent) {
        const { ctrlKey, metaKey, key } = event;

        if ((ctrlKey || metaKey) && (key === '+' || key === '=')) {
            this.shortcuts.zoomIn(event);
        } else if ((ctrlKey || metaKey) && key === '-') {
            this.shortcuts.zoomOut(event);
        } else if ((ctrlKey || metaKey) && key === 'z') {
            this.shortcuts.undo(event);
        } else if ((ctrlKey || metaKey) && key === 'm') {
            this.shortcuts.toggleMenu(event); // Use 'm' for toggle menu
        }
    }


}
