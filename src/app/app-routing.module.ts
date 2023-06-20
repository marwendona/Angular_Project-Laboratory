import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { DashComponent } from './dash/dash.component';
import { ToolsComponent } from './tools/tools.component';
import { ArticleComponent } from './article/article.component';
import { EventComponent } from './event/event.component';
import { ArticleAffectComponent } from './article-affect/article-affect.component';
import { LoginComponent } from './login/login.component';
import { EventFormComponent } from './event-form/event-form.component';

const routes: Routes = [
  {path:'members',pathMatch:'full', component:MemberComponent,},
  {path:'',pathMatch:'full', component:LoginComponent},
  {path:'create',pathMatch:'full', component:MemberFormComponent,},
  {path:':id/edit',pathMatch:'full', component:MemberFormComponent,},
  {path:':id/affect',pathMatch:'full', component:ArticleAffectComponent,},
  {path:'event/create',pathMatch:'full', component:EventFormComponent,},


  {path:'dashboard',pathMatch:'full', component:DashComponent,},
  {path:'tools',pathMatch:'full', component:ToolsComponent,},
  {path:'articles',pathMatch:'full', component:ArticleComponent,},
  {path:'events',pathMatch:'full', component:EventComponent,},
  {path:'login',pathMatch:'full', component:LoginComponent},

  {path:'**',pathMatch:'full', component:DashComponent,}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
