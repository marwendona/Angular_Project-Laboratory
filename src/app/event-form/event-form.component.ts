import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/services/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  constructor(private es : EventService, private router:Router)//injection de dependances
  {}

  range = new FormGroup({
    titre: new FormControl(null ,[Validators.required]),
    date_deb: new FormControl<Date | null>(null),
    date_fin: new FormControl<Date | null>(null),
  });

  Onadd():void{
    console.log(this.range.value);
    //insertion de (range.value) dans le service
    const evtToSave:any=this.range.value
    this.es.save(evtToSave).subscribe((x)=>{this.router.navigate(['/Events'])});
  }
}
