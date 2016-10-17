import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native'

const window = Dimensions.get('window');

export default class ImagesPage extends Component {

    constructor(props)
    {
        super(props)

        this.state = {
            photos: [],
            loading: true
        }
    }

    componentWillMount()
    {
        this.getPhotos(this.props.data.term, this.props.data.count)
        .then( photos => this.setState({ photos, loading: false }))
        .catch( error => {
           this.setState({ loading: false })
           Alert.alert('Error', 'Images doesn\'t upload :(')
        })

        this.widthImg = window.width/this.props.data.rows
    }

    // Get url of images by search term from 500px
    getPhotos(term, count)
    {
        return fetch(`https://api.500px.com/v1/photos/search?term=${term}&consumer_key=wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF&image_size=3&rpp=${count}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            return data.photos.map( img => img.images[0].url )
        })
    }

    // Helper for split arrays on parts
    splitUp(arr, n)
    {
        let rest = arr.length % n,
            restUsed = rest,
            partLength = Math.floor(arr.length / n),
            result = []
        
        for(var i = 0; i < arr.length; i += partLength) {
            let end = partLength + i,
                add = false
            
            if(rest !== 0 && restUsed) {
                end++
                restUsed--
                add = true
            }
            
            result.push(arr.slice(i, end))
            
            if(add) {
                i++
            }
        }
        
        return result
    }

    render() 
    {
        const images = this.splitUp(this.state.photos, this.props.data.rows)

        return (
            <View style={ styles.container }>
                {
                    this.state.loading ? <ActivityIndicator size={100} color="grey" />
                    : 
                    <ScrollView style={ styles.row }>
                        <View style={{ flex: 1, flexDirection: 'row'}}>
                        {
                            images.map( (src, key) => { 
                                return (
                                    <View key={ key }>
                                        {
                                            src.map( (imgUrl, key) => <Image style={{ width: this.widthImg, height: this.widthImg}} source={{uri: imgUrl}} key={ key } />)
                                        }
                                    </View>
                                ) 
                            })
                        }
                        </View>
                    </ScrollView>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',     
    },
    img: {
        flex: 1
    },
    row: {
        flex: 1
    }
})