import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private storageService: StorageService,private router:Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      usuario: new FormControl(),
      password: new FormControl()
    })
  }
  login(){
    this.storageService.setRol('embajador');
    this.router.navigate(['tabs','registro-qr']);
  }

  login2(){
    this.storageService.setRol('scanner');
    this.router.navigate(['tabs','scanner-qr']);
  }
}
