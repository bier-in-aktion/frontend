import { computed, Injectable, signal } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Observable, tap } from 'rxjs';

export type Product = {
    id: number;
    uuid: string | null;
    name: string | null;
    store: string | null;
    basePrice: number | null;
    discountPercentage: number | null;
    discountedPrice: number | null;
    isDiscounted: boolean | null;
    imageUrl: string | null;
    validityStart: number | null;
    validityEnd: number | null;
};

@Injectable()
export class ProductModel {
    public products = signal<Product[]>([]);
    public discountedProducts = computed(() => this.products().filter(product => product.isDiscounted));
    public nonDiscountedProducts = computed(() => this.products().filter(product => !product.isDiscounted));

    constructor(
        private productService: ProductService
    ) {}

    public loadData(): Observable<Product[]> {
        return this.productService.getAll().pipe(tap(data => this.products.set(data)));
    }
}
