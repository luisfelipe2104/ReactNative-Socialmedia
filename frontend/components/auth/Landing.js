import React from 'react'
import { View, Text, Button } from 'react-native-web'

function Landing({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center'}}>
        <Text></Text>
        <Button 
            title="Register"
            onPress={() => navigation.navigate("Register")}
        />
        <Button 
            title="Login"
            onPress={() => navigation.navigate("Login")}
        />
    </View>
  )
}

export default Landing