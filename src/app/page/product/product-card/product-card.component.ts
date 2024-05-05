import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../common/model/product.model';
import { CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [
        MatCardModule,
        CurrencyPipe,
        DatePipe,
        PercentPipe,
    ],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
    public product = input.required<Product>();
}
