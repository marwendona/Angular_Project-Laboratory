import { Component } from '@angular/core';
import { MemberService } from 'src/services/member.service';
import { Member } from 'src/modals/Member';
import { ArticleService } from 'src/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-article-affect',
  templateUrl: './article-affect.component.html',
  styleUrls: ['./article-affect.component.css']
})
export class ArticleAffectComponent {
  constructor(private MS: MemberService, private activatedroute: ActivatedRoute, 
    private articleService:ArticleService, private router:Router){}

  selectedValue!: string; currentId_article!:string;
  tab: Member[]= this.MS.tab;

  add(selectedValue:string):void{
//1 recuper id_article apartir de l'url
this.currentId_article=this.activatedroute.snapshot.params['id'];
//2 appeler la fct du service article
this.articleService.affect(this.currentId_article,selectedValue).then(()=>{this.router.navigate(['/articles'])})





  }

}
