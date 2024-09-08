import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, StyleSheet, View, ScrollView, Button, GestureResponderEvent, TextInput, FlatList, TouchableOpacity } from 'react-native';
import MyPieChartGider from '../components/MyPieChartGider.jsx';
import { globals, setIncome } from '../components/globals.tsx'
import { useFocusEffect } from '@react-navigation/native';
import MyListChartGider from '../components/MyListChartGider.jsx';
import MyPieChartGelir from '../components/MyPieChartGelir.jsx';
import MyListChartGelir from '../components/MyListChartGelir.jsx';







const getCurrentDateTime = () => {
    const now = new Date();
    return now;
  };


  
  let totalAmount = 0;
  
  

  

const HomeScreenNew = () => {

    let monthNames = [ "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık" ];

    let currentDate = getCurrentDateTime(); // tarih
    let currentMonth = currentDate.getMonth(); // ay
    let currentDay = currentDate.getDate(); // gün

    const getFirstDayOfCurrentMonth = (currentDate: Date): Date => {
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      firstDayOfMonth.setHours(0, 0, 0, 0); // Günün başlangıcına ayarla
      return firstDayOfMonth;
    };






    // Gelir Gider kısmı
    const [localGelir, setlocalGelir] = useState(0)
    const [localGider, setlocalGider] = useState(0)

    const calculateGelirGider = () => {

      let calculatedGelir = 0
      let calculatedGider = 0

      const filteredTransactions = globals.transactionList.filter(Transaction => {
        return Transaction.date.getMonth() === currentMonth;
      });

      filteredTransactions.forEach(transaction => {
        let category = globals.categoryList.find(category => category.id === transaction.category_id)
        if(!category) return 0
        if(category.gelir == true) {
          calculatedGelir += transaction.tutar
        }
        if(category.gelir == false) {
          calculatedGider += transaction.tutar
        }
      })

      setlocalGelir(calculatedGelir)
      setlocalGider(calculatedGider)
    }





    // Bottom Data
    const [localMostExpenseCategory, setlocalMostExpenseCategory] = useState('İŞLEM YOK' as string)
    const [localTransactionAmount, setlocalTransactionAmount] = useState(0)
    const [localMostExpense, setlocalMostExpense] = useState(0)

    const calculateBottomData = ({isGelir} : {isGelir : boolean}) => {

      let category = globals.categoryList.find(category => category.id === mostExpenseCategory({isGelir : isGelir}))
      if(!category) setlocalMostExpenseCategory('İŞLEM YOK')
      if(category) setlocalMostExpenseCategory(category.displayName)

      setlocalTransactionAmount(categoryTransactionAmount({inputID: mostExpenseCategory({isGelir : isGelir})}))
      setlocalMostExpense(categoryExpenses({inputID: mostExpenseCategory({isGelir : isGelir})}))
    }

    const mostExpenseCategory = ({isGelir} : {isGelir : boolean}) => {

      let maxTotalTutar = 0
      let maxTotalID = 0

      globals.categoryList.filter(category => category.gelir === isGelir).forEach(category => {

        let totalTutar = categoryExpenses({inputID: category.id})
        if(totalTutar > maxTotalTutar) {
          maxTotalTutar = totalTutar
          maxTotalID = category.id
        }
      })
      return maxTotalID
    }

    const categoryExpenses = ({ inputID }: { inputID: number }) => {

      let foundCategory = globals.categoryList.find(category => category.id === inputID)
      if(!foundCategory) return 0        
      let totalTutar = 0
      let categoryTutars = globals.transactionList.filter(transaction => transaction.category_id === inputID && transaction.date >= getFirstDayOfCurrentMonth(getCurrentDateTime()) && transaction.date <= getCurrentDateTime()).map(transaction => transaction.tutar)
      categoryTutars.forEach(tutar => {
        totalTutar += tutar
      })
      return totalTutar
    }

    const categoryTransactionAmount = ({ inputID }: { inputID : number}) => {

      let foundCategory = globals.categoryList.find(category => category.id === inputID)
      if(!foundCategory) {
        return 0
      }
      return globals.transactionList.filter(transaction => transaction.category_id === inputID && transaction.date >= getFirstDayOfCurrentMonth(getCurrentDateTime()) && transaction.date <= getCurrentDateTime()).length
    }














    

    

    



    

    

    

    

    const pieExpenseValues = () => {
      let array = [] as number[]
      globals.categoryList.forEach(category => {
        if(category.gelir == false) {
          array.push(categoryExpenses({inputID: category.id}))
        }        
      })
      return array
    }

    const pieIncomeValues = () => {
      let array = [] as number[]
      globals.categoryList.forEach(category => {
        if(category.gelir == true) {
          array.push(categoryExpenses({inputID: category.id}))
        }        
      })
      return array
    }

    const [chartDataGelir, setchartDataGelir] = useState([] as number[])
    const [chartDataGider, setchartDataGider] = useState([] as number[])

    

    

    

    
    

  
    
    const [selectedTab, setSelectedTab] = useState('Gider');

    const [showChart, setshowChart] = useState(true)
    
    const [giderBtnColor, setgiderBtnColor] = useState('#434a5b');
    const [gelirBtnColor, setgelirBtnColor] = useState('#272b35');
    const [chartBtnColor, setchartBtnColor] = useState('#434a5b');
    const [listBtnColor, setlistBtnColor] = useState('#272b35');

    const [bottomText1, setbottomText1] = useState('En çok harcama yapılan kategori')
    const [bottomText2, setbottomText2] = useState('Harcama sayısı')
    const [bottomText3, setbottomText3] = useState('Harcanan miktar')

    const [sendTotalAmount, setsendTotalAmount] = useState(0 as number)

    const giderBtnOnPress = () => {

      setSelectedTab('Gider')

      setchartDataGelir(calculateChartData({ isGelir : true}))

      setchartDataGider(calculateChartData({ isGelir : false}))

      calculateBottomData({isGelir : false})

      setgiderBtnColor('#434a5b')
      setgelirBtnColor('#272b35')
      setbottomText1('En çok harcama yapılan kategori')
      setbottomText2('İşlem sayısı')
      setbottomText3('Harcanan miktar')

    }

    const gelirBtnOnPress = () => {

      setSelectedTab('Gelir')

      setchartDataGelir(calculateChartData({ isGelir : true}))

      setchartDataGider(calculateChartData({ isGelir : false}))

      calculateBottomData({isGelir : true})

      setgiderBtnColor('#272b35')
      setgelirBtnColor('#434a5b')
      setbottomText1('En çok gelir elde edilen kategori')
      setbottomText2('İşlem sayısı')
      setbottomText3('Kazanılan miktar')

    }

    const chartBtnOnPress = () => {

      setchartBtnColor('#434a5b')
      setlistBtnColor('#272b35')
      setshowChart(true)


    }

    const listBtnOnPress = () => {

      //setsendTotalAmount(pieFunction()?.reduce((accumulator, currentValue) => accumulator + currentValue, 0) as number)
      setchartBtnColor('#272b35')
      setlistBtnColor('#434a5b')
      setshowChart(false)

      
    }

    const calculateChartData = ({ isGelir } : { isGelir : boolean }) => {

      let temp = [] as number[]

      if(isGelir === false) {
        if(pieExpenseValues()?.reduce((accumulator, currentValue) => accumulator + currentValue, 0) === 0) return [0, 0, 0, 0, 0, 0, 0, 1] as number[]
        temp = pieExpenseValues() as number[]
        temp.push(0)
        return temp
      }
      if(isGelir === true) {
        if(pieIncomeValues()?.reduce((accumulator, currentValue) => accumulator + currentValue, 0) === 0) return [0, 0, 1] as number[]
        temp = pieIncomeValues() as number[]
        temp.push(0)
        return temp
      }

      return [0, 0, 0, 0, 0, 0, 0, 1] as number[]
    }
  

   useFocusEffect(
    React.useCallback(() => {

      setchartDataGelir(calculateChartData({ isGelir : true}))
      setchartDataGider(calculateChartData({ isGelir : false}))

      calculateGelirGider()
      calculateBottomData({isGelir : false})

      setSelectedTab('Gider')
      setgiderBtnColor('#434a5b')
      setgelirBtnColor('#272b35')
      setbottomText1('En çok harcama yapılan kategori')
      setbottomText2('İşlem sayısı')
      setbottomText3('Harcanan miktar')

      setchartBtnColor('#434a5b')
      setlistBtnColor('#272b35')
      setshowChart(true)

    }, [])
  );

  

return (
  <View style={styles.containernew}>
    {/* Header */}
    <View style={styles.header}>
      <TouchableOpacity>
        <Text style={styles.headerArrow}>{''}</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.headerMonth}>{monthNames[currentMonth].toString()}</Text>
        <View style={styles.headerAmounts}>
          <Text style={styles.headerIncome}>Gelir: {localGelir.toString()}</Text>
          <Text style={styles.headerExpense}>Gider: {localGider.toString()}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Text style={styles.headerArrow}>{''}</Text>
      </TouchableOpacity>
    </View>

    {/* Main Content Area (ScrollView) 
    <ScrollView style={styles.scrollView}>
      
    </ScrollView>*/}

    <View style={[{marginTop:30, marginBottom:10}]}>
      {showChart ? (
        selectedTab == 'Gelir' ? (
                    <MyPieChartGelir inputValues={chartDataGelir}/>
                ) : (
                    <MyPieChartGider inputValues={chartDataGider}/>
                )
            ) : (

              selectedTab == 'Gelir' ? (
                <MyListChartGelir inputValues={chartDataGelir} totalAmount={sendTotalAmount} />
            ) : (
                <MyListChartGider inputValues={chartDataGider} totalAmount={sendTotalAmount} />
            )
                
            )}

    </View>
    

    {/* Bottom Tabs */}
    <View style={styles.tabContainer}>
      <TouchableOpacity style={[styles.tab, {backgroundColor:giderBtnColor}]} onPress={giderBtnOnPress}>
        <Text style={styles.tabText}>Gider</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {backgroundColor:gelirBtnColor}]} onPress={gelirBtnOnPress}>
        <Text style={styles.tabText}>Gelir</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {backgroundColor:chartBtnColor}]} onPress={chartBtnOnPress}>
        <Text style={styles.tabText}>Chart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {backgroundColor:listBtnColor}]} onPress={listBtnOnPress}>
        <Text style={styles.tabText}>Liste</Text>
      </TouchableOpacity>
    </View>

    {/* Spending Info */}
    <View style={styles.spendingInfo}>
      <Text style={styles.spendingTitle}>{bottomText1}</Text>
      <Text style={styles.spendingCategory}>{localMostExpenseCategory}</Text>
      <Text style={styles.spendingDetail}>{bottomText2}</Text>
      <Text style={styles.spendingAmount}>{localTransactionAmount}</Text>
      <Text style={styles.spendingDetail}>{bottomText3}</Text>
      <Text style={styles.spendingAmount}>{localMostExpense}</Text>
    </View>
  </View>
);
};


  const styles = StyleSheet.create({
    containernew: {
      flex: 1,
      backgroundColor: '#393f4d',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#272b35',
      padding: 15,
    },
    headerArrow: {
      color: 'white',
      fontSize: 24,
    },
    headerMonth: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerAmounts: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerIncome: {
      color: '#8FFF8F',
      marginRight: 10,
    },
    headerExpense: {
      color: '#FF8F8F',
    },
    scrollView: {
      flex: 1,
      backgroundColor: '#393f4d',
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: '#272b35',
      borderRadius: 25,
      margin: 10,
      padding: 5,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
      borderRadius:40,
    },
    tabText: {
      color: 'white',
    },
    spendingInfo: {
      backgroundColor: '#272b35',
      padding: 15,
      margin: 10,
      borderRadius: 10,
    },
    spendingTitle: {
      color: 'white',
      fontSize: 16,
    },
    spendingCategory: {
      color: '#FFD700',
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 5,
    },
    spendingDetail: {
      color: 'white',
      marginTop: 5,
    },
    spendingAmount: {
      color: '#FFD700',
      fontSize: 20,
      fontWeight: 'bold',
    },
    container: {
      backgroundColor: "#bbb",
      padding:20,
      borderRadius:15,
      elevation:1
    },
  
    subContainer:{
      marginTop:10,
      display:'flex',
      flexDirection:'row',
      gap:40
    },
  
    subContainerCol:{
      marginTop:10,
      display:'flex',
      flexDirection:'column',
      gap:40
    },
  
    chartContainer:{
      marginTop:40,
      display:'flex',
      flexDirection:'row',
      gap:40
    },
  
    monthText: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      top: 20,
      color: '#333333', // Ay metni rengi
    },
    testingText: {
      marginTop:10,
      display:'flex',
      flexDirection:'row',
      gap:40,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      top: 20,
      color: '#333333', // Ay metni rengi
    },
    incomeText: {
      top: 0,
      fontSize: 18,
      color: '#666666', // Gün metni rengi
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: 200,
      paddingHorizontal: 10,
    },
    separator: {
      height: 1,
      backgroundColor: '#000000',
      marginLeft: 0,
      marginRight: 0,
    },
  });

  

  export default HomeScreenNew