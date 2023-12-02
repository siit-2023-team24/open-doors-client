import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  defaultProfileImageId: number = 1;
  defaultAccommodationImageId: number = 2;

  getPath(id: number): string {
    return environment.apiHost + '/image/' + id;
  }

  uploadImage(formData: FormData): Observable<number> {
    return this.httpClient.post<number>(environment.apiHost + '/image', formData);
  }

  deleteImage(id: number): void {
    if(id === this.defaultProfileImageId
      || id === this.defaultAccommodationImageId) { return; }

    this.httpClient.delete(this.getPath(id)).subscribe({
      next: () => { console.log('image deleted')},
      error: () => { console.log('error while deleting image')}
    });

  }

}
