import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs/rx';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  private recipeIndex: number;
  private subscription: Subscription;
  private recipe: Recipe;
  private isNew = true;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.isNew = true;
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if(params.hasOwnProperty('id')) {
          this.isNew = false;
          this.recipeIndex = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.recipeIndex);
        }
        else {
          this.isNew = true;
        }
        this.initForm();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initForm() {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';
    let recipeIngredients: FormArray = new FormArray([]);
    if(!this.isNew) {
      for(let i = 0; i < this.recipe.ingredients.length; i++) {
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
            amount: new FormControl(this.recipe.ingredients[i].amount, [
              Validators.required,
              Validators.pattern("\\d+")
            ])
          }
        ));
      }
      recipeName = this.recipe.name;
      recipeImageUrl = this.recipe.imagePath;
      recipeContent = this.recipe.description;
    }
    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImageUrl, Validators.required],
      description: [recipeContent, Validators.required],
      ingredients: recipeIngredients
    });
    console.log(this.recipeForm);
  }

  onAddItem(name: string, amount: string) {
    console.log("in onAddItem");
    (<FormArray>this.recipeForm.controls['ingredients']).controls.push(
        new FormGroup({
              name: new FormControl(name, Validators.required),
              amount: new FormControl(amount, [
                Validators.required,
                Validators.pattern("\\d+")
              ])
        })
    );
  }

  onRemoveItem(index: number) {
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
  }

  private navigate() {
    this.router.navigate(['../']);
  }

  onCancel() {
    this.navigate();
  }

  onSubmit() {
    const newRecipe = this.recipeForm.value;
    if(this.isNew) {
      this.recipeService.addItem(newRecipe);
    }
    else {
      this.recipeService.editItem(this.recipe, newRecipe);
    }
  }
}
