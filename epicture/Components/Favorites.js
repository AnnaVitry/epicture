import React from 'react'
import ImageList from './ImageList'
import { connect } from 'react-redux'
import { StyleSheet, Text, ImageBackground} from 'react-native'

class Favorites extends React.Component {

  render() {
    return (
      <ImageBackground source={require('../Images/bokeh3.jpeg')} style={{width: '100%', height: '100%'}}>
        <ImageList  
            images={this.props.favoritesImage} 
            navigation={this.props.navigation} 
            favoriteList={true}
        />
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({})

const mapStateToProps = state => {
    return {
      favoritesImage: state.favoritesImage
    }
  }
  
export default connect(mapStateToProps)(Favorites)