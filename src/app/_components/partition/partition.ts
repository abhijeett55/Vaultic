import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Partition } from '../../_environment/partition';
import { AuthService } from '../../_service/auth.service';
import { PartitionService } from '../../_service/partition.service';

@Component({
  selector: 'app-partition',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './partition.html',
  styleUrl: './partition.css'
})
export class PartitionSpace implements OnInit {

    partitions: Partition[] = [
    {
      name: 'Personal',
      icon: '📁',
      status: 'Healthy',
      usedSpace: '0 B',
      fileCount: 0,
      percentage: 0
    },
      {
        name: 'Work',
        icon: '💼',
        status: 'Healthy',
        usedSpace: '0 B',
        fileCount: 0,
        percentage: 0
      }
    ];

    showForm = false;

    newPartitionName = '';
    newPartitionIcon = '📁';
    newPartitionStatus = 'Healthy';


  constructor( @Inject(PLATFORM_ID) private platformId: Object,
    private partitionService: PartitionService,
    private authService: AuthService
    ) {
  }

  ngOnInit(): void {

    const currentUser =
      this.authService.getCurrentUser();

    if (!currentUser?.id) {
      return;
    }

    this.partitionService
      .getPartitions(currentUser.id)
      .subscribe({
        next: (data) => {
          this.partitions = data;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  
  openPartitionForm() {
    this.showForm = !this.showForm;
  }

  addPartition(): void {

    const currentUser =
      this.authService.getCurrentUser();

    if (!currentUser?.id) {
      return;
    }

    const partition = {
      userId: currentUser.id,
      name: this.newPartitionName,
      icon: this.newPartitionIcon,
      status: this.newPartitionStatus,

      usedSpace: '0 B',
      fileCount: 0,
      percentage: 0


    };

    this.partitionService
      .createPartition(partition)
      .subscribe({
        next: (savedPartition: Partition) => {

          this.partitions.push(savedPartition);

          this.newPartitionName = '';
          this.newPartitionIcon = '📁';
          this.newPartitionStatus = 'Healthy';
          this.showForm = false;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  deletePartition(partition: Partition): void {

    if (!partition.id) {
      return;
    }

    this.partitionService
      .deletePartition(partition.id)
      .subscribe({
        next: () => {

          this.partitions =
            this.partitions.filter(
              p => p.id !== partition.id
            );

        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  addSpace() {
    console.log('Added Space');
  }
}