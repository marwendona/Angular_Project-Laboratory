import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';
import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private AuthSer : AuthService, private ngZone:NgZone, private router:Router)//injection de dependances
{}
  tryGoogleLogin(): void{

    //connecter sur firebase (authservice)
    this.AuthSer.doGoogleLogin().then(()=>{
      this.succesRedirecte();
    })
    //if authentifier => rredirection vers /members
    //
  }

  succesRedirecte(): void{
    this.ngZone.run(()=>{
      this.router.navigate(['/members'])
    })
  }
}
