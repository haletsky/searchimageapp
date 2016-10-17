import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  Image
} from 'react-native'

import ImagesPage from './imagesPage'
import OptionsPage from './optionsPage'

export default class App extends Component {

    renderScene(route, navigator) 
    {
        switch (route.title) {
            case 'Images': return <ImagesPage
                                    navBack={ () => navigator.pop() } 
                                    navPush={ (title, data) => navigator.push({ title, index: route.index + 1, data})}
                                    data={ route.data } />
            case 'Options': return <OptionsPage 
                                    navBack={ () => navigator.pop } 
                                    navPush={ (title, data) => navigator.push({ title, index: route.index + 1, data})}
                                    data={ route.data } />
            default: 
                return null;
        }
    }

    render() 
    {
        return (
           <Navigator
            navigator={ this.navigator }
            initialRoute={{ title: 'Options', index: 0 }}
            renderScene={ this.renderScene }
            configureScene={(route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJump}
            navigationBar={
                <Navigator.NavigationBar
                    routeMapper={{
                        LeftButton: (route, navigator, index, navState) =>
                        { 
                            return navState.routeStack.length !== 1 ? (
                                <TouchableHighlight underlayColor="#3C7D9E" style={ styles.navBackBtn } onPress={ () => navigator.pop() }>
                                    <Image style={ styles.navBackImg } source={require("../public/images/left-arrow.png")} />
                                </TouchableHighlight>
                            ) : null
                        },
                        RightButton: () => { return null },
                        Title: (route, navigator, index, navState) =>
                        { 
                            return (
                                <View style={ styles.titleView }>
                                    <Text style={ styles.titleText }>{route.title}</Text>
                                </View>
                            )
                        },
                    }}
                    style={ styles.container }
                    />
            }
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#336b87',
        height: 50,
    },
    navBackBtn: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navBackImg: {
        height: 30,
        width: 30
    },
    titleView: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6
    },
    titleText: { 
        fontSize: 25, 
        color: 'white' 
    }
})