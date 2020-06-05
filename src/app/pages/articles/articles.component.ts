import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../../service/article/article.service";
import { LoginService } from "../../service/login/login.service";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  /* 
  Declarations
  */
  public postCollection: any;
  public allArticles: any;
  public allSourcesName: any;
  public userData: any;

  /* 
  Constructor
  */
  constructor(
    private ArticleService: ArticleService,
    private LoginService: LoginService
  ) { }


  /* 
  Methods
  */
 // Method to get the post list

public getArticles = async (element) =>{
  element.source ? element.source : element.source = "";
  element.keywords ? element.keywords : element.keywords = "null";

  this.ArticleService.getArticles(element.source, element.keywords).subscribe((response:any) => {
    this.allArticles = response.data.articles;
    localStorage.setItem('sources', element.source);
    localStorage.setItem('keywords', element.keywords);
    // if (localStorage.getItem("previousSource")) {
    //   this.changeSelectedSource(localStorage.getItem("previousSource"));
    // }
  });
}

public isConnected = async() =>{
  if (localStorage.getItem("access_token")) {
    let token = localStorage.getItem("access_token");
    this.userData = await this.LoginService.getUserInfo(token);
  }
}

  ngOnInit() {
    if (localStorage.getItem("sources")) {
      this.getArticles({source: localStorage.getItem("sources"), keywords:localStorage.getItem("keywords")});
    } else {
      this.getArticles({source:'nbc-news', keywords:"null"});
    }
    this.isConnected();
  }

}
