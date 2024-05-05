import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from '../../service/theme.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
    ],
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
    constructor(
        protected themeService: ThemeService
    ) {}
}
