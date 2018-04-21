import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {
    @Input() heading: string;
    @Input() formReady: boolean;
    @Input() items:any;
    constructor() {}

    ngOnInit() {

    }
}

