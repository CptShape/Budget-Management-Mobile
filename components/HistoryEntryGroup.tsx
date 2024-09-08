import { View, Text, StyleSheet, Image, FlatList, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import PieChart from 'react-native-pie-chart'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { globals } from './globals'
import Transaction from '../classess/Transaction'
import HistoryEntry from './HistoryEntry'

export default function HistoryEntryGroup({ monthlyTransactions } : { monthlyTransactions : Transaction[] }) {

    

    const currentDate = new Date();
    let past30Date = new Date();
    past30Date.setDate(currentDate.getDate() - 30);

    //const [dailyTransactions, setdailyTransactions] = useState([] as Transaction[])

    //let dailyTransactions = globals.transactionList.filter(transaction => transaction.date >= past30Date && transaction.date <= currentDate)





    monthlyTransactions.sort((a, b) => b.date.getTime() - a.date.getTime());

    const groupedTransactions: Transaction[][] = [];
    let currentGroup: Transaction[] = [];

    for (let i = 0; i < monthlyTransactions.length; i++) {
      if (
        i > 0 &&
        (monthlyTransactions[i].date.getFullYear() !== monthlyTransactions[i - 1].date.getFullYear() ||
         monthlyTransactions[i].date.getMonth() !== monthlyTransactions[i - 1].date.getMonth() ||
         monthlyTransactions[i].date.getDate() !== monthlyTransactions[i - 1].date.getDate())
      ) {
        groupedTransactions.push(currentGroup);
        currentGroup = [];
      }
      currentGroup.push(monthlyTransactions[i]);
    }

    // Son gruptaki transactionları ekleyelim
    if (currentGroup.length > 0) {
      groupedTransactions.push(currentGroup);
    }

    console.log(groupedTransactions);




      

    const renderItem = ({ item }: { item: Transaction[] }) => {
        
        return (
          <HistoryEntry dailyTransactions={item}/>
        );
      };
    
      const ItemSeparator = () => (
        <View style={styles.separator} />
      );
      
      return (
        <SafeAreaView style={styles.dayHeader2}>
  
          <View style={[styles.dayHeader]}>
            <Text style={styles.dateText}>İşlem Tarihi</Text>
            <Text style={styles.dateText}>Günlük Tutar</Text>
          </View>
        
    
          <FlatList
          data={groupedTransactions}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparator}
        />
          
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#393f4d",
      padding:20,
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
  
    
    separator: {
      height: 1,
      backgroundColor: '#000000',
      marginLeft: 0,
      marginRight: 0,
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
    dayHeader2: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#393f4d',
      flex:1
    },
    dateText: {
      color: 'white',
      fontWeight: 'bold',
    },
    totalPriceText: {
      color: 'white',
    },
  });