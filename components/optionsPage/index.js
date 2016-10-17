import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Slider,
  BackAndroid,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'

export default class OptionsPage extends Component {

    constructor(props)
    {
        super(props)

        this.state = {
            rows: 2,
            term: '',
            count: 20,
            loading: true
        }
    }

    componentDidMount() 
    {

        AsyncStorage.getItem('termKey').then( term => {
            this.setState({ term, loading: false })
        }).catch( error => {
            console.log(error)
            this.setState({ loading: false })
        })


        // Doesn't work..
        
        // BackAndroid.addEventListener('hardwareBackPress', () => {
        //     this.props.navBack()
        //     return true
        // })
    }

    onSearch()
    {
        AsyncStorage.setItem('termKey', this.state.term);

        this.props.navPush('Images', {
            rows: this.state.rows, 
            term: this.state.term, 
            count: this.state.count 
        })
    }

    render()
    {
        return this.state.loading ? <ActivityIndicator size={100} color="grey" />
        : (
            <View style={ styles.container }>
                <View>
                    <View style={ styles.field }>
                        <Text style={ styles.text }>Columns:</Text>
                        <Slider 
                            style={ styles.slider }
                            minimumValue={ 1 }
                            maximumValue={ 5 }
                            step={ 1 }
                            value={ 2 }
                            onValueChange={ rows => this.setState({ rows }) } />
                        <Text style={ styles.text }>{ this.state.rows }</Text>
                    </View>
                    <View style={ styles.field }>
                        <Text style={ styles.text }>Count:</Text>
                        <Slider 
                            style={ styles.slider }
                            minimumValue={ 0 }
                            maximumValue={ 100 }
                            step={ 1 }
                            value={ 20 }
                            onValueChange={ count => this.setState({ count }) } />
                        <Text style={ styles.text }>{ this.state.count }</Text>
                    </View>
                    <View style={ styles.field }>
                        <Text style={ styles.text }>Search term: </Text>
                        <TextInput 
                            style={ styles.input }
                            value={ this.state.term }
                            onChangeText={ term => this.setState({ term }) }
                            onSubmitEditing={ this.onSearch.bind(this) }/>
                    </View>
                </View>
                <TouchableHighlight underlayColor="#30CCB9" style={ styles.searchBtn } onPress={ this.onSearch.bind(this) }>
                    <Text style={ styles.searchText }>SEARCH</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: '#2a3132'
    },
    searchBtn: {
        borderRadius: 3,
        borderColor: '#26a69a',
        marginTop: 50,
        padding: 10,
        paddingHorizontal: 50,
        borderWidth: 1,
        backgroundColor: '#26a69a',
        shadowColor: 'black',
        elevation: 2
    },
    searchText: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    },
    slider: {
        flex:1
    },
    input: {
        width: 200,
        fontSize: 16
    }
})