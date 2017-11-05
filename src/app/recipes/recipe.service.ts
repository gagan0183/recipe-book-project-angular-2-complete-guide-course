import { Injectable } from '@angular/core';

import { Recipe } from './recipe';
import { Ingredient } from '../ingredient';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Dummy', 'Dummy', 'http://www.grakmar.com.pl/galeria/1432724373_2.jpg', [
      new Ingredient('French Fries', 9),
      new Ingredient('Meat', 9)
    ]),
    new Recipe('Dummy', 'Dummy', 'http://www.grakmar.com.pl/galeria/1432724373_2.jpg', [])
  ];
  constructor() { }

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
}
