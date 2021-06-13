import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppErrorsService {
  private errors: string[] = [];
  private _appErrors$ = new BehaviorSubject<string[]>([]);
  public appErrors$ = this._appErrors$.asObservable();

  newError(errorText: string) {
    this.errors.push(errorText);
    this._appErrors$.next(this.errors);
  }

  clearErrors() {
    this.errors = [];
    this._appErrors$.next(this.errors);
  }
}
