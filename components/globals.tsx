import { useState } from 'react';
import Category from '../classess/Category.tsx'
import Transaction from '../classess/Transaction.tsx';
import HomeScreenNew from '../tabs/Home.tsx';
import { storage } from '../index.js';

export const globals = {
    income: 1000 as Number,
    expense: 333 as Number,
    categoryList: [] as Category[],
    transactionList: [] as Transaction[],
    globalTotalGider: 0 as number,
    globalTotalGelir: 0 as number,
  };








 


  export const setIncome = (value: Number) => {
    globals.income = value;
  };

  export const categoryListAdd = (value: Category) => {
    globals.categoryList.push(value);
  };

  export const transactionListAdd = (value: Transaction) => {
    globals.transactionList.push(value);
  };
  