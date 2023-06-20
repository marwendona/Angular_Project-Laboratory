import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/app-config1';
import { Article } from 'src/modals/Article';
import { MemberService } from 'src/services/member.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public articles:Article[]=GLOBAL._DB.articles;
  public article_recupere!: Article;

  constructor(private MS: MemberService, ) { }

  affect(currentId_article :string,selectedValue :string):Promise<void>
  {
//1 chercher article by id
this.getArticleById(currentId_article).then((x)=>{this.article_recupere=x})
//2 chercher member by id (selectedValue)
this.MS.GetMemberById(selectedValue).then((y)=>{
  this.article_recupere.auteur=y.name
})
return new Promise(resolve=>resolve());
//3 author<= name du member
  }

  getArticleById(id:string):Promise<Article>
  {
    return new Promise(resolve=> resolve(
    this.articles.filter(item=>item.id==id)[0] ?? null //[0]:rmeh fel ligne 0     ??: sinon   
    ));
  }


count=0
Data:number[]=[]
  getNbreArticleByMember():Observable<number[]>
  {this.Data=[]////////////////////////////////////////////////////////////////////////////////////////////////////////
    for(let i=0;i<this.MS.tab.length;i++)
    {this.count=0
      for(let j=0;j<this.articles.length;j++)
      {
if(this.MS.tab[i].name==this.articles[j].auteur)
this.count++
      }
      this.Data.push(this.count);

    }
    return new Observable((observer)=>{observer.next(this.Data)});
  }

}
