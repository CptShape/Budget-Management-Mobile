import { globals } from "../components/globals.tsx";

export default class Category {
  id: number;
  displayName: string;
  icon: any;
  gelir: boolean;

    constructor(id: number, displayName: string, icon: string, gelir: boolean) {
    this.id = id;
    this.displayName = displayName;
    this.icon = icon;
    this.gelir = gelir;
  }

    getName() {
        return `${this.displayName}`;
    }

    /*getCategoryNames() {
        return globals.categoryList.map(Category => Category.displayName);
    }*/
  }

/* usage

import Category from './classess/js';

const category1 = new Category(1, 'Category Name', 'TBD', True);
console.log(category1.getName());

*/