/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { globals, categoryListAdd } from './components/globals.tsx'
import Category from './classess/Category.tsx';

import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

let category1 = new Category(1, 'Kira', require('./components/images/icon_category_kira.png'), false);
categoryListAdd(category1)
 category1 = new Category(2, 'Market', require('./components/images/icon_category_market.png'), false);
 categoryListAdd(category1)
 category1 = new Category(3, 'Fatura', require('./components/images/icon_category_fatura.png'), false);
 categoryListAdd(category1)
 category1 = new Category(4, 'Eğlence', require('./components/images/icon_category_entertainment.png'), false);
 categoryListAdd(category1)
 category1 = new Category(5, 'Giyim', require('./components/images/icon_category_giyim.png'), false);
 categoryListAdd(category1)
 category1 = new Category(6, 'Ulaşım', require('./components/images/icon_category_travel.png'), false);
 categoryListAdd(category1)
 category1 = new Category(7, 'Diğer', require('./components/images/icon_category_other.png'), false);
 categoryListAdd(category1)
 category1 = new Category(8, 'Maaş', require('./components/images/icon_category_salary.png'), true);
 categoryListAdd(category1)
 category1 = new Category(9, 'Ek Gelir', require('./components/images/icon_category_income.png'), true);
 categoryListAdd(category1)

 let foundCategory = globals.categoryList.find(Category => Category.displayName === 'Kira') // Kira'nın id sini bulan query
 console.log(foundCategory.id)


if(storage.contains('transactionData')) {
  const jsonData = storage.getString('transactionData')
  const parsedData = JSON.parse(jsonData)
  globals.transactionList = parsedData.map(transaction => ({
     ...transaction,
     date: new Date(transaction.date)
   }));
}
 
 //globals.transactionList = parsedData






AppRegistry.registerComponent(appName, () => App);
