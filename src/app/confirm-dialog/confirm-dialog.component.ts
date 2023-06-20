import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>){}//forcage de type pour avoir la forme de fenetre
  
  public content ='  Would you like to delete ?'; //on peut ajouter cond pour afficher le nom
  public title='are you sure';
  public confirmButton ='ok';
  public cancelButton ='no';


}
