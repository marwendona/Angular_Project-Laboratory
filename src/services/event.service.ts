import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from 'src/app/app-config1';
import { Event } from 'src/modals/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private HttpClient: HttpClient, ) { }
//creation du tab de service
public tab:Event[]=GLOBAL._DB.events;
Event_recuperer!:Event;
currentItemId!:string

gettAllEvt():any   //Observable<Event[]>  //par defaut va retourner un objet de type observable
{
            // return this.HttpClient.get <Event[]>
            //('http://localhost:8080/api/Event');
return this.tab;
  }

  save(evtToSave:Event):Observable<Event>
  
  {  
  const evtNew={...evtToSave,id:evtToSave.id ??(Math.random()*1000).toString()};//si a une id sinon genere nouveau id
  this.tab=[evtNew,...this.tab.filter(item=>item.id!=evtNew.id)];
  return new Observable((Observer)=>{Observer.next(evtNew)}); ///oubien resolve si promise
    //return this.HttpClient.post<Event>('http://localhost:8080/api/Events',evtToSave);
  }

  deleteEventById(id:string):Promise<void>
  {
    //return this.httpClient.delete<void>('link').toPromise()
    //link: 127.0.0.1:880/id

    this.tab=this.tab.filter(item=>item.id!=id);
    return new Promise(resolve=>resolve());
  }  

  getEventById(id:string):Observable<Event>
  {//si on a backend
    // return this.httpClient.get<Event>('http://localhost:8080/api/Event')
    
    //sinon
    return new Observable ((observer) =>observer.next(this.tab.filter(item=>item.id==id) [0] ?? null));
  }
}