import { View, Text, StyleSheet, Image, FlatList, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import PieChart from 'react-native-pie-chart'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { globals } from './globals'
import Transaction from '../classess/Transaction'


export default function HistoryEntry({ dailyTransactions } : { dailyTransactions : Transaction[] }) {

    

    const currentDate = new Date();
    let past30Date = new Date();
    past30Date.setDate(currentDate.getDate() - 30);

    let monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    //const [dailyTransactions, setdailyTransactions] = useState([] as Transaction[])

    //let dailyTransactions = globals.transactionList.filter(transaction => transaction.date >= past30Date && transaction.date <= currentDate)



    let historyEntryTotalTutar = 0

    dailyTransactions.forEach(transaction => {
        let category = globals.categoryList.find(category => category.id === transaction.category_id)
        if(!category) return
        if(category.gelir == true) historyEntryTotalTutar += transaction.tutar
        if(category.gelir == false) historyEntryTotalTutar -= transaction.tutar
    })



      const renderItem = ({ item }: { item: Transaction }) => {

        const category = globals.categoryList.find(Category => Category.id === item.category_id);
  
        const textColor = category && category.gelir ? 'green' : 'red';
        
        return (
          <View style={styles.purchaseItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{category ? category.displayName : ''}</Text>
              <View style={[styles.subContainer, {justifyContent:'flex-start', gap:10}]}>
                <Image source={require('./images/icon_arrow.png')} style={[{width:20, height:20, tintColor:textColor}]} />
                <Text style={[styles.itemPrice, {color:textColor}]}>₺{item.tutar}</Text>
              </View>              
            </View>
            <Image source={category?.icon} style={[styles.icon, {width:70, height:70}]}/>
          </View>
        );
      };
      
      return (
        <SafeAreaView style={styles.container}>

          <View style={styles.dayHeader}>
            <Text style={styles.dateText}>{dailyTransactions[0].date.getDate().toString()} {monthNames[dailyTransactions[0].date.getMonth()].toString()} {dailyTransactions[0].date.getFullYear().toString()}</Text>
            <Text style={styles.totalPriceText}>₺ {historyEntryTotalTutar}</Text>
          </View>
        
    
          <FlatList
          data={dailyTransactions}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
          
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#272b35",
      padding:10,
      borderRadius:1,
      elevation:1
    },
  
    subContainer:{
      marginTop:10,
      display:'flex',
      flexDirection:'row',
      justifyContent: 'space-between'
    },
  
    subContainerCol:{
      marginTop:10,
      display:'flex',
      flexDirection:'column',
      gap:0
    },
  
    iconContainer:{
      justifyContent: 'center',
      alignItems: 'flex-start'
    },

    displayNameStyle: {
      marginTop:10,
      marginLeft:20
    },
    dayHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#34495e',
    },
    dateText: {
      color: 'white',
      fontWeight: 'bold',
    },
    totalPriceText: {
      color: 'white',
    },
    purchaseItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#272b35',
      marginVertical: 1,
    },
    itemInfo: {
      flex: 1,
    },
    itemName: {
      fontSize: 16,
      color: 'white',
    },
    itemPrice: {
      fontSize: 14,
      color: '#f39c12',
    },
    icon: {
      marginLeft: 10,
    },
  });