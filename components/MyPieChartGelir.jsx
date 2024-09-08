import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import PieChart from 'react-native-pie-chart'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { globals } from './globals'

export default function MyPieChartGelir({ inputValues = [0,1] }) {

    const widthAndHeight = 210
    const values = [0,1]
    const sliceColorGelir = ['#008822', '#00f0cc' , '#ffffff']
    let sliceColor = sliceColorGelir

    const data = [
        { id: '1', color: '#008822', text: 'Maaş' },
        { id: '2', color: '#00f0cc', text: 'Ek Gelir' },
      ];

      if (inputValues.reduce((acc, val) => acc + val, 0) === 0) {
        inputValues = values;
        sliceColor = sliceColorGelir;
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
            }}>Gelir Çizelgesi</Text>
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