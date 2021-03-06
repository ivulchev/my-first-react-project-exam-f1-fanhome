import { endpoints } from './services.js';
import * as request from './requester.js';
import { auth } from './initializeFirebase.js';


function saveData({ uid, email, accessToken, }) {
    localStorage.setItem('_id', uid);
    localStorage.setItem('email', email);
    localStorage.setItem('accessToken', accessToken);
}
function getData() {
    let _id = localStorage.getItem('_id');
    let email = localStorage.getItem('email');
    let accessToken = localStorage.getItem('accessToken');

    return {
        _id,
        email,
        accessToken,
    }
}
function login(email, password) {
   return request.post(endpoints.loginUrl, { email, password })
        .then(data => {
            if(data.email !== undefined){
                 saveData(data)
            }else{
                window.alert(data.message)
                
            }
        });
  
}

function isAuthenticated() {
    let token = localStorage.getItem('accessToken');

    return Boolean(token);
}
function register(email, password) {
    return request.post(endpoints.registerUrl, { email, password, })
        .then(data => {
            saveData(data)
        })
}

function logout() {
    if (isAuthenticated()) {
        return auth.signOut()
            .then(res => {
                localStorage.clear();
                return res;
            })
    }
}
export function getToken() {
    let accessToken = localStorage.getItem('accessToken');

    return accessToken;
}



export const authServices = {
    saveData,
    getData,
    login,
    isAuthenticated,
    register,
    logout,
    getToken,
}