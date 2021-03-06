import { ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';

import { DynamicContainerService } from '../../base/dynamic-container/dynamic-container.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { UniModalComponent } from './modal.component';

@Injectable()
export class ModalService extends DynamicContainerService {
    constructor(cmpFactoryResolver: ComponentFactoryResolver) { super(cmpFactoryResolver); }

    createModal(
        component: Type<any>,
        options = {},
        viewContainerRef: ViewContainerRef = this.defaultContainer
    ): Observable<any> {

        const modalRef: ComponentRef<UniModalComponent> = this.attachComponent(UniModalComponent, viewContainerRef);
        modalRef.instance.initContent(component, options);

        const modalSub = new Subject();
        modalRef.instance.cancel.subscribe(
            ev => { modalSub.error(ev); modalRef.destroy(); }
        );
        modalRef.instance.submit.subscribe(
            ev => { modalSub.next(ev); modalRef.destroy(); }
        );

        return modalSub.asObservable();
    }
}
