import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native-web'
import { app } from '../../firebaseConfig'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebaseConfig'

export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const {email, password, name} = this.state
        signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
    }

  render() {
    return (
        <View>
            <TextInput 
                placeholder="name"
                onChangeText={(name) => this.setState({ name: name })}
            />
            <TextInput 
                placeholder="email"
                onChangeText={(email) => this.setState({ email })}
            />
            <TextInput 
                placeholder="password"
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password: password })}
            />

            <Button 
                onPress={() => this.onSignUp()}
                title="Sign In"
            />
        </View>
    )
  }
}

export default Login