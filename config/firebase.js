const firebase = require('firebase');
const auth = require('firebase/auth');
var admin = require("firebase-admin");
var serviceAccount = require('./serviceAccountKey.json')
// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyCW3glGCxAuo7YWkQEwUtlkUNXldvNDHC8",
    authDomain: "ditoweb-ceefd.firebaseapp.com",
    databaseURL: "https://ditoweb-ceefd.firebaseio.com",
    projectId: "ditoweb-ceefd",
    storageBucket: "ditoweb-ceefd.appspot.com",
    messagingSenderId: "444892954689",
    appId: "1:444892954689:web:090dc569da6666f07306c0",
    measurementId: "G-Z6D3BXNZ91"
};

class Firebase {
    constructor() {
        !admin.apps.length ? admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://ditoweb-ceefd.firebaseio.com"
        }) : admin.app();

        this.db = admin.database();
    }

    getUserRef(uid) {
        return this.db.ref('players/' + uid);
    }

    getEmailInfo() {
        return this.db.ref('emailInfo')
    }

    saveGK(gks = []) {
        return gks.forEach(item => {
            if (item.uid && item.date) {
                this.db.ref('gks/'+ item.uid).set(item.date);
            }
        })
    }

    getGKs() {
        return this.db.ref('gks').once('value');
    }

}
module.exports = Firebase;