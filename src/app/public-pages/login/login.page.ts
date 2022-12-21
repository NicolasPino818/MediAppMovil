import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api-service/api.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private storageService: StorageService,
    private router:Router,
    private api:ApiService,
    private alertCtrl:AlertController,
    private loading:LoadingController) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      usuario: new FormControl(),
      password: new FormControl()
    })
  }

  async loginAlert(mensaje: string){
    const alert = await this.alertCtrl.create({
      header: 'Credenciales',
      message: mensaje,
      buttons: ['Entendido']
    })
    alert.present();
  }

  async loadingAnim(){
    const load = await this.loading.create({
      message: 'Iniciando Sesión...',
      cssClass: 'custom-loading'
    })
    load.present();
  }

  async login(){
    if(this.loginForm.valid && this.loginForm.controls.usuario.value != null){
      this.loadingAnim().then(()=>{
        this.api.login(this.loginForm.controls.usuario.value,this.loginForm.controls.password.value)
        .subscribe(loginData=>{
          if(loginData.token){

            this.storageService.setToken(loginData.token);
            this.storageService.setRol(loginData.userData.rol);
            this.storageService.setUser(loginData.userData.usuario);

            this.router.navigate(['tabs']);

          }else{
            if(loginData.code == '1006'){
              this.loginAlert('La contraseña es incorrecta');
            }else if(loginData.code == '1007'){
              this.loginAlert('El usuario no existe');
            }
          }
          this.loading.dismiss();
        },async (error:HttpErrorResponse)=>{
          if(error.status == 403){
            const alert = await this.alertCtrl.create({
              header: 'Prohibido',
              message: 'Usted no esta autorizado para entrar a esta App',
              buttons: ['Ok']
            })
            alert.present();
          }else{
            const alert = await this.alertCtrl.create({
              header: 'Servidor',
              message: 'Estamos teniendo problemas con el servidor',
              buttons: ['Ok']
            })
            alert.present();
          }
          console.log(error)
          this.loading.dismiss();
        })
      })
      
    }else{
      const alert = await this.alertCtrl.create({
        header: 'Datos',
        message: 'Asegurese de llenar los datos',
        buttons: ['Ok']
      })
      alert.present();
    }
  }
}
