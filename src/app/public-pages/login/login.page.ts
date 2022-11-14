import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      usuario: new FormControl(),
      password: new FormControl()
    })
  }

}
