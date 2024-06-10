import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [SkeletonModule, ToastModule, ButtonModule, RippleModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  providers: [MessageService],
})
export class LoaderComponent implements OnInit {
  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig,) {}

  ngOnInit() {
    this.primengConfig.ripple = true; 
    setTimeout(() => {
      this.showInfo();
    }, 0);
  }

  showInfo() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Please wait.. Service is Loading',
      life: 9999999,
    });
  }
}
