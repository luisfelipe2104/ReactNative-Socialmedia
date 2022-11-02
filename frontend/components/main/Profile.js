import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { auth, db } from '../../firebaseConfig'
import { addDoc, orderBy, getDoc, doc, getDocs, collection, query, where, deleteDoc } from "firebase/firestore";

function Profile(props) {
  const [followingList, setFollowingList] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [user, setUser] = useState(null)
  const [following, setFollowing] = useState(false)
  const followingCollection = collection(db, 'following')

  const onFollow = async () => {
    setFollowing(true)
    await addDoc(followingCollection, {user : props.route.params.uid, following : auth.currentUser.uid})
  }

  const onUnfollow = async () => {
    setFollowing(false)
    const q = query(followingCollection, where("following", '==', auth.currentUser.uid))
    await getDocs(q)
    .then(async (snapshot) => {
      const users = snapshot.docs.map(doc => {
          const data = doc.data()
          const id = doc.id
          return { id, ...data }
      }) 
      users.forEach(async (item) => {
        if (item.user === props.route.params.uid) {
          const FollowingDoc = doc(db, "following", item.id)
          await deleteDoc(FollowingDoc)
          .then(() => {
            console.log("okkkk")
          }).catch(err => console.log(err))
          
        }
      })

  })
    // console.log(q)
  }
  
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
    const checkFollowing = async () => {
      await getDocs(followingCollection)
      .then((item) => {
        const data = item.docs.map((doc) => ({...doc.data(), id: doc.id}))
        console.log(data)
        data.forEach((i) => {
          if(i.user === props.route.params.uid && i.following === auth.currentUser.uid) {
            setFollowing(true)
            console.log("yesssss")
          }
        })
      })
    } 
    checkFollowing()
    
  }, [props.route.params.uid, props.following])

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

        {props.route.params.uid !== auth.currentUser.uid ? (
          <View>
            {following ? (
              <Button 
                title='Following'
                onPress={() => onUnfollow()}
              />
            ) : (
              <Button 
                title='Follow'
                onPress={() => onFollow()}
              />
            )}
          </View>
        ) : null}
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
  following: store.userState.following
})

export default connect(mapStateToProps, null)(Profile)