/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import HomeScreenNew from './tabs/Home.tsx';
import DefineScreenNew from './tabs/Define.tsx';
import HistoryScreenNew from './tabs/History.tsx';

import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Button,
  GestureResponderEvent,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OptionsScreenNew from './tabs/Options.tsx';

enableScreens();

const Tab = createBottomTabNavigator();

const MyTheme: Theme = {
  ...DarkTheme, // or DarkTheme
  colors: {
    ...DarkTheme.colors, // or DarkTheme.colors
    primary: '#bbbbbb',
    background: '#bbbbbb',
    card: '#11131f',
    text: '#ffffff',
    border: '#393f4d',
    notification: '#ffffff',
  },
};

function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveBackgroundColor: '#272b35',
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveBackgroundColor: '#34495e',
          tabBarInactiveTintColor: '#ffffff',
          headerTintColor: '#ffffff',
        }}>
        <Tab.Screen
          name="Özet"
          component={HomeScreenNew}
          options={{
            tabBarIcon: ({color}) => (
              <Image
                source={require('./components/images/icon_summary.png')}
                style={[{height: 30, width: 30, tintColor: '#ffffff'}]}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Tanımla"
          component={DefineScreenNew}
          options={{
            tabBarIcon: ({color}) => (
              <Image
                source={require('./components/images/icon_transaction.png')}
                style={[{height: 30, width: 30, tintColor: '#ffffff'}]}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Geçmiş"
          component={HistoryScreenNew}
          options={{
            tabBarIcon: ({color}) => (
              <Image
                source={require('./components/images/icon_history.png')}
                style={[{height: 30, width: 30, tintColor: '#ffffff'}]}
              />
            ),
          }}
        />
        {
          <Tab.Screen
            name="Ayarlar"
            component={OptionsScreenNew}
            options={{
              tabBarIcon: ({color}) => (
                <Image
                  source={require('./components/images/icon_history.png')}
                  style={[{height: 30, width: 30}]}
                />
              ),
            }}
          />
        }
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bbb',
    padding: 20,
    borderRadius: 15,
    elevation: 1,
  },

  subContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
  },

  subContainerCol: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
  },

  chartContainer: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
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
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
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

export default App;
