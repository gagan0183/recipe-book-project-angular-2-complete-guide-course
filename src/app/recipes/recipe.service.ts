import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Recipe } from './recipe';
import { Ingredient } from '../ingredient';
import 'rxjs/rx';

@Injectable()
export class RecipeService {
  recipeChanges = new EventEmitter<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('Dummy', 'Dummy', 'http://www.grakmar.com.pl/galeria/1432724373_2.jpg', [
      new Ingredient('French Fries', 9),
      new Ingredient('Meat', 9)
    ]),
    new Recipe('Dummy', 'Dummy', 'http://www.grakmar.com.pl/galeria/1432724373_2.jpg', [])
  ];
  constructor(private http: Http) { }

  addItem(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editItem(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  sendData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://recipe-17b4c.firebaseio.com/recipes.json', body, {
      headers: headers
    });
  }

  fetchData() {
    this.http.get('https://recipe-17b4c.firebaseio.com/recipes.json')
      .map((response) => response.json())
      .subscribe(
        (data) => {
          console.log(data);
          for(let d in data) {
            this.recipes = data[d];
            this.recipeChanges.emit(this.recipes);
          }
        }
      );
  }
}
