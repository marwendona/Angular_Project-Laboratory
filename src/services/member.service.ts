import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from 'src/modals/Member';
import { GLOBAL } from '../app/app-config1';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  //creation du tab de service
  public tab: Member[] = GLOBAL._DB.members;
  constructor(private httpClient: HttpClient) { }

  getNbMembers(): Observable<number> { return new Observable((observer) => (observer.next(this.tab.length))) }

  saveMember(MemberToSave: any): Promise<void> //thread: promise  //post n'attend rien donc void
  {
    //1 completer les 2 attributs qui manquent (id et createdDate)
    //ceil: arrondie
    const NewMember = { ...MemberToSave, id: MemberToSave.id ?? Math.ceil(Math.random() * 1000).toString(), createdDate: MemberToSave.createdDate ?? new Date().toISOString() };
    //2 envoie de requete http vers le back end (en envoyant le membre)
    //return this.httpClient.post<void>('link',NewMember).toPromise();

    //2 si on a pas de back
    this.tab = [NewMember, ...this.tab.filter(item => item.id != NewMember.id)] //item: pointeur //ajoute ds la BD
    return new Promise(resolve => resolve())  //lance le thread 

  }
  deleteMemberById(id: string): Promise<void> {
    //return this.httpClient.delete<void>('link').toPromise()
    //link: 127.0.0.1:880/id

    this.tab = this.tab.filter(item => item.id != id);
    return new Promise(resolve => resolve());
  }
  GetMemberById(id: string): Promise<Member> {
    return new Promise(resolve => resolve(
      this.tab.filter(item => item.id == id)[0] ?? null //[0]:rmeh fel ligne 0     ??: sinon   
    ));
  }

  //2eme methode
  GetMemberById5(id: string): Promise<Member | undefined> {
    return new Promise(resolve => resolve(
      this.tab.find(item => item.id == id)
    ));
  }


  count: number = 0;
  count2: number = 0;
  tabStudent: number[] = [];
  getNbStudentMember(): Observable<number[]> {
    this.tabStudent=[];
    this.count=0;
    this.count2=0;

    for (let i = 0; i < this.tab.length; i++) 
    {
      if (this.tab[i].type == "student")
        this.count++;
    else {this.count2++;}
    }
    this.tabStudent.push(this.count);  
    this.tabStudent.push(this.count2);
    return new Observable((observer) => observer.next(this.tabStudent))
  }


}
