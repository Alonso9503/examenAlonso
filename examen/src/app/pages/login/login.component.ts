import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioModel } from '../../models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel;
  recordar = false;

  constructor(private auth: AuthService,
              private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('email') ) {
     this.usuario.email = localStorage.getItem('email');
     this.recordar = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.auth.login(this.usuario)
    .subscribe(resp => {

      console.log(resp);
      Swal.close();

      if (this.recordar) {
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');

    }, (err) => {

      console.log(err.error.error.message);
      Swal.fire({
        type: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
      });
    });
}

/*obtener_localstorage(){
    let nombre = localStorage.getItem("nombre");
    let password = JSON.parse(localStorage.getItem("password"));

    console.log(nombre);
    console.log(password);

}

grabar_localstorage(){
  let imail:string = "jpastrana@bwl.com.mx";
  let password : number = 123456;

  localStorage.setItem("imail", imail);
  localStorage.setItem("password", JSON.stringify(password));

}

/*logIn(form: NgForm){

  if (form.invalid) { return; }
      this.login( this.usuario)
      .subscribe( res => {

        console.log(resp);
      }, (err) => {
        console.log(err.error.error.message);
      });
}


navigate() {
  this.router.navigateByUrl('/home');
}*/
}

