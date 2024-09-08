import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import PieChart from 'react-native-pie-chart'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function TestChart() {

    const widthAndHeight = 250
    const values = [1,2,3,4,5]
    const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00']
    
    
    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 20,
            }}>My Chart</Text>
            <View style={styles.subContainer}>
            <PieChart
                widthAndHeight={widthAndHeight}
                series={values}
                sliceColor={sliceColor}
                coverRadius={0.45}
                coverFill={'#bbb'}
            />

            <View style={{display:'flex',flexDirection:'row',gap:5,alignItems:'center'}}>
                <Image source={require('./images/blankCircle.png')} />
                <Text>NA</Text>
            </View>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:300,
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
    }

})