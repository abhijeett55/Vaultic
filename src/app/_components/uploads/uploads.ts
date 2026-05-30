import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FileService } from '../../_service/file';
import { FileMetaData } from '../../_environment/filemetaData';
import { FormsModule } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'app-uploads',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './uploads.html',
  styleUrl: './uploads.css',
})
export class Uploads implements OnInit {

  selectedFiles: File[] = [];
  uploadedFiles: FileMetaData[] = [];
  tags: string = '';
  uploadProgressMap: { [key: string]: number } = {};
  isDragging = false;

  
  constructor(private fileService: FileService,
    private authService: AuthService) {}

  

  ngOnInit() {
    this.loadFiles();
  }



  
  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.selectedFiles = files;
  }

  
  delete(id: number) {
      const currentUser = this.authService.getCurrentUser();
    if(!currentUser || !currentUser.id) {
      console.error('User not logged in');
      return;
    }
    this.fileService.deleteFile(id, currentUser.id).subscribe({
      next: () => {
        this.uploadedFiles = this.uploadedFiles.filter(f => f.id !== id);
      },
      error: err => console.error(err)
    });
  }

  
  upload() {
    const currentUser = this.authService.getCurrentUser();
      if (!currentUser?.id) {
          console.error('User not logged in');
          return;
      }
    this.selectedFiles.forEach(file => {

      

      this.fileService.uploadFile(file, this.tags, currentUser.id ?? '').subscribe({
        next: (event) => {


          

          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgressMap[file.name] =
              Math.round((event.loaded / event.total) * 100);
          }

          if (event.type === HttpEventType.Response) {
            this.uploadedFiles.push(event.body!);
            delete this.uploadProgressMap[file.name];
          }
        },
        error: err => console.error(err)
      });
    });

    this.selectedFiles = [];
  }

  
  loadFiles() {

      const currentUser =
      this.authService.getCurrentUser();

      if (!currentUser?.id) {
        return;
      }

    this.fileService.getFilesByUser(currentUser.id).subscribe({
      next: (res) => {
        this.uploadedFiles = res;
      },
      error: (err) => console.error(err)
    });
  }

  
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer?.files) {
      const files = Array.from(event.dataTransfer.files) as File[];
      this.selectedFiles = files;
    }
  }
  
}