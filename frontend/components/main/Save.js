import React, { useState } from 'react'
import { View, Text, TextInput, Image, Button } from 'react-native'
import { db, auth, firebaseConfig } from '../../firebaseConfig'
import { uploadBytes, getDownloadURL, ref, getStorage } from 'firebase/storage'
import { collection, serverTimestamp, getDocs, addDoc, getDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
// 2:30
import { initializeApp } from 'firebase/app';

initializeApp(firebaseConfig)

export default function Save(props) {
    const postCollectionRef = collection(db, 'posts')
    const image = props.route.params.image
    const [caption, setCaption] = useState("")
    const [url, setUrl] = useState("")

    const uploadImage = async () => {
      const storage = getStorage()
        const storageUrl = `posts/${auth.currentUser.uid}/${Math.random().toString()}`
        console.log(image)
        const response = await fetch(image)
        const bytes = await response.blob() // creates a blob from the uri and pass to firestore
        
        const imageRef = ref(storage, storageUrl)
        await uploadBytes(imageRef, bytes)
        .then(() => {
            getDownloadURL(imageRef)
            .then((url) => {
              setUrl(url)
              console.log(url)
              savePostData(url)
              // setImage(null)
            }).catch(err => {
              console.log(err.message)
            })
          })
          .catch(err => {
            console.log(err.message)
          })

          

          const savePostData = async (imageUrl) => {
            const postDoc = doc(db, 'posts', auth.currentUser.uid)
                                  await addDoc(postCollectionRef, {
                                    url: imageUrl,
                                    caption: caption,
                                    user: auth.currentUser.uid,
                                    creation: serverTimestamp()
                                  }).then((function () {
                                    console.log("okkkk")
                                   props.navigation.popToTop()
                                  })).catch(err => {
                                    console.log(err.message)
                                  })
          }

    }   

  return (
    <View style={{flex: 1}}>
        <Image source={{uri: image}} />
        <TextInput 
            placeholder='Write a caption...'
            onChangeText={(caption) => setCaption(caption)}
        />
        <Button 
            title="save" 
            onPress={() => uploadImage()}
        />
    </View>
  )
}
