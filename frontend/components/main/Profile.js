import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { auth, db } from '../../firebaseConfig'
import { addDoc, orderBy, getDoc, doc, getDocs, collection } from "firebase/firestore";

function Profile(props) {
  const [userPosts, setUserPosts] = useState([])
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const { currentUser, posts } = props
    console.log({currentUser, posts})

    if (props.route.params.uid === auth.currentUser.uid) {
      setUser(currentUser)
      setUserPosts(posts)
    }

    // if the user is different from the current user
    else{
      const userReference = doc(db, "users", props.route.params.uid) // database, collection, id
        getDoc(userReference)
        .then((snapshot) => {
            if(snapshot.exists){
                console.log(snapshot.data())
                setUser(snapshot.data())
            }
            else{
                console.log('does not exists')
            }
        })

        const getPosts = async () => {
          const postList = []
          const postsCollection = collection(db, "posts")
          await getDocs(postsCollection)
          .then((snapshot) => {
              const list = []
              const posts = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
              posts.forEach((post) => {
                  if(post.user === props.route.params.uid){
                      console.log(post)
                      list.push(post)
                    }
                  })
                console.log(list)
                setUserPosts(list)
          })
        }
        getPosts()
    }
  }, [props.route.params.uid])

  if(!user){
    return(
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </View>

      <View style={styles.containerGallery}>
        <FlatList 
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({item}) => (
            <View style={styles.containerImage}>
              <Image 
                style={styles.image}
                source={{uri: item.url}}
              />
            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },
  containerInfo: {
    margin: 20
  },
  containerGallery: {
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1/1
  },
  containerImage: {
    flex: 1/3
  }
})

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
})

export default connect(mapStateToProps, null)(Profile)