import { Injectable } from '@angular/core';
import { Categories, Category } from '../../data/categories-data';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor() { }

  
  getAllCategories(filter?:any) {
   return Categories;
  }

  createCategory(model:Category) {
  return  Categories.push(model)
  }

  updateCategory(model:Category , id:number) {
    var index = Categories.findIndex((b:Category) => b.id == id)

    Categories[index] = model

    return index
  }
  
  deleteCategory(id:number) {
    var index = Categories.findIndex((b:Category) => b.id == id)
    Categories.splice(index, 1);
  }
}
