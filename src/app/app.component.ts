import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductModel } from './common/model/product.model';
import { TopbarComponent } from './common/component/topbar/topbar.component';
import { ThemeService } from './common/service/theme.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        TopbarComponent,
    ],
    providers: [
        ProductModel,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    constructor(
        protected themeService: ThemeService
    ) { }
}
