import { Component, ViewContainerRef } from '@angular/core';

import { ModalService } from '../src/components/containers/modal/modal.service';
import { NtsDemoModalContentComponent } from './demo-modal-content/demo-modal-content.component';
import { NtsOption } from './../src/models/option';
import { ToastService } from '../src/components/utils/toast/toast.service';
import { TooltipService } from '../src/components/utils/tooltip/tooltip.service';

@Component({
    selector: 'nts-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
    tabSelected = 'data';

    manyOptions: NtsOption[] = [
        new NtsOption({ value: 1, label: 'Option 1' }),
        new NtsOption({ value: 2, label: 'Option 2' }),
        new NtsOption({ value: 3, label: 'Option 3' }),
        new NtsOption({ value: 4, label: 'Option 4' }),
        new NtsOption({ value: 5, label: 'Option 5' }),
        new NtsOption({ value: 11, label: 'Option 11' }),
        new NtsOption({ value: 12, label: 'Option 12' }),
        new NtsOption({ value: 13, label: 'Option 13' }),
        new NtsOption({ value: 14, label: 'Option 14' }),
        new NtsOption({ value: 15, label: 'Option 15' }),
        new NtsOption({ value: 21, label: 'Option 21' }),
        new NtsOption({ value: 22, label: 'Option 22' }),
        new NtsOption({ value: 23, label: 'Option 23' }),
        new NtsOption({ value: 24, label: 'Option 24' }),
        new NtsOption({ value: 25, label: 'Option 25' }),
        new NtsOption({ value: 31, label: 'Option 31' }),
        new NtsOption({ value: 32, label: 'Option 32' }),
        new NtsOption({ value: 33, label: 'Option 33' }),
        new NtsOption({ value: 34, label: 'Option 34' }),
        new NtsOption({ value: 35, label: 'Option 35' }),
        new NtsOption({ value: 41, label: 'Option 41' }),
        new NtsOption({ value: 42, label: 'Option 42' }),
        new NtsOption({ value: 43, label: 'Option 43' }),
        new NtsOption({ value: 44, label: 'Option 44' }),
        new NtsOption({ value: 45, label: 'Option 45' }),
        new NtsOption({ value: 51, label: 'Option 51' }),
        new NtsOption({ value: 52, label: 'Option 52' }),
        new NtsOption({ value: 53, label: 'Option 53' }),
        new NtsOption({ value: 54, label: 'Option 54' }),
        new NtsOption({ value: 55, label: 'Option 55' })
    ];

    data = [
        {
            name: 'Alfredo',
            birth: '1992-12-17',
            progress: 0.25,
            alerts: 2
        },
        {
            name: 'Rafael',
            birth: '1995-06-28',
            progress: 0.5,
            alerts: 3
        },
        {
            name: 'Suso',
            birth: '1985-09-07',
            progress: 0.75,
            alerts: 1
        }
    ];

    baseSeries = [
        { label: 'Serie 1', data: [12, 19, 3, 5, 2, 3] },
        { label: 'Serie 2', data: [22, 12, 20, 10, 5, 1] }
    ];
    baseLabels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6'];
    baseOptions = {};

    lineSeries = [
        { label: 'Serie 1', data: [12, 19, 3, 5, 2, 3], fill: false },
        { label: 'Serie 2', data: [22, 12, 20, 10, 5, 1], fill: false }
    ];
    mixedSeries = [
        { label: 'Serie 1', data: [12, 19, 3, 5, 2, 3], type: 'bar' },
        { label: 'Serie 2', data: [22, 12, 20, 10, 5, 1], type: 'line' }
    ];
    stackOptions = { scales: { xAxes: [{ stacked: true }], yAxes: [{ stacked: true }] } };

    constructor(
        private viewContainerRef: ViewContainerRef,
        private toastService: ToastService,
        private tooltipService: TooltipService,
        private modalService: ModalService
    ) { }

    openToast() {
        this.toastService.createToast('Esto es el mensaje', { showClose: true, time: 3000 }, this.viewContainerRef).subscribe(
            _ => { console.log('accept'); }
        );
    }

    openModal(type = null) {
        this.modalService.createModal(NtsDemoModalContentComponent, { title: 'Demo Modal', type }, this.viewContainerRef).subscribe(
            param => { console.log('ok: ', param); }, _ => { console.log('ko'); }
        );
    }

    openTooltip(event) {
        this.tooltipService.createTooltip('Esto es el mensaje del tooltip informativo', {
            x: event.clientX,
            y: event.clientY
        }, this.viewContainerRef).subscribe(
            _ => { console.log('accept'); }
            );
    }

    closeTooltip() {
        this.tooltipService.close();
    }

    onCellClick(cell) {
        console.log('Cell clicked', cell);
    }
}
