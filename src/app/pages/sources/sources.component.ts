import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../../service/article/article.service";
import { LoginService } from "../../service/login/login.service";

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.css']
})
export class SourcesComponent implements OnInit {

  public userData: any;
  public allSourcesName: any;

  constructor(
    private ArticleService: ArticleService,
    private LoginService: LoginService
  ) { }

  public initSources = async() =>{
      this.ArticleService.getSources().subscribe((response:any) => {
          this.allSourcesName = response.data.sources;
          // if (localStorage.getItem("previousSource")) {
          //   this.changeSelectedSource(localStorage.getItem("previousSource"));
          // }
      });
   }

public addFavorites = async (id, name, description, url, category, language, country) =>{
  let token = JSON.parse(localStorage.getItem("access_token"));
  this.ArticleService.addFavorites(id, name, description, url, category, language, country, token).subscribe((response:any) => {
      // localStorage.setItem('bookmarks', JSON.stringify(tabBookmarks));
      let tabBookmarks;
      let newBookmarks= [];
      let newSource = [id, name, description, url, category, language, country, token];
      if(localStorage.getItem('bookmarks') == null){
        tabBookmarks = [];
        tabBookmarks.push(newSource);
        localStorage.setItem('bookmarks', JSON.stringify(tabBookmarks));
      } else {
        tabBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        newBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        let exist = "false";

        tabBookmarks.forEach(element => {
            if( element[0] !== id ){
              exist = "false"
            } else {
              exist = "true";
            }
        });

        if( exist === "false"){
          newBookmarks.push(newSource);
        } else{alert('Déjà dans vos favoris')}
        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      }
    // let element = {
    //   "id": id,
    //   "name": name,
    //   "description": description,
    //   "url": url,
    //   "category": category,
    //   "language": language,
    //   "country": country,
    //   "token": token
    // };
    // if(localStorage.getItem('bookmarks') == null){
    //   tabBookmarks = {};
    //   tabBookmarks[id] = element;
    //   localStorage.setItem('bookmarks', JSON.stringify(tabBookmarks));
    // } else {
    //   tabBookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    //   if(tabBookmarks[id] === undefined){
    //     tabBookmarks[id] = element;
    //     localStorage.setItem('bookmarks', JSON.stringify(tabBookmarks));
    //   } else {
    //     alert("Cette source est déjà dans vos favoris");
    //   }
    // }
  // localStorage.clear();
  });
}

public isConnected = async() =>{
  if (localStorage.getItem("access_token")) {
    let token = localStorage.getItem("access_token");
    this.userData = await this.LoginService.getUserInfo(token);
  }
}

  ngOnInit() {
    this.isConnected();
    this.initSources();
  }
}
