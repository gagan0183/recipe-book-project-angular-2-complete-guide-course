import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe';

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  recipe: Recipe = new Recipe('Dummy', 'Dummy', 'http://www.grakmar.com.pl/galeria/1432724373_2.jpg');
  constructor() { }

  ngOnInit() {
  }

}
