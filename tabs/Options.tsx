import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { categoryListAdd, globals } from '../components/globals';
import Category from '../classess/Category';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';

const OptionsScreenNew = () => {
  const [activeTab, setActiveTab] = useState('Tab 1');

  function onCategorySelected(): void {
    console.log(selectedCategory)
  }
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const [resetKey, setResetKey] = useState(0);

    const clearSelection = () => {
      setSelectedCategory('');
      setResetKey(resetKey + 1); // Change the reset key to force re-render
    };

    function onGelirgiderSelected(): void {
        console.log(selectedGelirgider)
      }
      const [selectedGelirgider, setSelectedGelirgider] = React.useState("");
    
      const [resetKeyGelirgider, setResetKeyGelirgider] = useState(0);
    
        const clearSelectionGelirgider = () => {
          setSelectedGelirgider('');
          setResetKeyGelirgider(resetKeyGelirgider + 1); // Change the reset key to force re-render
        };

    
    let displayNames = ['YENİ EKLE']
    globals.categoryList.map(category => category.displayName).forEach(name => {
        displayNames.push(name)
    });

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

      const [nameInput, setnameInput] = useState('');

      const handleChangeName = (text: string) => {
        if (text.length > 20) {
          return; // Eğer metin 20 karakterden uzunsa kabul etmez
        }
        
        setnameInput(text);
      };

      const [imageUri, setImageUri] = useState(null as unknown as ImagePickerResponse);


      const selectImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo'
        });
        setImageUri(result);
      };

      

      

  const renderTabContent = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Kategori güncelle/oluştur</Text>
      
      <Text style={styles.label}>Kategori seç</Text>
        <View style={styles.input}>
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
        
      
      <Text style={styles.label}>Name</Text>
      <TextInput
                  style={styles.input}
                  value={nameInput}
                  onChangeText={handleChangeName}
                  keyboardType="default"
                  placeholder="İsim giriniz"
                  textAlign='center'
                  textAlignVertical='center'
                />
      
      <Text style={styles.label}>Gelir/Gider</Text>
      <View style={styles.input}>
            <SelectList
                  onSelect={onGelirgiderSelected} 
                  setSelected={(val: React.SetStateAction<string>) => setSelectedGelirgider(val)} 
                  data={['Gelir' , 'Gider']} 
                  save="value"
                  fontFamily='lato'
                  search={true} 
                  boxStyles={{borderRadius:15}}
                  inputStyles={{textAlign:'center'}}
                  dropdownTextStyles={{textAlign:'center'}}
                  searchPlaceholder='Ara'
                  placeholder='Gelir/Gider'
                  defaultOption={{key: '', value: ''}}
                  notFoundText='Bulunamadı'
                  key={resetKeyGelirgider}
            />
        </View>
      
      <Text style={styles.label}>Renk</Text>
      <TouchableOpacity style={styles.button} onPress={selectImage}>
          <Text style={styles.buttonText}>Seç</Text>
        </TouchableOpacity>
      
    </View>
  );

    const acceptBtn = () => {
        if(selectedCategory === 'YENİ EKLE') {
            let gelirMode = true
            if(selectedGelirgider === 'Gelir') gelirMode = true
            if(selectedGelirgider === 'Gider') gelirMode = false
            const category1 = new Category(1, nameInput, 'TBD', gelirMode);
            categoryListAdd(category1)
        }
        else {
            console.log('ASDASQWEWQE')

        }
        
    }

  return (
    <View style={styles.container}>
      <View style={styles.scrollViewContent}>
        {renderTabContent()}
        <TouchableOpacity style={styles.button} onPress={acceptBtn}>
          <Text style={styles.buttonText}>Onayla</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Tab 1' && styles.activeTab]}
          onPress={() => setActiveTab('Tab 1')}
        >
          <Text style={styles.tabText}>Kategori</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Tab 2' && styles.activeTab]}
          onPress={() => setActiveTab('Tab 2')}
        >
          <Text style={styles.tabText}>Tab 2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  formContainer: {
    backgroundColor: '#8E8EB2',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  label: {
    color: '#FFFFFF',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#A0A0D0',
    borderRadius: 25,
    padding: 10,
    marginBottom: 15,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#8E8EB2',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#8E8EB2',
    padding: 10,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#A0A0D0',
    borderRadius: 20,
  },
  tabText: {
    color: '#FFFFFF',
  },
});

export default OptionsScreenNew;