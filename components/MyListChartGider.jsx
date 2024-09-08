import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import PieChart from 'react-native-pie-chart'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { globals } from './globals'

export default function MyListChartGider({ inputValues = [0,0,0,0,0,0,0,1] , totalAmount = 100 }) {


    const widthAndHeight = 30
    const values = [0,0,0,0,0,0,0,1]
    const sliceColorGider = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#333333' , '#ffffff']
    const sliceColorGelir = ['#ffff00', '#ff0000' , '#ffffff']
    let sliceColor = sliceColorGelir


    const data = [
        { id: '1', color: '#ff0000', text: 'Kira' },
        { id: '2', color: '#ffff00', text: 'Market' },
        { id: '3', color: '#00ff00', text: 'Fatura' },
        { id: '4', color: '#00ffff', text: 'Eğlence' },
        { id: '5', color: '#0000ff', text: 'Giyim' },
        { id: '6', color: '#ff00ff', text: 'Ulaşım' },
        { id: '7', color: '#333333', text: 'Diğer' },
        //{ id: '8', color: '#ff9100', text: 'Maaş' },
        //{ id: '9', color: '#ff6c00', text: 'Ek Gelir' },
      ];

      if (inputValues.reduce((acc, val) => acc + val, 0) === 0) {
        inputValues = values;
        sliceColor = sliceColorGider;
      }


    const renderItem = ({ item, index }) => {

        const category = globals.categoryList.find(Category => Category.id === item.category_id);
  
        const textColor = category && category.gelir ? 'green' : 'red';

        let localtotalAmount = inputValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        
        return (      
            <View style={{display:'flex',flexDirection:'row', gap:10, alignItems:'center', flex:1, backgroundColor:'#393f4d', borderRadius:10, marginBottom:10, padding:10, justifyContent:'flex-start'}}>

                    <PieChart
                        widthAndHeight={widthAndHeight}
                        series={[inputValues[index], localtotalAmount - inputValues[index]]}
                        sliceColor={[item.color, '#ffffff']}
                        coverRadius={0.60}
                        coverFill={'#272b35'}
                    />

                    <View style={{gap:10, alignItems:'flex-start', flex:1, backgroundColor:'#393f4d', borderRadius:10, justifyContent:'center'}}>
                        <Text style={[{color: '#ffffff'}]}>{item.text}</Text>
                        <View style={{display:'flex',flexDirection:'row', gap:50, alignItems:'center', flex:1, justifyContent:'space-between'}}>
                            <Text style={[{color: '#ffffff'}]}>%{parseFloat((inputValues[index] / localtotalAmount * 100).toFixed(2))}  (₺{inputValues[index]})</Text>
                        </View>
                        
                    </View>
                
            </View>
        );
      };
    
    
    return (
        <ScrollView style={[styles.container]}>
            <Text style={{
                fontSize: 20,
                color: '#ffffff'
            }}>Gider Listesi</Text>
            <View style={[styles.subContainer, {alignItems:'center'}]}>
                <View style={{display:'flex',flexDirection:'row',gap:5,alignItems:'flex-start',flex:1}}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        contentContainerStyle={styles.container2}
                    />
                </View>


            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:0,
        backgroundColor: "#272b35",
        padding:20,
        borderRadius:15,
        elevation:1,
        maxHeight:240
    },
    subContainer:{
        marginTop:10,
        marginBottom:30,
        display:'flex',
        flexDirection:'row',
        gap:20
    },
    row: {
        flex: 1,
        justifyContent: 'space-between',
        gap: 10
      },
    container2: {
        paddingHorizontal: 0,
    },

})