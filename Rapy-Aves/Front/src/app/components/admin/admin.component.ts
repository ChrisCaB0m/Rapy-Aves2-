import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MenuComponent, CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  modalRef?: NgbModalRef;

  public title: string = "";
  public records: Array<any> = [];
  public headers: Array<any> = [];

  public isAddUser: boolean = true;
  public idUpdateUser: string = "";

  public isAddProduct: boolean = true;
  public idUpdateProduct: string = "";

  public email: string = "";
  public pass: string = "";

  public productName: string = "";
  public productPrice: number | null = 0 ;
  public productImage: string = "";
  public productCategory: string = "";

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private productService: ProductService,
    private modalService: NgbModal) {
    this.switchUsers();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let option = params['option'];
      if (option == 'Usuarios') {
        this.switchUsers();
      } else if (option == 'Productos') {
        this.switchProducts();
      }
    });
  }

  showModal(template: TemplateRef<any>, isAdd?: string): void {
    if(isAdd == "addUser"){
      this.isAddUser = true;
      this.email = "";
      this.pass = "";
    }else if(isAdd == "addProduct"){
      this.isAddProduct = true;
      this.productName = "";
      this.productPrice = 0;
      this.productImage = "";
      this.productCategory = "";
    }
    this.modalRef = this.modalService.open(template);
  }

  switchUsers() {
    this.title = 'Usuarios';
    this.headers = ['Id', 'Email', 'Contraseña (Ecriptada)', 'Acciones'];
    this.records = [];
    this.userService.getUsers().subscribe((res: any) => {
      if (res.length > 0) {
        this.records = res.map((element: any) => {
          delete element.__v;
          return element;
        });
      }
    });
  }

  switchProducts() {
    this.title = 'Productos';
    this.headers = ['Id', 'Nombre', 'Precio', 'Imagen', 'Categoría', 'Acciones'];
    this.records = [];
    this.productService.getProducts()?.subscribe((res: any) => {
      if (res.length > 0) {
        this.records = res.map((element: any) => {
          delete element.__v;
          return element;
        });
      }
    });
  }

  getObjectValues(record: any): any[] {
    const allProperties = Object.keys(record);
    return allProperties.map(property => record[property]);
  }

  createUser() {
    if (this.email == "" || this.pass == "") {
      alert("Los datos del producto no están bien...");
      return;
    }

    if(this.isAddUser){
      this.userService.register(this.email, this.pass)?.subscribe((res: any) => {
        if(res.newUser){
          alert("Usuario creado con éxito");
          this.switchUsers();
          this.modalRef?.dismiss();
        }else{
          alert("Error al crear el Usuario");
        }
      });
    }else{
      this.userService.updateUser(this.idUpdateUser, {email: this.email, password: this.pass})?.subscribe((res: any) => {
        if(res.email){
          alert("Usuario actualizado con éxito");
          this.switchUsers();
          this.modalRef?.dismiss();
        }else{
          alert("Error al actualizar el Usuario");
        }
      });
    }
  }

  createProduct() {    
    if (this.productName == "" || this.productPrice == 0 || this.productImage == "" || this.productCategory == "") {
      alert("Los datos del producto no están bien...");
      return;
    }

    let body = {
      Nombre: this.productName,
      Precio: this.productPrice,
      Imagen: this.productImage,
      Categoria: this.productCategory
    };

    if(this.isAddProduct){
      this.productService.createProduct(body)?.subscribe((res: any) => {
        if(res.Nombre){
          alert("Producto creado con éxito");
          this.switchProducts();
          this.modalRef?.dismiss();
        }else{
          alert("Error al crear el producto");
        }
      });
    }else{
      this.productService.updateProduct(this.idUpdateProduct, body)?.subscribe((res: any) => {
        if(res.Nombre){
          alert("Producto actualizado con éxito");
          this.switchProducts();
          this.modalRef?.dismiss();
        }else{
          alert("Error al actualizar el producto");
        }
      });
    }
  }

  setProductCategory(event: any) {
    this.productCategory = event.target.value;
  }

  validarInput(event: any): void {
    const soloNumeros = /^[0-9]*$/;
    if (!soloNumeros.test(event.target.value)) {
      this.productPrice = null;
      event.target.value = "";
    }
  }

  deleteRecord(record: any){
    if("Usuarios" === this.title){
      this.userService.deleteUser(record._id)?.subscribe((res:any) => {
        if(res.email){
          alert(`${res.email} eliminado con éxito`);
          this.switchUsers();
          this.modalRef?.dismiss();
        }else{
          alert("Error al eliminar el Usuario");
        }
      });
    }else{
      this.productService.deleteProduct(record._id)?.subscribe((res:any) => {
        if(res.Nombre){
          alert(`${res.Nombre} eliminado con éxito`);
          this.switchProducts();
          this.modalRef?.dismiss();
        }else{
          alert("Error al eliminar el producto");
        }
      });
    }
  }

  modifyRecord(record: any, template: TemplateRef<any>){
    if("Usuarios" === this.title){
      this.isAddUser = false;
      this.email = record.email;
      this.idUpdateUser = record._id;
    }else{
      this.isAddProduct = false;
      this.productName = record.Nombre;
      this.productPrice = record.Precio;
      this.productImage = record.Imagen;
      this.productCategory = record.Categoria;
      this.idUpdateProduct = record._id;
    }
    this.showModal(template);
  }
}
