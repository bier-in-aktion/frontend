import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlUtils } from '../../util/urlutils';
import { ErrorService } from './error.service';
import { Product } from '../model/product.model';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    public constructor(
        private http: HttpClient,
        private errorService: ErrorService
    ) { }

    public getAll(): Observable<Product[]> {
        return this.http.get('api/product',
            UrlUtils.constructRequestOptions()).pipe(UrlUtils.timeoutOperator(), this.errorService.parseApiJsonOperator());
    }
}
