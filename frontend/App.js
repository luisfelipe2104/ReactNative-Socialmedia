import { NavigationContainer } from '@react-navigation/native'; // able us to navigate from page to page
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import React, { Component } from 'react'
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { View, Text, Button } from 'react-native';

const Stack = createStackNavigator() // manages screens and routes

export class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
    }
  }
  componentDidMount(){
    onAuthStateChanged(auth, (user) => {  // listens to auth changes
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true  // means we can show the navigation container
        })
      }
      else{
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading...</Text>
        </View>
      )
    }

    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
          </Stack.Navigator>
      </NavigationContainer>
      )
    }

    return(
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>User is loggedIn</Text>
        <Button 
          title="log out"
          onPress={() => signOut(auth)}
        />
      </View>
    )
  }
}

export default App
