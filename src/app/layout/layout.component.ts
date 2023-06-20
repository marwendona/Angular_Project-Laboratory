import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user!:any;
  constructor(private authService : AuthService, private router:Router)//injection de dependances
{}
doLogout(): void{
    this.authService.doLogout().then(()=>{
      this.router.navigate(['/login']);
    })
  
  }
ngOnInit():void{
  this.authService.getUserClaims().then((x)=>{this.user=x})
 console.log(this.user)};


}
