import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import {ActivatedRoute} from '@angular/router';
import {Router, Params} from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { GLOBAL } from '../../services/global';
declare var swal: any;
declare var $: any;




@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

first_name:string;
last_name:string;
email:string;
phone:number;
comentario:string;
public contact : Contact;
public url:string;
public status: string;
public barra:string;
  constructor(
    private  _contactService : ContactService,
    private _router :Router
  ) {
    this.url = GLOBAL.url;
    this.contact = new Contact('','','','',0);
  }
  openModal(){
    $(document).ready(function(){
        $('.modal').modal();
    });
  }
  closeModale(){
    $(document).ready(function(){
        // $('.modal').close();
        $('.modal').modal('close');

    });
  }

  ngOnInit() {

    this.openModal();


  }
  enviarForm(f){
    this.contact.name = this. first_name;
    this.contact.last_name = this.last_name;
    this.contact.phone = this.phone;
    this.contact.message = this.comentario;
    this.contact.email = this.email;

    // console.log(this.first_name+" "+this.last_name+" "+this.email+" "+this.comentario+" "+this.phone);

    // console.log(f.form.value);

    this._contactService.sendemail(this.contact).subscribe(
        response =>{

          this.barra ="enviado";
          if (response.contact) {
            this.closeModale();
            this.barra = "fin";
            swal({
                type: 'success',
                title: 'Email enviado',
                text: status,
                footer: 'En las próximas horas te responderemos'
              })
               f.form.reset();
               this.comentario = null;
               this.phone = null
            this.status = 'exito';
              console.log(response.contact)
          }
        },
        error =>{
          var errorMensaje = <any>error;
          if (errorMensaje != null) {
              var body = JSON.parse(error._body);
              this.status = 'error';
              console.log(body);
            }
        }
    )
  }

}
