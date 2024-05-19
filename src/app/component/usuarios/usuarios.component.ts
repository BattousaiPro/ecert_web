import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalOptions } from '../../utils/modalOptions';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    JsonPipe,
    SpinnerComponent,
    FormsModule,
    NgbPaginationModule,
    CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  usuarios: Usuario[] = [];
  userModal: Usuario = new Usuario();
  userDeleteModal: Usuario = new Usuario();
  cargar: boolean = false;
  isEdit: boolean = false;
  modals = new ModalOptions();

  collectionSize: number = 0;
  page = 1;
  pageSize = 5;

  constructor(
    private modalService: NgbModal,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadCargar();
  }

  private loadCargar(): void {
    console.log('Cargando loadCargar');
    this.cargar = true;
    this.userService.getAll().subscribe(
      (data: any) => {
        if (data.code === '0' && data.data != null) {
          this.closeModal();
          this.usuarios = [];
          this.usuarios.push(...data.data);
          this.collectionSize = this.usuarios.length;
        } else {
          this.modals.success('Error con la respuesta de servicios de Usuaios');
        }
        this.cargar = false;
      },
      (err: any) => {
        this.closeModal();
        this.modals.error('Error con el servicio de Usuaios');
        this.cargar = false;
      });
  }

  public agregaModal(content: any): void {
    console.log('Method agregaModal.');
    this.userModal = new Usuario();
    this.userModal.estado = true;
    this.isEdit = false;
    this.openModalFunction(content);
  }

  public editarModal(content: any, userSelected: Usuario): void {
    console.log('Method editarModal');
    this.userModal = userSelected;
    this.isEdit = true;
    this.openModalFunction(content);
  }

  public deleteModal(content: any, userSelected: Usuario): void {
    console.log('Method deleteModal');
    this.userDeleteModal = userSelected;
    this.openModalFunction(content);
  }

  public addModal(content: any, index: number): void {
    this.usuarios[index].addUser = !this.usuarios[index].addUser;
    console.log('Method agregarUser.');
    this.userModal = new Usuario();
    this.userModal.estado = true;
    this.openModalFunction(content);
  }

  private openModalFunction(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
  }

  public guardar(): void {
    const ctaUsr = this.userModal.ctaUsr.trim();
    const ctaEmail = this.userModal.ctaEmail.trim();
    if (ctaUsr !== null && typeof ctaUsr !== 'undefined' && ctaUsr !== ''
      && ctaEmail !== null && typeof ctaEmail !== 'undefined' && ctaEmail !== ''
    ) {
      if (!this.isEdit) {
        this.createNew();
      } else {
        this.edit();
      }
    } else {
      this.modals.info('Nombre o correo Son inválido');
    }
  }

  private createNew(): void {
    console.log('Cargando createNew');
    this.cargar = true;
    this.userService.new(
      this.userModal.ctaUsr,
      this.userModal.ctaPass,
      this.userModal.ctaEmail
    ).subscribe(
      (data: any) => {
        if (data.code === '0') {
          this.closeModal();
          this.loadCargar();
        } else if (data.code === '-2') {
          this.modals.warning(data.message);
        } else {
          this.modals.error('Error con la respuesta de servicios de Usuaios para crear');
        }
        this.cargar = false;
      },
      (err: any) => {
        this.closeModal();
        this.modals.error('Error con el servicio de Usuaios para crear');
        this.cargar = false;
      });
  }

  private edit(): void {
    console.log('Cargando edit');
    this.cargar = true;
    this.userService.update(
      this.userModal.id,
      this.userModal.ctaUsr,
      this.userModal.ctaPass,
      this.userModal.ctaEmail,
      this.userModal.estado
    ).subscribe(
      (data: any) => {
        if (data.code === '0') {
          this.closeModal();
          this.loadCargar();
        } else {
          this.modals.error('Error con la respuesta de servicios de Usuaios para actualizar');
        }
        this.cargar = false;
      },
      (err: any) => {
        this.closeModal();
        this.modals.error('Error con el servicio de Usuaios para actualizar');
        this.cargar = false;
      });
  }

  public delete(): void {
    console.log('Cargando edit');
    this.cargar = true;
    this.userService.delete(this.userDeleteModal.id).subscribe(
      (data: any) => {
        if (data.code === '0') {
          this.closeModal();
          this.loadCargar();
        } else {
          this.modals.error('Error con la respuesta de servicios de Usuaios para eliminar');
        }
        this.cargar = false;
      },
      (err: any) => {
        this.closeModal();
        this.modals.error('Error con el servicio de Usuaios para eliminar');
        this.cargar = false;
      });
  }

  public closeModal() {
    this.modalService.dismissAll();
  }

}

export interface Usuario {
  id: number;
  ctaUsr: string;
  ctaPass: string;
  ctaEmail: string;
  //tipUsr: number;
  //estImp: number;
  //estCop: number;
  //estCar: number;
  //chkRut: number;
  //estCed: number;
  estado: boolean;
  addUser: boolean;
}
export class Usuario {
  constructor() {
    this.ctaUsr='';
    this.ctaPass='';
    this.ctaEmail='';
  }
}
