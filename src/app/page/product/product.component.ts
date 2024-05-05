import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { ProductModel } from '../../common/model/product.model';
import { ProductCardComponent } from './product-card/product-card.component';
import { LoadingService } from '../../common/service/loading.service';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule,
        MatRippleModule,
        MatCardModule,
        ProductCardComponent,
    ],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
    constructor(
        protected productModel: ProductModel,
        protected loadingService: LoadingService
    ) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    protected refresh(): void {
        this.loadingService.loadingFinished.set(false);
        this.productModel.loadData().subscribe(() => this.loadingService.loadingFinished.set(true));
    }
}
