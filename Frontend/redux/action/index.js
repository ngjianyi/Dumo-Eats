import { doc, getDoc } from "firebase/firestore";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import { User_State_Change } from "@/redux/constant"
const docRef = doc(DATA_BASE, "user", AUTH.currentUser?.uid);
// const docSnap = await getDoc(docRef);
//gist: fetch user data from firecloud and dispatches an action to update redux store state
//dispatch is a function used to send actions to reducer, so the action here is UserStateChange, 
//fetchUserData is action creater that returns an async function
//async function fetches data from firestore, and then uses the dispatch function to send the action to reducer
//The action { type: UserStateChange, currentUser: docSnap.data() } has a type (UserStateChange) and 
//payload (currentUser set to the fetched data).

export function fetchUserData() {
    return (
        async (dispatch) => {
            await getDoc(docRef).then((docSnap) => {
                if (docSnap.exists()) {
                    console.log(docSanp.data())
                    dispatch({type: User_State_Change, currentUser: docSnap.data()})
                } else {
                    console.log("No such user YET")
                }
            })
        }
    )
}