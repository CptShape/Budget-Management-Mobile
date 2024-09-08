import React, { useState } from 'react'
import { SafeAreaView, Text, StyleSheet, View, ScrollView, Button, GestureResponderEvent, TextInput, FlatList, ColorValue, TouchableOpacity, Modal } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import DatePicker from 'react-native-date-picker';
import { globals, transactionListAdd } from '../components/globals.tsx';
import Category from '../classess/Category.tsx';
import Transaction from '../classess/Transaction.tsx'
import { storage } from '../index.js';



const DefineScreenNew = () => {

    let [gelirButtonColor, setGelirButtonColor] = useState("#bbbbbb" as ColorValue)
    let [giderButtonColor, setGiderButtonColor] = useState("#0055bb" as ColorValue)

    let gelirMode = false

    function gelirBtnOnPress(event: GestureResponderEvent): void {
      gelirMode = true
      // gelir/gider moduna göre kategori isimlerini çeker
      displayNames = globals.categoryList.filter(category => category.gelir === gelirMode).map(category => category.displayName);
      updateDropdownData()
      setGelirButtonColor("#0055bb" as ColorValue)
      setGiderButtonColor("#bbbbbb" as ColorValue)
      clearSelection()
      setSelectedTab('Gelir')
    }
  
    function giderBtnOnPress(event: GestureResponderEvent): void {
      gelirMode = false
      // gelir/gider moduna göre kategori isimlerini çeker
      displayNames = globals.categoryList.filter(category => category.gelir === gelirMode).map(category => category.displayName);
      updateDropdownData()
      setGelirButtonColor("#bbbbbb" as ColorValue)
      setGiderButtonColor("#0055bb" as ColorValue)
      clearSelection()
      setSelectedTab('Gider')
    }
  
    function onCategorySelected(): void {
      console.log(selectedCategory)
    }

    // ??
    const [selectedCategory, setSelectedCategory] = React.useState("");

    // gelir/gider moduna göre kategori isimlerini çeker
    let displayNames = globals.categoryList.filter(category => category.gelir === gelirMode).map(category => category.displayName);

    // deprecated
    const valueArray = ['test', 'Kira', 'Market', 'Fatura', 'Eğlence', 'Giyim', 'Ulaşım', 'Diğer'];





    // dropdown ekranında gözüken listenin ayarlanması
    const [dropdownData, setDropdownData] = useState(
      displayNames.map((value, index) => ({
        key: (1 + index).toString(),
        value: value
    })));

    const updateDropdownData = () => {
      setDropdownData(
        displayNames.map((value, index) => ({
          key: (1 + index).toString(),
          value: value
        }))
      );
    };

    const isFloat = (value: any): boolean => {
      return typeof value === 'number' && Number.isFinite(value);
    };



    // Ekle düğmesi basılınca
    function ekleBtnOnPress(event: GestureResponderEvent): void {
      let selectedCategoryData = globals.categoryList.find(Category => Category.displayName === selectedCategory)

      if(!selectedCategory) { // kategori seçilmemiş yada seçerken bir hata meydana geldi

        setmodalMessage('Lütfen bir kategori seç.')
        toggleModal()
        return

      }  

      if(numberTutar.length === 0) { // numberTutar boş ise
        
        setmodalMessage('Lütfen geçerli bir miktar gir.')
        toggleModal()
        return 

      }

      if(numberTutar === '.') { // numberTutar'a sadece nokta girilmiş ise
        
        setmodalMessage('Lütfen geçerli bir miktar gir.')
        toggleModal()
        return 

      }

      if(selectedCategoryData) { // değerler doğru, transaction verisini oluştur ve listeye ekle
        let transaction = new Transaction(1, selectedCategoryData.id, parseFloat(numberTutar), new Date(date));
        transactionListAdd(transaction)
        storage.set('transactionData', JSON.stringify(globals.transactionList))
        const jsonData = storage.getString('transactionData')
        console.log("JsonData: " + jsonData)
      }

      setNumberTutar('')

    }

    function resetBtnOnPress(event: GestureResponderEvent): void {
      
      const empty = [] as Transaction[]
      storage.set('transactionData', JSON.stringify(empty))
      globals.transactionList = empty

    }

    

    const getCurrentDateTime = () => {
      const now = new Date();
      return now;
    };

    const currentDate = getCurrentDateTime(); // tarih
    const currentMonth = currentDate.getMonth(); // ay

    const filteredTransactions = globals.transactionList.filter(Transaction => {
      return Transaction.date.getMonth() === currentMonth;
    });

    


  
    // datePicker
    let monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
  
    const [numberTutar, setNumberTutar] = useState('');
  
    // Tutar girme kutusu handler
    const handleChange = (text: string) => {
      // Virgülden sonra en fazla iki basamağa izin verir
      const formattedText = text.replace(/[^0-9.]/g, ''); // Sadece sayıları ve noktayı kabul eder
      if (formattedText.length > 20) {
        return; // Eğer metin 20 karakterden uzunsa kabul etmez
      }
      if (formattedText.includes('.')) {
        const parts = formattedText.split('.');
        if (parts.length > 2) {
          // İkinci bir nokta varsa kabul etmez
          return;
        }
        const decimalPart = parts[1];
        if (decimalPart.length > 2) {
          return;
        }
      }
      setNumberTutar(formattedText);
    };
    
    const [resetKey, setResetKey] = useState(0);

    const clearSelection = () => {
      setSelectedCategory('');
      setResetKey(resetKey + 1); // Change the reset key to force re-render
    };

    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };

    const [modalMessage, setmodalMessage] = useState('Hata')







    const [selectedTab, setSelectedTab] = useState('Gider');

    return (
      <SafeAreaView style={[styles.container]}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <View style={[styles.modalContainer]}>
          <View style={[styles.modalView]}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={[styles.button, {marginTop:0, padding:12, borderRadius:15}]} onPress={ekleBtnOnPress}>
              <Text style={[styles.buttonText, {}]}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>

        <View style={styles.container}>
          <View style={[styles.tabContainer]}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'Gider' && styles.activeTab]}
              onPress={giderBtnOnPress}
            >
              <Text style={[styles.tabText, selectedTab === 'Gider' && styles.activeTabText]}>Gider</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'Gelir' && styles.activeTab]}
              onPress={gelirBtnOnPress}
            >
              <Text style={[styles.tabText, selectedTab === 'Gelir' && styles.activeTabText]}>Gelir</Text>
            </TouchableOpacity>
          </View>

           <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>İşlem Tarihi</Text>
              <View style={styles.inputnew}>
                <TouchableOpacity onPress={() => setOpen(true)} style={[{alignItems:'center'}]}>
                  <Text>{date.getDate().toString() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear().toString()}</Text>
                </TouchableOpacity> 
                  <DatePicker
                    mode={'date'}
                    modal
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                      setOpen(false)
                      setDate(date)
                    }}
                    onCancel={() => {
                      setOpen(false)
                    }}
                    maximumDate={getCurrentDateTime()}
                    minimumDate={new Date(getCurrentDateTime().getFullYear(), 0, 1)}
                  />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>İşlem Kategorisi</Text>
              <View style={[styles.inputnew, {padding:5}]}>
                <SelectList
                  onSelect={onCategorySelected} 
                  setSelected={(val: React.SetStateAction<string>) => setSelectedCategory(val)} 
                  data={dropdownData} 
                  save="value"
                  fontFamily='lato'
                  search={true} 
                  boxStyles={{borderRadius:15}}
                  inputStyles={{textAlign:'center'}}
                  dropdownTextStyles={{textAlign:'center'}}
                  searchPlaceholder='Ara'
                  placeholder='Kategori seç'
                  defaultOption={{key: '', value: ''}}
                  notFoundText='Bulunamadı'
                  key={resetKey}
                />
              </View>
              
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>İşlem Tutarı</Text>
              <View style={[styles.inputnew, {alignItems:'center'}]}>
                <TextInput
                  style={[styles.inputnew, {padding:0}]}
                  value={numberTutar}
                  onChangeText={handleChange}
                  keyboardType="numeric"
                  placeholder="Sayı giriniz"
                  textAlign='center'
                  textAlignVertical='center'
                />
              </View>
              
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={ekleBtnOnPress}>
            <Text style={styles.buttonText}>İşlemi Ekle</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={resetBtnOnPress}>
            <Text style={styles.buttonText}>Tüm Veriyi Sıfırla</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>

    );
  }

  const styles = StyleSheet.create({

    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      width: 300,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    textInput: {
      width: '100%',
      padding: 10,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
    },
  
    subContainer:{
      display:'flex',
      flexDirection:'row',
    },
  
    subContainerCol:{
      display:'flex',
      flexDirection:'column',
    },
  
    
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: 200,
      paddingHorizontal: 10,
    },

    container: {
      flex: 1,
      backgroundColor: '#393f4d',
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: '#393f4d',
    },
    tab: {
      flex: 1,
      padding: 15,
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: '#272b35',
    },
    tabText: {
      color: '#ffffff',
    },
    activeTabText: {
      color: '#FFF',
    },
    formContainer: {
      backgroundColor: '#272b35',
      padding: 20,
    },
    formGroup: {
      marginBottom: 15,
    },
    label: {
      color: '#ffffff',
      marginBottom: 5,
    },
    inputnew: {
      backgroundColor: '#393f4d',
      color: '#FFF',
      padding: 10,
      borderRadius: 20,
    },
    button: {
      backgroundColor: '#272b35',
      padding: 15,
      borderRadius: 20,
      alignItems: 'center',
      marginHorizontal: 20,
      marginTop:25
    },
    buttonText: {
      color: '#FFF',
    },
  });

  export default DefineScreenNew
