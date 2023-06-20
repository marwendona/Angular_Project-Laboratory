import { EventService } from 'src/services/event.service';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/services/article.service';
import { MemberService } from 'src/services/member.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Member } from 'src/modals/Member';
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit{
  constructor(private es : EventService,private ms : MemberService,private as : ArticleService, )//injection de dependances
  {}
  articles=0
  events=0
  members=0
  tools=0 //on a pas encore le service
  tabMem:string[]=[];
  var:number[]=[];

  chartDataPie:ChartDataset[]=[
    {
      label:'$ in milion',
      data:this.getTeacherStudent()
    }
  ];


  TabTeacherStudent:number[]=[];
getTeacherStudent():number[]

{
  this.ms.getNbStudentMember().subscribe((x)=>{this.TabTeacherStudent=x});
  
  return this.TabTeacherStudent;
}





  ngOnInit():void{
console.log(this.chartData)
    this.getTeacherStudent();
  this.articles=this.as.articles.length
  this.events=this.es.tab.length
  this.ms.getNbMembers().subscribe((x)=>{this.members=x})
  this.as.getNbreArticleByMember().subscribe((y)=>{this.var=y})
  

  for(let i=0; i<this.ms.tab.length;i++)
  {
    this.tabMem[i]=this.ms.tab[i].name;
    this.chartLabels.push(this.tabMem[i]);

  }
    
  
  for(let i=0; i<this.var.length;i++)
  {
    this.chartData[0].data.push(this.var[i]);/////////////////////////////////////////////////////////////////////////////////

  }
}  
  chartData: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: 'nbre articles',
      data:[]= [],/////////////////////////////////////////////////////////////////////////////////////////////////////////////
      pointHitRadius: 15, // expands the hover 'detection' area
      pointHoverRadius: 8, // grows the point when hovered

      // ⤵️ Add these
      pointRadius: 2,
      borderColor: '#2D2F33', // main line color aka $midnight-medium from @riapacheco/yutes/seasonal.scss
      pointBackgroundColor: '#2D2F33',
      pointHoverBackgroundColor: '#2D2F33',
      borderWidth: 2, // main line width
      hoverBorderWidth: 0, // borders on points
      pointBorderWidth: 0, // removes POINT borders
      tension: 0.3, // makes line more squiggly
    }
    
  ];
  chartLabelsPie: string[] = ["student","teacher"];
  chartLabels: string[] = [];//oubien au lieu de faire push on met ça: chartLabels=this.tabMem;
  chartOptions: ChartOptions = { 
    responsive: true,
    maintainAspectRatio: false,

    // ⤵️ Remove the grids
    scales: {
      xAxis: {
        display: false,
        grid: {
        }
      },
      yAxis: {
        max: 10,
        //display: false,//////////////////////////////////////////////////////////////////////////////////////////////////

      }
     
    },

    // ⤵️ Remove the main legend
  
    plugins: {
      legend: {
        display: true
      },

      tooltip: {
        // ⤵️ tooltip main styles
        backgroundColor: 'white',
        displayColors: false, // removes unnecessary legend
        padding: 10,

        // ⤵️ title
        titleColor: '#2D2F33',
        titleFont: {
          size: 18
        },

        // ⤵️ body
        bodyColor: '#2D2F33',
        bodyFont: {
          size: 13
        }
      }
    }
  };
   
}
