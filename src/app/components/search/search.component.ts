import { Output } from '@angular/core';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ArticleService } from "../../service/article/article.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() formSubmit = new EventEmitter();

  // Declarations
  public formSearch: FormGroup;
  public allSourcesName: any;

  constructor(
    private FormBuilder: FormBuilder,
    private ArticleService: ArticleService,
  ) { }

  // Method to reset form
  private resetForm = ()  => {
    this.formSearch = this.FormBuilder.group({
        // name: [ null, Validators.required ],
        source: [ null, Validators.required ],
        keywords: [ null, Validators.required ]
    });
  };

  public initSources = async() =>{
   this.ArticleService.getSources().subscribe((response:any) => {
     this.allSourcesName = response.data.sources;
     // if (localStorage.getItem("previousSource")) {
     //   this.changeSelectedSource(localStorage.getItem("previousSource"));
     // }
   });
  }

  ngOnInit() {
    this.resetForm();
    this.initSources();
  }

}
