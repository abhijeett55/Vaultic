import { Injectable } from '@angular/core';
import { FileMetaData } from '../_environment/filemetaData';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FileService {

  private api = "http://localhost:8080/api/files";

  constructor(private http: HttpClient) {}

  uploadFile(file: File, tags: string, userId: string): Observable<HttpEvent<FileMetaData>> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", tags || '');
    formData.append("userId", userId);

    return this.http.post<FileMetaData>(`${this.api}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getFiles(): Observable<FileMetaData[]> {
    return this.http.get<FileMetaData[]>(this.api);
  }

  deleteFile(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}