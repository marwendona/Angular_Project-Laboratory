import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/modals/Member';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  form!:FormGroup; currentItemId!:string; member1!:Member;
  constructor(private MS : MemberService, private router: Router, private activatedRoute:ActivatedRoute)//injection de dependances
  {}

  ngOnInit():void  //initialisation du form
  {//1. recuperer id de la route active                id comme ecrit dans root
    this.currentItemId=this.activatedRoute.snapshot.params['id'];
    console.log(this.currentItemId)
    //2. tester sur id
    if(!!this.currentItemId)//si existe et a une val
    {
    //3. si id est diff de null => je suis dans edit
    //4. initForm(objetMember)[objetMember recuperé a travers son id]
    this.MS.GetMemberById(this.currentItemId).then((memeber_recuperer)=>{this.member1=memeber_recuperer;this.initForm2(this.member1)})
    }
    else //sinon je suis dans create
    this.initForm();//initialiser le form
  }
  initForm():void 
  {
    this.form=new FormGroup({// si vide ,[] càd non required
      cin:new FormControl(null,[Validators.required]) ,
      name:new FormControl(null,[Validators.required])  ,
      cv:new FormControl(null,[Validators.required])  ,
      type:new FormControl(null,[Validators.required])
    })
  }

  initForm2(member1:Member):void 
  {
    this.form=new FormGroup({// si vide ,[] càd non required
      cin:new FormControl(member1.cin,[Validators.required]) ,
      name:new FormControl(member1.name,[Validators.required])  ,
      cv:new FormControl(member1.cv,[Validators.required])  ,
      type:new FormControl(member1.type,[Validators.required])
    })
  }
  onsub():void
  {
    console.log(this.form.value);
    const MemberTOSave={...this.member1,...this.form.value};
    //appeler une fonction ds le service pour ajouter ce membre
    this.MS.saveMember(MemberTOSave).then(()=>{this.router.navigate(['/members'])}); 
    //que j'allais faire apres le lancement de thread de memberToSave 
    //Post ne retourne rien et on a void donc le then((retour)=>{action})
  }

}
