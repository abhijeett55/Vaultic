import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Partition } from '../../_environment/partition';

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


  constructor( @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {

    if(isPlatformBrowser(this.platformId)) {
        const saved =
      localStorage.getItem('partitions');

      if(saved){
          this.partitions = JSON.parse(saved);
      }  
    }
  
  }

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
      fileCount: 0,
      percentage: 0
    });

    this.newPartitionName = '';
    this.newPartitionIcon = '📁';
    this.newPartitionStatus = 'Healthy';

    localStorage.setItem(
      'partitions',
      JSON.stringify(this.partitions)
    );

    this.showForm = false;
  }

  deletePartition(index: number) {
    this.partitions.splice(index, 1);

    if(isPlatformBrowser(this.platformId)) {
      localStorage.setItem('partitions', JSON.stringify(this.partitions));
    }
  }

  addSpace() {
    console.log('Added Space');
  }
}