import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Platform, ImageBackground} from 'react-native'
import { getImageDetailFromApi } from '../API/Api'
import moment from 'moment'
import numeral from 'numeral'

class ImageDetail extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        if (params.image != undefined && Platform.OS === 'ios') {
          return {
              headerRight: <TouchableOpacity
                              style={styles.share_touchable_headerrightbutton}
                              onPress={() => params.shareImage()}>
                              <Image
                                style={styles.share_image}
                                source={require('../Images/ic_share.png')} />
                            </TouchableOpacity>
          }
        }
    }

    constructor(props) {
        super(props)
        this.state = {
          image: undefined,
          isLoading: true
        }
        this._shareImage = this._shareImage.bind(this)
    }

    _updateNavigationParams() {
        this.props.navigation.setParams({
          shareImage: this._shareImage,
          image: this.state.image
        })
      }

    componentDidMount() {
        const favoriteImageIndex = this.props.favoritesImage.findIndex(item => item.id === this.props.navigation.state.params.idImage)
        if (favoriteImageIndex !== -1) {
            this.setState({
                image: this.props.favoritesImage[favoriteImageIndex]
            }, () => { this._updateNavigationParams() })
            return
        }
        this.setState({ isLoading: true })
        getImageDetailFromApi(this.props.navigation.state.params.idImage).then(data => {
            this.setState({
                image: data.hits[0],
                isLoading: false
            }, () => { this._updateNavigationParams() })
        })
    }

      _displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' />
            </View>
          )
        }
      }

      _displayImage() {
        const { image } = this.state
        if (image != undefined) {
          return (
            <ImageBackground source={require('../Images/bokeh3.jpeg')} style={{width: '100%', height: '100%'}}>
              <ScrollView style={styles.scrollview_container}>
                  <Image
                      style={styles.image}
                      source={{uri: image.webformatURL}}
                      resizeMode="contain"
                  />
                  <TouchableOpacity
                      style={styles.favorite_container}
                      onPress={() => this._toggleFavorite()}>
                      {this._displayFavoriteImage()}
                  </TouchableOpacity>
                  <View style={styles.content}>
                    <Image
                    style={styles.tag}
                    source={require('../Images/tag.png')} />
                    <Text style={styles.default_text}>{image.tags}</Text>
                  </View>
                  <View style={styles.content}>
                    <Image
                    style={styles.like}
                    source={require('../Images/likes.jpg')} />
                    <Text style={styles.default_text}>{image.likes}</Text>
                  </View>
                  <View style={styles.content}>
                    <Image
                      style={styles.tag}
                      source={require('../Images/ruler.png')} />
                    <Text style={styles.default_text}>{image.imageWidth}x{image.imageHeight}</Text>
                  </View>
              </ScrollView>
            </ImageBackground>
          )
        }
      }

      _displayFavoriteImage() {
        var sourceImage = require('../Images/ic_favorite_border3.png')
        if (this.props.favoritesImage.findIndex(item => item.id === this.state.image.id) !== -1) {
          sourceImage = require('../Images/ic_favorite3.png')
        }
        return (
          <Image
            style={styles.favorite_image}
            source={sourceImage}
          />
        )
    }
    
      _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.image }
        this.props.dispatch(action)
    }

    _shareImage() {
        const { image } = this.state
        Share.share({ url: image.webformatURL, tags: image.tags })
    }

    _displayFloatingActionButton() {
        const { image } = this.state
        if (image != undefined && Platform.OS === 'android') {
          return (
            <TouchableOpacity
              style={styles.share_touchable_floatingactionbutton}
              onPress={() => this._shareImage()}>
              <Image
                style={styles.share_image}
                source={require('../Images/ic_share.png')}
               />
            </TouchableOpacity>
          )
        }
    }
    
    render() {
        return (
        <View style={styles.main_container}>
            {this._displayLoading()}
            {this._displayImage()}
            {this._displayFloatingActionButton()}
        </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
      flex: 1
    },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    scrollview_container: {
      flex: 1,
    },
    image: {
      margin:5,
      flex: 1,
      height: 300,
      left: 0,
      right: 0,
      width: null
    },
    title_text: {
      fontWeight: 'bold',
      fontSize: 35,
      flex: 1,
      flexWrap: 'wrap',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      marginBottom: 10,
      color: '#000000',
      textAlign: 'center'
    },
    default_text: {
      marginLeft: 5,
      marginRight: 5,
      fontSize: 17,
    },
    favorite_container: {
        alignItems: 'center',
    },
    favorite_image: {
        width: 40,
        height: 40
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
      },
      share_image: {
        width: 30,
        height: 30
      },
      share_touchable_headerrightbutton: {
        marginRight: 8
      },
      like: {
        width: 30,
        height: 30,
        marginTop: 15
      },
      tag: {
        width: 40,
        height: 40,
        marginTop: 15
      },
      content: {
        flexDirection: 'column',
        alignItems: 'center'
      }
  })

  const mapStateToProps = (state) => {
    return {
        favoritesImage: state.favoritesImage
      }
  }
  

export default connect(mapStateToProps)(ImageDetail)