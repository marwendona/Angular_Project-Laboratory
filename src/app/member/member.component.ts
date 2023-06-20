import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Member } from 'src/modals/Member';
import { MemberService } from 'src/services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {
  constructor(private MS : MemberService, private dialog:MatDialog)//injection de dependances
  {}

//attribut


//dataSource : Member[]=this.MS.tab; ////////////////////eli fel interface de member doit etre le meme ds database
dataSource = new MatTableDataSource(this.MS.tab);// walla de type matTableDataSource eli fih la fct filtre, c pas un table d'objet 


displayedColumns: string[] = ['Id','Cin', 'Name', 'CreatedDate', 'Cv','Type','Action'];

//constructeur
//ngOnInit():void
delete(id:string):void
{//1 ouvrir la boite
  let dialogRef = this.dialog.open(ConfirmDialogComponent, {
    height: '400px',
    width: '600px',
  });
  //2 attendre le retour de l'utilisateur
  dialogRef.afterClosed().subscribe((x)=>{if(x){
    this.MS.deleteMemberById(id).then(()=>{this.dataSource.data=this.MS.tab}); //on ajoute .data

  }
})
  //3 tester sur le retour
  //4 if retour= confirm


}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
