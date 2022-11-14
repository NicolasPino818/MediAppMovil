import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-qr',
  templateUrl: './registro-qr.page.html',
  styleUrls: ['./registro-qr.page.scss'],
})
export class RegistroQrPage implements OnInit {

  datosClienteForm:FormGroup;
  constructor() { }

  ngOnInit() {
    this.datosClienteForm = new FormGroup({
      nombre: new FormControl('',[
        Validators.required
      ]),
      rut: new FormControl('',[
        Validators.required
      ])
    })
  }

  private generarCodigo(){
    
  }

}
