import { addDoc, orderBy, getDoc, doc, getDocs, collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../../firebaseConfig";
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE } from "../constants";

export function fetchUser(){
    return((dispacth) => {
        const userReference = doc(db, "users", auth.currentUser.uid) // database, collection, id
        getDoc(userReference)
        .then((snapshot) => {
            if(snapshot.exists){
                console.log(snapshot.data())
                dispacth({type: USER_STATE_CHANGE, currentUser: snapshot.data()})  // updates the current user
            }
            else{
                console.log('does not exists')
            }
        })
    })
}
// orderBy("creation", "asc")
export function fetchUserPosts(){
    return( async (dispacth) => {
        const postList = []
        const postsCollection = collection(db, "posts")
        await getDocs(postsCollection)
        .then((snapshot) => {
            const posts = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            posts.forEach((post) => {
                if(post.user === auth.currentUser.uid){
                    console.log(post)
                    postList.push(post)
                }
            })
            console.log(postList)
            dispacth({type: USER_POSTS_STATE_CHANGE, posts: postList}) // updates the posts
        })
    })
}

export function fetchUserFollowing(){
    return( async (dispacth) => {
        const followingList = []
        const followingCollection = collection(db, "following")
        await getDocs(followingCollection)
        .then((snapshot) => {
            const following = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            following.forEach((item) => {
                if(item.following === auth.currentUser.uid){
                    console.log(item)
                    followingList.push(item)
                }
            })
            console.log(followingList)
            dispacth({type: USER_FOLLOWING_STATE_CHANGE, following: followingList}) // updates the posts
        })
    })
}