import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import PieChart from 'react-native-pie-chart'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { globals } from './globals'

export default function MyPieChartGider({ inputValues = [0,0,0,0,0,0,0,1] }) {

    const widthAndHeight = 210
    const values = [0,0,0,0,0,0,0,1]
    const sliceColorGider = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#333333' , '#ffffff']
    const sliceColorGelir = ['#ff0000', '#ffff00' , '#ffffff']
    let sliceColor = sliceColorGider

    const data = [
        { id: '1', color: '#ff0000', text: 'Kira' },
        { id: '2', color: '#ffff00', text: 'Market' },
        { id: '3', color: '#00ff00', text: 'Fatura' },
        { id: '4', color: '#00ffff', text: 'Eğlence' },
        { id: '5', color: '#0000ff', text: 'Giyim' },
        { id: '6', color: '#ff00ff', text: 'Ulaşım' },
        { id: '7', color: '#333333', text: 'Diğer' },
      ];

      if (inputValues.reduce((acc, val) => acc + val, 0) === 0) {
        inputValues = values;
        sliceColor = sliceColorGider;
      }

      let arrayCheck = Array.isArray(inputValues)

      if(arrayCheck) {
        if(inputValues.length === 7) sliceColor = sliceColorGider;
        if(inputValues.length === 2) sliceColor = sliceColorGelir;
      }

    const renderItem = ({ item }) => {

        const category = globals.categoryList.find(Category => Category.id === item.category_id);
  
        const textColor = category && category.gelir ? 'green' : 'red';
        
        return (
            <View style={{display:'flex',flexDirection:'row',gap:5,alignItems:'center'}}>
                <Image source={require('./images/blankCircle.png')} style={[{tintColor:item.color}]} /> 
                <Text style={[{color: '#ffffff'}]}>{item.text}</Text>
            </View>
        );
      };
    
    
    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 20,
                color: '#ffffff'
            }}>Gider Çizelgesi</Text>
            <View style={styles.subContainer}>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={inputValues}
                    sliceColor={sliceColor}
                    coverRadius={0.45}
                    coverFill={'#272b35'}
                />

                <View style={{display:'flex',flexDirection:'col',gap:5,alignItems:'flex-start'}}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item => item.id)}
                    />
                </View>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:0,
        backgroundColor: "#272b35",
        padding:20,
        borderRadius:15,
        elevation:1,
    },
    subContainer:{
        marginTop:10,
        display:'flex',
        flexDirection:'row',
        gap:20
    },

})