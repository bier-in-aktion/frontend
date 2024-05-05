import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseWrapper } from '../type/response-wrapper.type';

@Injectable({
    providedIn: 'root',
})
export class ErrorService {
    constructor(private snackBar: MatSnackBar) { }

    public handleError(errorCode: string): void {
        console.warn('Ein unbekannter Fehler ist aufgetreten: ', errorCode);
        this.showErrorMessge('Ein unbekannter Fehler ist aufgetreten: ' + errorCode);
    }

    public showErrorMessge(message: string) {
        this.snackBar.open(message, 'OK');
    }

    public parseApiJsonOperator<T>(): OperatorFunction<HttpResponse<ResponseWrapper<T>>, T> {
        return map((response: HttpResponse<ResponseWrapper<T>>) => {
            // try to deserialize JSON body
            let body = JSON.parse(response.toString());

            // throw error sent from server
            if (body.error != null) {
                this.handleError(body.error);
                throw new Error(body.error);
            } else if (body.data == null) {
                this.handleError('ERROR_DATA_IS_NULL');
                throw new Error('ERROR_DATA_IS_NULL');
            }

            return body.data;
        });
    }
}
