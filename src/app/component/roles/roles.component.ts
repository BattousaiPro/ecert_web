import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles/roles.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    SpinnerComponent,
    FormsModule,
    NgbPaginationModule,
    CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements OnInit {

  roles: Role[] = [];
  rolModal: Role = new Role();
  cargar: boolean = false;
  isEdit: boolean = false;

  collectionSize: number = 0;
  page = 1;
  pageSize = 5;

  constructor(
    private modalService: NgbModal,
    private rolesService: RolesService
  ) { }

  ngOnInit(): void {
    this.loadCargarRoles();
  }

  private loadCargarRoles(): void {
    console.log('Cargando loadCargarRoles');
    this.cargar = true;
    this.rolesService.obtenerRoles().subscribe(
      (data: any) => {
        if (data.code === '0' && data.data != null) {
          this.roles.push(...data.data);
          this.collectionSize = this.roles.length;
        } else {
          console.log('Error con la respuesta de servicios de Roles');
          alert('Error con la respuesta de servicios de Roles');
        }
        this.cargar = false;
      },
      (err: any) => {
        console.log('Error con el servicio de Roles');
        alert('Error con el servicio de Roles');
        this.cargar = false;
      }
    );
  }

  public agregarRolModal(content: any): void {
    console.log('Method agregarRolModal.');
    this.rolModal = new Role();
    this.rolModal.estado = true;
    this.isEdit = false;
    this.openModalFunction(content);
  }

  public editarRolModal(content: any, rolesSelected: Role): void {
    console.log('Method editarRolModal.');
    this.rolModal = rolesSelected;
    this.isEdit = true;
    this.openModalFunction(content);
  }

  public addRolModal(content: any, index: number): void {
    this.roles[index].addRol = !this.roles[index].addRol;
    console.log('Method agregarRol.');
    this.rolModal = new Role();
    this.rolModal.estado = true;
    this.openModalFunction(content);
  }

  private openModalFunction(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
  }

  public guardarRol(): void {
    const name = this.rolModal.name;
    const descrip = this.rolModal.descrip;
    if (name?.trim() && /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(name?.trim())
      && descrip?.trim() && /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(descrip?.trim())) {
      alert('Nombre y descripción Son válido');
    } else {
      alert('Nombre o descripción son inválido');
    }
  }

}

export interface Role {
  id?: number;
  name?: string;
  descrip?: string;
  estado?: boolean;
  addRol: boolean;
}
export class Role { }
