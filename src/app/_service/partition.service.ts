import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partition } from '../_environment/partition';

@Injectable({
  providedIn: 'root',
})
export class PartitionService {

  private api = 'http://localhost:8080/api/partitions';

  constructor(private http: HttpClient) {}

  createPartition(partition: Partition): Observable<Partition> {
    return this.http.post<Partition>(this.api, partition);
  } 

  getPartitions(userId: string): Observable<Partition[]> {
    return this.http.get<Partition[]>(
      `${this.api}/user/${userId}`
    );
  }

  deletePartition(id: number) {
    return this.http.delete(
      `${this.api}/${id}`
    );
  }
  
  
}
