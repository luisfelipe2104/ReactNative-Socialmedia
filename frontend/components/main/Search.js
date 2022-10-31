import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { db } from '../../firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore'

function Search(props) {
    const [users, setUsers] = useState([])

    const fetchUsers = async (search) => {
        const usersCollectionRef = collection(db, 'users')
        const q = query(usersCollectionRef, where('name', '>=', search)) // 'if type L, Luís appears'
        await getDocs(q)
        .then((snapshot) => {
            const users = snapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return { id, ...data }
            }) 
            setUsers(users)
        })
        // const userList = []
        
        // // const users = docs.map((doc) => ({...doc.data(), id: doc.id}))
        // docs.forEach((user) => {
        //     console.log(`${user.data().name}`)
        //     userList.push(user)
        // })

        // setUsers(userList)
    }

    return (
        <View>
            <TextInput 
                placeholder='Type Here...'
                onChangeText={(search) => fetchUsers(search)}
            />

            <FlatList 
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Profile", {uid: item.id})}
                    >
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Search