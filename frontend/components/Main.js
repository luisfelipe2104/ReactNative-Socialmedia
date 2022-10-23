import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from './redux/actions'


import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile';

const Tab = createMaterialBottomTabNavigator()
const EmptyScreen = () => {
    return(null)
}

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser()
    }
  render() {
    // const { currentUser } = this.props
    // console.log(currentUser)
    return (
        <Tab.Navigator initialRouteName='Feed' labeled={false}>
            <Tab.Screen name="Feed" component={FeedScreen} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                    }} />

            <Tab.Screen name='AddContainer' component={EmptyScreen} 
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault()
                        navigation.navigate("Add")
                    }
                })}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name='plus' color={color} size={26} />
                    )
                }}
            />

            <Tab.Screen name="Profile" component={ProfileScreen} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name='account-circle' color={color} size={26} />
                    ),
                }}
            />
            
        </Tab.Navigator>
    )
}
}
// <View style={{ flex: 1, justifyContent: 'center' }}>
//     <Text>{currentUser?.name} is loggedIn</Text>
//     <Button 
//     title="log out"
//     onPress={() => signOut(auth)}
//     />
// </View>

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main)