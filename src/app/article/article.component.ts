import { Component } from '@angular/core';
import { Article } from 'src/modals/Article';
import { ArticleService } from 'src/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  constructor(private AS : ArticleService)//injection de dependances
  {}
  dataSource : Article[]=this.AS.articles;

  displayedColumns: string[] = ['Id','Titre', 'Auteur', 'DateApparition','Action'];

}
