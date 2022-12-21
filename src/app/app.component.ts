import { Component, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { TimeoutService } from './services/timeout/timeout.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  constructor(private plt:Platform, 
    private storage:Storage, 
    private timer: TimeoutService) {
    
    this.storage.create();
    
  }

  ngOnDestroy(): void {
    this.timer.timeoutStop();
  }

}