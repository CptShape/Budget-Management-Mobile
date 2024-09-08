import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { globals } from "../components/globals.tsx";

export default class Transaction {
  id: number;
  category_id: number;
  tutar: Float;
  date: Date;

    constructor(id: number, category_id: number, tutar: Float, date: Date) {
    this.id = id;
    this.category_id = category_id;
    this.tutar = tutar;
    this.date = date;
  }

    getName() {
        return `${this.tutar}`;
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