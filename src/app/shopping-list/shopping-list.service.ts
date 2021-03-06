import { Ingredient } from '../ingredient';

export class ShoppingListService {
  private items: Ingredient[] = [];
  constructor() { }

  getItems() {
    return this.items;
  }

  addItems(items: Ingredient[]) {
    Array.prototype.push.apply(this.items, items);
  }

  addItem(item: Ingredient) {
    this.items.push(item);
  }

  editItem(oldIngredient: Ingredient, newIngredient: Ingredient) {
    this.items[this.items.indexOf(oldIngredient)] = newIngredient;
  }

  deleteItem(ingredient: Ingredient) {
    this.items.splice(this.items.indexOf(ingredient), 1);
  }
}
