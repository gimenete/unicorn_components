import {
    Component, Directive, Input, Output, EventEmitter, ElementRef,
    ContentChild, Host, HostListener, OnDestroy, AfterViewInit
} from '@angular/core';
import { GoPopupContainerComponent } from './container/container.component';

@Component({
    selector: 'go-popup',
    templateUrl: 'popup.component.html',
    styleUrls: ['popup.component.scss'],
})
export class GoPopupComponent implements AfterViewInit {
    @Input() toggle = false;
    @Input() keepOpen = true;
    @Output() openedChange = new EventEmitter();

    @ContentChild(GoPopupContainerComponent) popupScope: GoPopupContainerComponent;

    opened: boolean = false;

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit() {
        this.popupScope.close.subscribe(_ => this.close())
    }

    open() {
        this.opened = true;
        this.openedChange.emit(true);
    }
    close() {
        this.opened = false;
        this.openedChange.emit(false);
    }
    isInClosableZone(element: HTMLElement) {
        if (!this.popupScope || this.keepOpen === false) { return false; }
        return this.popupScope.elementRef.nativeElement.contains(element);
    }
}

@Directive({
    selector: '[goPopupTrigger]'
})
export class GoPopupTriggerDirective implements OnDestroy {
    private openedByFocus: boolean = false;
    private closePopupOnOutsideClick = (event: MouseEvent) => this.close(event);

    constructor( @Host() public popup: GoPopupComponent, private elementRef: ElementRef) { }

    @HostListener('click') openPopup() {
        if (this.openedByFocus) {
            this.openedByFocus = false;
            return;
        }
        if (this.popup.opened && this.popup.toggle) {
            this.popup.close();
            document.removeEventListener('click', this.closePopupOnOutsideClick);
        } else {
            this.popup.open();
            document.addEventListener('click', this.closePopupOnOutsideClick, true);
        }
    }

    @HostListener('focus') onFocus() {
        this.openedByFocus = true;
        this.popup.open();
        document.addEventListener('click', this.closePopupOnOutsideClick, true);
    }

    @HostListener('blur', ['$event']) onBlur(event: FocusEvent) {
        if (event.relatedTarget &&
            !this.popup.isInClosableZone(<HTMLElement>event.relatedTarget) &&
            event.relatedTarget !== this.elementRef.nativeElement) {

            this.popup.close();
            document.removeEventListener('click', this.closePopupOnOutsideClick);
        }
    }
    ngOnDestroy() {
        document.removeEventListener('click', this.closePopupOnOutsideClick);
    }
    private close(event: Event) {
        if (!this.popup.isInClosableZone(<HTMLElement>event.target)
            && event.target !== this.elementRef.nativeElement
            && !this.elementRef.nativeElement.contains(event.target)) {
            this.popup.close();
            document.removeEventListener('click', this.closePopupOnOutsideClick);
        }
    }
}