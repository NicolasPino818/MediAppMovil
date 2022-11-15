import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-codigos',
  templateUrl: './listado-codigos.page.html',
  styleUrls: ['./listado-codigos.page.scss'],
})
export class ListadoCodigosPage implements OnInit {

  datosPrueba = [
    {
      id: 12345,
      nombre: 'john',
      rut: '12.345.678-9',
      url: 'www.dominion.com/qr/12345'
    },
    {
      id: 12346,
      nombre: 'bob',
      rut: '12.345.678-9',
      url: 'www.dominion.com/qr/12345'
    },
    {
      id: 12347,
      nombre: 'dave',
      rut: '12.345.678-9',
      url: 'www.dominion.com/qr/12345'
    },
    {
      id: 12348,
      nombre: 'susan',
      rut: '12.345.678-9',
      url: 'www.dominion.com/qr/12345'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
