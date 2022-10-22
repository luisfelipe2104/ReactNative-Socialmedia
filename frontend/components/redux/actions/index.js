import { addDoc, getDoc, doc } from "firebase/firestore";
import { db, auth } from "../../../firebaseConfig";
import { USER_STATE_CHANGE } from "../constants";

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