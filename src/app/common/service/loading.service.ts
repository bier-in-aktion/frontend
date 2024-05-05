import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    public loadingFinished = signal<boolean>(true);
}
