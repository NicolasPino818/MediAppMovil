import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit() {
  }

}
