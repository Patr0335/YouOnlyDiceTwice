import * as SecureStore from 'expo-secure-store';
import { firebaseSignupSuccess } from "../../../entities/firebaseSignupSuccess";
import { User } from "../../../entities/User";

export const SIGNUP = "SIGNUP";
export const LOGOUT = 'LOGOUT';
export const LOGIN = "LOGIN";
export const UPDATE_USER = 'UPDATE_USER';
export const REHYDRATE_USER = 'REHYDRATE_USER';
export const PHOTO_URL = "PHOTO_URL";
export const GET_USER = "GET_USER";

export const rehydrateUser = (user: User, idToken: string) => {
    return { type: REHYDRATE_USER, payload: { user, idToken } }
}

export const updateUser = (displayname: string) => {
    const APIKEY = "AIzaSyARVBYF9aJs_TJeEv7aXAvcn37PBVlN8tM"
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + APIKEY
     return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        const idToken = await SecureStore.getItemAsync('idToken');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json string
                //key value pairs of data you want to send to server
                // ...
                
                displayName: displayname, 
                idToken,
                returnSecureToken: true 
            })
        });
        const data = await response.json(); // json to javascript
        if (!response.ok) {
            //There was a problem..
            console.log("Something went wrong in updating the displayName")
        } else {
            SecureStore.setItemAsync("displayName", data.displayName);
            dispatch({type: UPDATE_USER, payload: { idToken: data.idToken, displayname: data.displayname} })
        }
    };
}

export const getUserInfo = () => {
    const APIKEY = "AIzaSyARVBYF9aJs_TJeEv7aXAvcn37PBVlN8tM"
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" + APIKEY
     return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        const idToken = await SecureStore.getItemAsync('idToken');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json string
                //key value pairs of data you want to send to server
                // ...
                user: User,
                idToken,
                returnSecureToken: true 
            })
        });
        const data = await response.json(); // json to javascript
        if (!response.ok) {
            //There was a problem..
            console.log("Something went wrong in updating the displayName")
        } else {
            dispatch({type: GET_USER, payload: { user: data.user} })
        }
    };
}

export const updateImageUrl = (photoUrl: string) => {
    const APIKEY = "AIzaSyARVBYF9aJs_TJeEv7aXAvcn37PBVlN8tM"
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + APIKEY
     return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        const idToken = await SecureStore.getItemAsync('idToken');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json string
                //key value pairs of data you want to send to server
                // ...
                photoUrl: photoUrl, 
                idToken,
                returnSecureToken: true 
            })
        });
        const data = await response.json(); // json to javascript
        if (!response.ok) {
            //There was a problem..
        } else {
            SecureStore.setItemAsync("photoUrl", data.photoUrl);
            dispatch({type: PHOTO_URL, payload: {displayname: data.displayname, photoUrl: data.photoUrl } })
        }
    };
}






export const logout = () => {
    SecureStore.deleteItemAsync('idToken'); 
    SecureStore.deleteItemAsync('user');

    return { type: LOGOUT }
}

export const login = (email : string, password : string) => {
    const APIKEY = "AIzaSyARVBYF9aJs_TJeEv7aXAvcn37PBVlN8tM"
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + APIKEY
     // laver en const som jeg kalder i min fetch forneden
     return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json string
                //key value pairs of data you want to send to server
                // ...
                email: email, 
                password: password,
                returnSecureToken: true
            })
        });
  
        const data = await response.json(); // json to javascript
        if (!response.ok) {
            //There was a problem..
        } else {
            
            // const user = new User(data.email, '', '');
             

            SecureStore.setItemAsync('idToken', data.idToken);
            // SecureStore.setItemAsync('user', JSON.stringify(user));
            // SecureStore.setItemAsync('user', JSON.stringify(user));
            // SecureStore.setItemAsync("displayName", data.displayName);


            // let expiration = new Date();
            // expiration.setSeconds( expiration.getSeconds() + parseInt(data.expiresIn) );
            // SecureStore.setItemAsync('expiration', JSON.stringify(expiration));
            // SecureStore.setItemAsync('refreshToken', data.refreshToken);
 
 
            dispatch({type: LOGIN, payload: {user:  { email: data.email, displayname: data.displayName, token: data.idToken }}})
        }
    };
 };







export const signup = (email : string, password : string) => {
    const APIKEY = "AIzaSyARVBYF9aJs_TJeEv7aXAvcn37PBVlN8tM"
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + APIKEY // laver en const som jeg kalder i min fetch forneden

   return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
       const response = await fetch(url, {

           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ //javascript to json
               //key value pairs of data you want to send to server
               // ...
               email, //email: email
               password,
               returnSecureToken: true //returns ID and refresh token. ALWAYS USE TRUE
           })
       });
 
       if (!response.ok) {
           //There was a problem.. error handling time, BUT I WONT LOL
           console.log("response problem");

       } else {
           const data: firebaseSignupSuccess = await response.json(); // json to javascript

           const user = new User(data.email, '', '');

            await SecureStore.setItemAsync('idToken', data.idToken);
            await SecureStore.setItemAsync('user', JSON.stringify(user)); // convert user js-obj. to json

           dispatch({type: SIGNUP, payload: {email: data.email, idToken: data.idToken}})
       }
   };
};