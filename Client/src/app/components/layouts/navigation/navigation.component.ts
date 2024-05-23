import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPathService } from '../../../services/shares/shared-path.service';
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  currentPath: string = '';
  constructor(private sharedService: SharedPathService) {}
  ngOnInit() {
    this.sharedService.currentPath$.subscribe((path: string) => {
      this.currentPath = path;
    });
  }
}
