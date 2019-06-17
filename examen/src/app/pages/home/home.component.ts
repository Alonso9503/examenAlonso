import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Pocisión inicial
  lat: number = 23.6294586;
  lng: number = -106.9285229;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  salir(){
  this.auth.logout();
  this.router.navigateByUrl('/login');
  }

}
