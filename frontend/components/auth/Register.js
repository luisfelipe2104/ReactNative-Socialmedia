import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native'
import { app, db } from '../../firebaseConfig'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { collection, addDoc, getDoc, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore'
import { async } from '@firebase/util'

export class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
        this.usersCollectionRef = collection(db, "users")
    }

    async onSignUp() {
        console.log()
        const {email, password, name} = this.state
        createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
            console.log(result)
            const userReference = doc(db, "users", auth.currentUser.uid) // database, collection, id
            const add = async () => await setDoc(userReference, {name, email})  // adds the user to the database
            add()
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
                title="Sign Up"
            />
        </View>
    )
  }
}

export default Register