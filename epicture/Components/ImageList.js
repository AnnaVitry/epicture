// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import ImageItem from './ImageItem'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';

class ImageList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      images: []
    }
  }

  _displayDetailForImage = (idImage) => {
    this.props.navigation.navigate('ImageDetail', {idImage: idImage})
  }

  render() {
    return (
      <ScrollView>
        <FlatList
          contentContainerStyle={styles.list}
          data={this.props.images}
          extraData={this.props.favoritesImage}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <ImageItem
              image={item}
              isImageFavorite={(this.props.favoritesImage.findIndex(image => image.id === item.id) !== -1) ? true : false}
              displayDetailForImage={this._displayDetailForImage}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!this.props.favoriteList && this.props.page < this.props.totalPages) {
              this.props.loadImages()
            }
          }}
        />
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
})

const mapStateToProps = state => {
  return {
    favoritesImage: state.favoritesImage
  }
}

export default connect(mapStateToProps)(ImageList)