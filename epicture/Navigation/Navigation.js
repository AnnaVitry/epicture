import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator  } from 'react-navigation-tabs'
import Search from '../Components/Search'
import ImageDetail from '../Components/ImageDetail'
import Favorites from '../Components/Favorites'
import { StyleSheet, Image } from 'react-native';
import Test from '../Components/Test'


const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher',
      headerTintColor: "#FEBB01"
    }
  },
  ImageDetail: {
    screen: ImageDetail,
    navigationOptions: {
      headerTintColor: "#FEBB01"
    }
  }
})

const FavoritesStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favoris',
      headerTintColor: "#FEBB01"
    }
  },
  ImageDetail: {
    screen: ImageDetail
  }
})

const ImagesTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarIcon: () => <Image source={require('../Images/ic_search1.png')} style={styles.icon}/>
    }
  },
  Favorites: {
    screen: FavoritesStackNavigator,
    navigationOptions: {
      tabBarIcon: () => <Image source={require('../Images/ic_favorite1.png')} style={styles.icon}/>
    }
  },
  Test: {
    screen: Test
  },
},
{
    tabBarOptions: {
      activeBackgroundColor: '#FFFFFF',
      inactiveBackgroundColor: '#DDDDDD',
      showLabel: false,
      showIcon: true
    }
});

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(ImagesTabNavigator)