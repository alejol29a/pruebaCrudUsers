import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsuariosComponent } from '../modal-usuarios/modal-usuarios.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  data:any [] = [
    { usuario: "alejo" ,
      nombres: "alejo" ,
      apellidos: "alejo" ,
      correo: "alejo" ,
      estado: "alejo" ,
    }
  ]
  displayedColumns: string[] = [
    'IdentificationNumber',
    'NamesUser',
    'LastNameUser',
    'EmailUser',
    'ActiveUser',
    'Acciones',
  ];
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.data
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  crear(){
    debugger
   const dialog = this.dialog.open(ModalUsuariosComponent,{data:{Accion:"i", data:[]}})
   var datos:any = []
   dialog.afterClosed().subscribe(data => {
     if(data){
       datos = this.dataSource.data 
       datos.push(data)
       this.dataSource.data = datos
       console.log(this.dataSource.data)
     }
   })
  }

  editar(obj,index){
    debugger
   const dialog = this.dialog.open(ModalUsuariosComponent,{data:{Accion:"E", data:obj}})
   var datos:any = []
   dialog.afterClosed().subscribe(data => {
     if(data){
      datos = this.dataSource.data 
       datos[index] = data
       this.dataSource.data = datos
       console.log(this.dataSource.data)
     }
   })
  }
  consultar(obj,index){
    debugger
   const dialog = this.dialog.open(ModalUsuariosComponent,{data:{Accion:"C", data:obj}})
   const datos = []
   dialog.afterClosed().subscribe(data => {})
  
  }

}
