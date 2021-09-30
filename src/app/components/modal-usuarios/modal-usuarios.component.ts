import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrls: ['./modal-usuarios.component.css']
})
export class ModalUsuariosComponent implements OnInit {

	formularioCampos: FormGroup
  consulta: any = false
  crear: any = false
	estados: string 
	datos: any;
  constructor(
	@Inject(MAT_DIALOG_DATA) private dataSource: any,

	public dialog : MatDialog ,

	  public dialogRef: MatDialogRef<ModalUsuariosComponent>,
	  
	) {}
	
	ngOnInit(): void {
	  this.Validaciones()
	  debugger
	  this.datos = this.dataSource

	  this.estados = this.datos.data.estado
	if(this.dataSource.Accion === 'C' ){
		this.consulta = true
		this.formularioCampos.setValue(this.dataSource.data)

	}else if (this.dataSource.Accion === "E"){
		this.consulta = false
		this.formularioCampos.setValue(this.dataSource.data)

	}else {
		this.consulta = undefined
		this.crear = true
	}

  }
  guardar(){
	  const obj = this.formularioCampos.value
	  obj.estado = this.estados
	  this.dialogRef.close(this.formularioCampos.value)
  }
  cabioAmbiente(value) {
    if (value) {
      this.estados = "Activo";
    } else {
      this.estados= "inactivo";
    }
  }

  cabioAmbientes(value) {
    this.estados = value
  }

  Validaciones() {
		this.formularioCampos = new FormGroup({
			
			usuario: new FormControl(
				 '',
				[Validators.required]
			),
			nombres: new FormControl('',[
				Validators.required,
			]),
			apellidos:new FormControl('',[
				Validators.required,

			]),
			correo:new FormControl('',[
				Validators.required,
				Validators.pattern("[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}")

			]),
			estado:new FormControl("",[
				Validators.required,
	
			]),
	
		});
	}
}
