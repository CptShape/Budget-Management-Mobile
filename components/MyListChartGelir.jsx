import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import PieChart from 'react-native-pie-chart'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { globals } from './globals'

export default function MyListChartGelir({ inputValues = [0,0,1] , totalAmount = 100 }) {

    const widthAndHeight = 30
    const values = [0,0,1]
    const sliceColorGider = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ffffff', '#ffffff']
    const sliceColorGelir = ['#008822', '#00f0cc' , '#ffffff']
    let sliceColor = sliceColorGelir


    const data = [
        { id: '1', color: '#008822', text: 'Maaş' },
        { id: '2', color: '#00f0cc', text: 'Ek Gelir' },
      ];



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
        <View style={[styles.container]}>
            <Text style={{
                fontSize: 20,
                color: '#ffffff'
            }}>Gelir Listesi</Text>
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
        maxHeight:240
    },
    subContainer:{
        marginTop:10,
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