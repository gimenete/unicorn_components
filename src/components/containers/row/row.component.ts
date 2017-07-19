import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'uni-row',
    templateUrl: 'row.component.html',
    styleUrls: ['row.component.scss'],
})
export class UniRowComponent {

    @HostBinding('class.uni-row') componentClass = true;
    constructor() { }
}
