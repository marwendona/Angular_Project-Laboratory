import { Router } from '@angular/router';
import { EventService } from 'src/services/event.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  Inject } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    form!: FormGroup;
    desc!:any;

  
    currentItemId!:string;

    constructor(        
        private router: Router,
        private es: EventService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ModalComponent>,
        @Inject(MAT_DIALOG_DATA) data:any) {  //data la var qui contient les donnees

          this.desc=data;
      }
         

    ngOnInit() {
      
        this.form = this.fb.group({ //les memes dans html
          titre: new FormControl(this.desc.titre, []),
          date_deb: new FormControl(this.desc.date_deb, []),
          date_fin: new FormControl(this.desc.date_deb, []),

        });
    }

    //non utilisé ici
    initForm2():void 
    {
      this.form=this.fb.group({// si vide ,[] càd non required
        titre:new FormControl(this.desc.titre,[Validators.required])  ,
        date_deb:new FormControl(this.desc.date_deb,[Validators.required])  ,
        date_fin:new FormControl(this.desc.date_fin,[Validators.required])
      })
    }


    save() {
        this.dialogRef.close(this.form.value);
        console.log(this.form.value);

        const EvtTOSave={...this.desc,...this.form.value};
        //appeler une fonction ds le service pour ajouter ce membre
        this.es.save(EvtTOSave).subscribe(()=>{this.router.navigate(['/Events'])}); 
    }

    close() {
        this.dialogRef.close();

    }
}