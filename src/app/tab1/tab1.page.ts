import {Component} from '@angular/core';
import {Event} from '@angular/router';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    constructor() {
    }

    loadData(event: Event): void {
        console.warn(event);
    }

    toggleInfiniteScroll(): void {
        console.log('que doido');
    }
}
