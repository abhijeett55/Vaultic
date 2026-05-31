import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Partition } from '../../_environment/partition';

@Component({
  selector: 'app-partition',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './partition.html',
  styleUrl: './partition.css'
})
export class PartitionSpace {

  partitions: Partition[] = [
    {
      name: 'Personal',
      icon: '📁',
      status: 'Healthy',
      usedSpace: '0 B',
      totalSpace: '5 GB',
      fileCount: 0,
      percentage: 0
    },
    {
      name: 'Work',
      icon: '💼',
      status: 'Healthy',
      usedSpace: '0 B',
      totalSpace: '5 GB',
      fileCount: 0,
      percentage: 0
    }
  ];

  showForm = false;

  newPartitionName = '';
  newPartitionIcon = '📁';
  newPartitionStatus = 'Healthy';
  newPartitionSize = '5 GB';

  openPartitionForm() {
    this.showForm = !this.showForm;
  }

  addPartition() {

    if (!this.newPartitionName.trim()) {
      return;
    }

    this.partitions.push({
      name: this.newPartitionName,
      icon: this.newPartitionIcon || '📁',
      status: this.newPartitionStatus,
      usedSpace: '0 B',
      totalSpace: this.newPartitionSize,
      fileCount: 0,
      percentage: 0
    });

    this.newPartitionName = '';
    this.newPartitionIcon = '📁';
    this.newPartitionStatus = 'Healthy';
    this.newPartitionSize = '5 GB';

    this.showForm = false;
  }

  deletePartition(index: number) {
    this.partitions.splice(index, 1);
  }
}