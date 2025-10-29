import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {IUser} from '../models/user.model';
import {firstValueFrom, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  private readonly api = environment.API;

  getUserProfileByUUID(uuid: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.api}profile/${uuid}`);
  }

  uploadUserAvatar(uuid: string, file: File): Promise<IUser> {
    const formData = new FormData();
    formData.append('avatar', file);

    return firstValueFrom(
      this.http.put<IUser>(`${this.api}profile/${uuid}/avatar`, formData)
    );
  }
}
