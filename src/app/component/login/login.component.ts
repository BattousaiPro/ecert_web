import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = 'Batto';
  password: string = 'Batto123';
  cargar: boolean = false;

  constructor(private userService: UserService,
    private router: Router) { }

  validarFormulario() {
    if (this.username === '' || this.password === '') {
      alert('Todos los campos son obligatorios');
    } else {
      if (!this.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
        alert('La contraseña debe ser alfanumérica y tener al menos 8 caracteres');
      } else {
        //this.router.navigate(['home']);
        this.login();
      }
    }
  }

  private login(): void {
    console.log('Cargando loadCargarRoles');
    this.cargar = true;
    this.userService.access(this.username, this.password).subscribe(
      (data: any) => {
        console.log(JSON.stringify(data));
        if (data.body.code === '0') {
        //if (data.body.code === '0' && data.body.data != null) {
          this.router.navigate(['home']);
        } else {
          //this.error.mostrarError('Error con la respuesta de servicios de Access');
          console.log('Error con la respuesta de servicios de Access');
          alert('Error con la respuesta de servicios de Access');
        }
        this.cargar = false;
      },
      (err: any) => {
        //this.error.mostrarError('Error con el ervicio de Access');
        console.log('Error con el ervicio de Access');
        this.cargar = false;
        alert('Error con el ervicio de Access');
      });
  }

}
