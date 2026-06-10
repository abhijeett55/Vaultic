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

  uploadPartition(file: string, tags: string, userId: string, partition: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", tags || '');
    formData.append("userId", userId);
    formData.append("partition", partition);


    return this.http.post(`${this.api}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getFilesByUser(userId: string): Observable<FileMetaData[]> {
    return this.http.get<FileMetaData[]>(`${this.api}/user/${userId}`);
  }

  deleteFile(id: number, userId: string) {
    return this.http.delete(
      `${this.api}/${id}?userId=${userId}`
    );
  }
}