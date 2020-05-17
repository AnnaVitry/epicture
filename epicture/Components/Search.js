import React from 'react'
import ImageItem from './ImageItem'
import ImageList from './ImageList'
import { getImagesFromApiWithSearchedText } from '../API/Api'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native'
import { Logs } from 'expo'

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.searchedText = "";
        this.page = 0;
        this.per_page = 20;
        this.max_item = 500;
        this.totalPages = 0;
        this.state = { 
            images: [],
            isLoading: false
        }
        this._loadImages = this._loadImages.bind(this)
      }

      componentDidMount = () => {
          this._loadImages();
      }

    _loadImages() {
        //if (this.searchedText.length > 0) {
            this.setState({ isLoading: true }) 
            getImagesFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
                this.page = this.page + 1;
                this.max_item = data.totalHits;
                this.totalPages = this.max_item / this.per_page;
                this.setState({
                    images: [ ...this.state.images, ...data.hits ],
                    isLoading: false
                });
            })
        //}
    }

    _searchTextInputChanged(text) {
        this.searchedText = text;
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

    _searchImages() {
        this.page = 0
        this.totalPages = 0
        this.per_page = 20;
        this.max_item = 500;
        this.setState({ images: [] }, () => { 
            this._loadImages(); 
        })
    }


    render() {
        return (
            <ImageBackground source={require('../Images/bokeh3.jpeg')} style={{width: '100%', height: '100%'}}>
                <View style= {styles.main_container} onPress={() => displayDetailForImage(image.id)}>
                    <TextInput 
                        style = {styles.textinput} 
                        placeholder ='Mots clés'
                        onChangeText = {(text) => this._searchTextInputChanged(text)}
                        onSubmitEditing = {() => this._searchImages()}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity = { .5 }
                        onPress = {() => this._searchImages()}
                    >
                        <Text style={styles.TextStyle}> SUBMIT </Text>
                    </TouchableOpacity>

                    <ImageList  
                        images={this.state.images} 
                        navigation={this.props.navigation} 
                        loadImages={this._loadImages} 
                        page={this.page} 
                        totalPages={this.totalPages}
                        favoriteList={false}
                    />
                    {this._displayLoading()}
                </View>
            </ImageBackground>

        )
    }
}

    const styles = StyleSheet.create({
        main_container: {
            flex: 1,
            marginTop: 20
        },
        textinput: {
            marginLeft: 50,
            marginRight: 50,
            height: 50,
            borderColor: 'white',
            borderWidth: 1,
            paddingLeft: 5,
            borderRadius:25,
            backgroundColor: 'white'
        },
        button: {
            marginTop: 10,
            alignSelf: 'center',
            paddingBottom:15,
            paddingRight: 15,
            paddingLeft: 15,
            paddingTop:15,
            backgroundColor:'#FEBB01',
            borderRadius:25,
            borderColor: '#fff'
        },
        TextStyle:{
            color:'#fff',
            textAlign:'center',
        },
        loading_container: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 100,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }
    })

export default Search