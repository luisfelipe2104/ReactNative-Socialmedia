import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from './redux/actions'

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser()
    }
  render() {
    const { currentUser } = this.props
    console.log(currentUser)
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>{currentUser?.name} is loggedIn</Text>
            <Button 
            title="log out"
            onPress={() => signOut(auth)}
            />
        </View>
    )
  }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main)