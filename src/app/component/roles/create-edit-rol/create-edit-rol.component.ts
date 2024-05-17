import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-edit-rol',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-edit-rol.component.html',
  styleUrl: './create-edit-rol.component.scss'
})
export class CreateEditRolComponent {
  @Input() rol!: Role;
  constructor() { }

  guardarRol() {

  }

}
export interface Role {
  id?: number;
  name?: string;
  descrip?: string;
  estado?: boolean;
}
export class Role {
  constructor() {
  }

}