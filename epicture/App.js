import React from 'react'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import Navigation from './Navigation/Navigation'
import { View } from 'react-native';

console.disableYellowBox = true; 
export default class App extends React.Component {
    render() {
        return (
          <Provider store={Store}>
            <Navigation/>
          </Provider>
        )
    }
}