import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { globals } from '../components/globals';
import { useFocusEffect } from '@react-navigation/native';
import HistoryEntryGroup from '../components/HistoryEntryGroup';
import { SelectList } from 'react-native-dropdown-select-list';
import Transaction from '../classess/Transaction';

const HistoryScreenNew = () => {
  const [showMode, setshowMode] = useState('month' as string);
  const [selectedCategory, setSelectedCategory] = useState("Son 30 Gün");

  const currentDate = new Date();
  let past30Date = new Date();
  past30Date.setDate(currentDate.getDate() - 30);
  let past7Date = new Date();
  past7Date.setDate(currentDate.getDate() - 7);
  let past1Date = new Date();
  past1Date.setDate(currentDate.getDate() - 1);

  const [sendMonthlyTransaction, setsendMonthlyTransaction] = useState([] as Transaction[]);

  let displayNames = ['Son 30 Gün', 'Bu Ay', 'Bu Hafta', 'Bugün'];
  const [dropdownData, setDropdownData] = useState(
    displayNames.map((value, index) => ({
      key: (1 + index).toString(),
      value: value
    }))
  );

  function onCategorySelected(selectedValue: string): void {
    let newShowMode = 'month';
    if (selectedValue === 'Son 30 Gün') {
      newShowMode = 'month';
    } else if (selectedValue === 'Bu Ay') {
      newShowMode = 'thismonth'
    } else if (selectedValue === 'Bu Hafta') {    
      newShowMode = 'week';
    } else if (selectedValue === 'Bugün') {
      newShowMode = 'day';
    }

    setshowMode(newShowMode);
    setsendMonthlyTransaction(getFilteredTransactions({ inputMode: newShowMode }));
  }

  const getStartOfCurrentDay = (currentDate: Date): Date => {
    const startOfDay = new Date(currentDate);
    startOfDay.setHours(0, 0, 0, 0); // Günün başlangıcına ayarla
    return startOfDay;
  };

  const getFirstDayOfCurrentWeek = (currentDate: Date): Date => {
    const dayOfWeek = currentDate.getDay(); // Pazar günü 0, Pazartesi günü 1, ... Cumartesi günü 6
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Pazartesi günü başlatmak için
    firstDayOfWeek.setHours(0, 0, 0, 0); // Günün başlangıcına ayarla
    return firstDayOfWeek;
  };

  const getFirstDayOfCurrentMonth = (currentDate: Date): Date => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    firstDayOfMonth.setHours(0, 0, 0, 0); // Günün başlangıcına ayarla
    return firstDayOfMonth;
  };

  const getFilteredTransactions = ({ inputMode }: { inputMode: string }) => {
    let filteredTransactions = globals.transactionList.filter(
      transaction => transaction.date >= past30Date && transaction.date <= currentDate
    );

    if (inputMode === 'thismonth') {
      filteredTransactions = globals.transactionList.filter(
        transaction => transaction.date >= getFirstDayOfCurrentMonth(currentDate) && transaction.date <= currentDate
      );
    } else if (inputMode === 'month') {
      filteredTransactions = globals.transactionList.filter(
        transaction => transaction.date >= past30Date && transaction.date <= currentDate
      );
    } else if (inputMode === 'week') {
      filteredTransactions = globals.transactionList.filter(
        transaction => transaction.date >= getFirstDayOfCurrentWeek(currentDate) && transaction.date <= currentDate
      );
    } else if (inputMode === 'day') {
      filteredTransactions = globals.transactionList.filter(
        transaction => transaction.date >= getStartOfCurrentDay(currentDate) && transaction.date <= currentDate
      );
    }

    return filteredTransactions;
  };

  useFocusEffect(
    React.useCallback(() => {
      onCategorySelected(selectedCategory);
    }, [selectedCategory])
  );

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
      <View style={[styles.subContainer, { justifyContent: 'center' }, { backgroundColor: '#393f4d' }]}>
        <SelectList
          onSelect={() => {}}
          setSelected={(val: string) => setSelectedCategory(val)}
          data={dropdownData}
          save="value"
          fontFamily='lato'
          search={true}
          boxStyles={{ borderRadius: 0 }}
          placeholder='Son 30 Gün'
        />
      </View>
      <HistoryEntryGroup monthlyTransactions={sendMonthlyTransaction} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#393f4d",
    padding: 20,
    borderRadius: 1,
    elevation: 1
  },
  subContainer: {
    marginTop: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subContainerCol: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 0
  },
  iconContainer: {
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
    marginTop: 10,
    marginLeft: 20
  }
});

export default HistoryScreenNew;
