import { MatDialogConfig,MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/services/event.service';
import { Event } from 'src/modals/Event';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit{
  constructor(private es : EventService, private dialog: MatDialog)//injection de dependances
  {}

event1!: Event;
dataSource!:any[];
displayedColumns: string[] = ['titre','date_deb', 'date_fin','Action'];

ngOnInit():void  //initialisation du form
  {//1. recuperer id de la route active                id comme ecrit dans root
    this.dataSource= this.es.gettAllEvt(); ////////////////////eli fel interface de member doit etre le meme ds database
  }
  open(currentItemId: string):void{
    const dialogConfig = new MatDialogConfig();
//chercher l'evt par son id
    this.es.getEventById(currentItemId).subscribe(
      (event_recuperer) => { this.event1 = event_recuperer; })

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data =this.event1;

    const dialogRef=this.dialog.open(ModalComponent,dialogConfig);
    
    //apres la fermeture du modal
    dialogRef.afterClosed().subscribe(()=>
      this.dataSource=this.es.tab
    )
  }


  delete(id:string):void
{//1 ouvrir la boite
  let dialogRef = this.dialog.open(ConfirmDialogComponent, {
    height: '200px',
    width: '400px',
  });
  //2 attendre le retour de l'utilisateur
  dialogRef.afterClosed().subscribe((x)=>{if(x){
    this.es.deleteEventById(id).then(()=>{this.dataSource=this.es.tab});

  }
})
  //3 tester sur le retour
  //4 if retour= confirm


}


}
