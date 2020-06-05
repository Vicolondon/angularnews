import { Component, OnInit, ɵConsole } from '@angular/core';
import { ArticleService } from "../../service/article/article.service";
import { LoginService } from "../../service/login/login.service";
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public userData: any;
  public allFavorites: any;

  constructor(
    private ArticleService: ArticleService,
    private LoginService: LoginService
  ) { }

public showFavorites = async () =>{
    if(localStorage.getItem("bookmarks")){
      this.getAllFavoris();
    }
  };

private getAllFavoris = async () =>{
  let getAllFavori;
  if(localStorage.getItem("bookmarks")){
    getAllFavori= await [JSON.parse(localStorage.getItem("bookmarks"))];
  }
  this.allFavorites = getAllFavori[0];
}

public removeFavorites = async(id) =>{
    if (localStorage.getItem("access_token")) {
      let newAllFavori = [];
      let getAllOldFavori;
      let token = localStorage.getItem("access_token");
      this.userData = await this.ArticleService.removeFavorites(id, token);
      this.ArticleService.removeFavorites(id, token);
      getAllOldFavori = await [JSON.parse(localStorage.getItem("bookmarks"))];
      getAllOldFavori[0].forEach(element => {
          if( element[0] !== id ){
              newAllFavori.push(element);
          }
      });
      localStorage.setItem('bookmarks', JSON.stringify(newAllFavori));
    }
    this.getAllFavoris();
}

public goArticles = (id) =>{
  localStorage.setItem("sources", id);
  localStorage.setItem("keywords", "null");
}

public isConnected = async() =>{
  if (localStorage.getItem("access_token")) {
    let token = localStorage.getItem("access_token");
    this.userData = await this.LoginService.getUserInfo(token);
  }
}

  ngOnInit() {
    this.isConnected();
    this.showFavorites();
  }
}
