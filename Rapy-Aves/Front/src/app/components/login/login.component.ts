import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public emailLogin: string | null = null;
  public passLogin: string | null = null;
  public view: number = 0;

  constructor(private userService: UserService, private router: Router){}

  public login(){
    if(this.emailLogin != null && this.passLogin != null){
      this.userService.login(this.emailLogin, this.passLogin).subscribe((res: any) => {
        if(res.token){
          localStorage.setItem("token", res.token);
          this.router.navigate(["home"]);
        }else{
          alert("Email o Contraseña incorrectos");
        }
      });
    }
  }

  public register(){
    if(this.emailLogin != null && this.passLogin != null){
      this.userService.register(this.emailLogin, this.passLogin).subscribe((res: any) => {
        if(res.newUser){
          alert("Usuario creado exitosamente!");
          this.view = 0;
        }else{
          alert("Error al crear usuario");
        }
      });
    }
  }

  setView(view: number){
    this.view = view;
  }

}
