import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  partitions: Partition[] = [];

  showForm = false;

  newPartitionName = '';
  newPartitionIcon = '📁';
  newPartitionStatus = 'Healthy';

  constructor(
    private partitionService: PartitionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    const currentUser =
      this.authService.getCurrentUser();

    if (!currentUser?.id) {
      return;
    }

    this.partitionService
      .getPartitions(currentUser.id)
      .subscribe({

        next: (data: Partition[]) => {

          this.partitions = data;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  formatBytes(bytes: number = 0): string {

    if (bytes === 0) {
      return '0 B';
    }

    const k = 1024;

    const sizes = [
      'B',
      'KB',
      'MB',
      'GB',
      'TB'
    ];

    const i =
      Math.floor(
        Math.log(bytes) / Math.log(k)
      );

    return (
      parseFloat(
        (bytes / Math.pow(k, i))
        .toFixed(2)
      )
      + ' '
      + sizes[i]
    );

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

    if (!this.newPartitionName.trim()) {

      return;

    }

    const partition: Partition = {

      userId: currentUser.id,

      name: this.newPartitionName,

      icon: this.newPartitionIcon,

      status: this.newPartitionStatus,

      usedSpace: 0,

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

}