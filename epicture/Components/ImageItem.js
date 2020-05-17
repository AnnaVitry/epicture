import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { AuthSession } from 'expo';

class ImageItem extends React.Component {
  
    _displayFavoriteImage() {
      if (this.props.isImageFavorite) {
        return (
          <Image
            style={styles.favorite_image}
            source={require('../Images/ic_favorite3.png')}
          />
        )
      }
    }

    render() {
        const { image, displayDetailForImage } = this.props
        return (
          <TouchableOpacity style={styles.main_container } onPress={() => displayDetailForImage(image.id)}>
            <Image
              style={styles.image}
              source={{uri: image.previewURL}}
            />
            <View style={styles.fav}>
                {this._displayFavoriteImage()}
            </View>
          </TouchableOpacity>
        )
      }
    }

    const styles = StyleSheet.create({
      main_container: {
        width: 105,
        height: 105,
        margin: 5,
        marginBottom: 10,
        alignItems: "center",
        marginLeft: 7
      },
      image: {
        width: 100,
        height: 100,
        margin: 5,
        backgroundColor: 'gray',
      },
      fav: {
        position: "absolute",
        left: 7,
        top: 0,
        marginTop: 5
      },
      favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5
      }
    })
    

export default ImageItem