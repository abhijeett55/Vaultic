import { Injectable } from '@angular/core';
import { FileMetaData } from '../_environment/filemetaData';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partition } from '../_environment/partition';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  private api = 'http://localhost:8080/api/files';

  constructor(private http: HttpClient) {}

  uploadFile(
    file: File,
    tags: string,
    userId: string
  ): Observable<HttpEvent<FileMetaData>> {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('tags', tags || '');
    formData.append('userId', userId);

    return this.http.post<FileMetaData>(
      `${this.api}/upload`,
      formData,
      {
        reportProgress: true,
        observe: 'events'
      }
    );
  }

  uploadPartition(
    file: File,
    tags: string,
    userId: string,
    partition: string
  ): Observable<HttpEvent<FileMetaData>> {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('tags', tags || '');
    formData.append('userId', userId);
    formData.append('partition', partition);

    return this.http.post<FileMetaData>(
      `${this.api}/upload-partition`,
      formData,
      {
        reportProgress: true,
        observe: 'events'
      }
    );
  }

  getFilesByUser(userId: string): Observable<FileMetaData[]> {
    return this.http.get<FileMetaData[]>(
      `${this.api}/user/${userId}`
    );
  }

  getFilesByPartition(
    userId: string,
    partition: string
  ): Observable<FileMetaData[]> {

    return this.http.get<FileMetaData[]>(
      `${this.api}/user/${userId}/partition/${partition}`
    );
  }

  deleteFile(id: number, userId: string) {
    return this.http.delete(
      `${this.api}/${id}?userId=${userId}`
    );
  }

  getStorageUsed(userId: string): Observable<number> {
    return this.http.get<number>(
      `${this.api}/storage/${userId}`
    );
  }

  createPartition(partition: Partition) {
    return this.http.post(
      'http://localhost:8080/api/partitions',
      partition
    );
  }

  getPartitions(userId: string) {
    return this.http.get<Partition[]>(
      `http://localhost:8080/api/partitions/user/${userId}`
    );
  }

  deletePartition(id: number) {
    return this.http.delete(
      `http://localhost:8080/api/partitions/${id}`
    );
  }

}