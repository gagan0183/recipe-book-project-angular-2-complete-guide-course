import { Component } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private recipeService: RecipeService) { }

  sendData() {
    this.recipeService.sendData().subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
  }

  getData() {
    this.recipeService.fetchData();
  }
}
