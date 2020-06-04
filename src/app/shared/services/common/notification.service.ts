import { Injectable, OnInit } from '@angular/core';
import { RootComponent } from '../../../shared/roots/root.component';
import { GlobalService } from '../../../shared/services/global.service';
import swal from 'sweetalert2';
@Injectable()
export class NotificationService extends RootComponent {

    constructor(public _globalService: GlobalService) {
        super(_globalService);
    }

    notification(types,titles,values) {
        this.alertMessage(
            {
                type: types,
                title: titles,
                value: values
            }
        );
    }
}