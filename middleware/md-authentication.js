const admin = require('../config/firebase-service');
const { auth } = require('firebase-admin');
const firebase = require('../config/firebase')

const getAuthToken = (req, res, next) => {    
    if (req.headers.authorization) {
        req.authToken = req.headers.authorization
    } else {
        req.authToken = null;
    }
    next();
};

const checkIfAuthenticated = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const userInfo = await admin.auth().verifyIdToken(authToken);
            req.authId = userInfo.uid;

            (new firebase()).getUserRef(userInfo.uid).once('value').then(playerSnap => {
                if (parseInt(playerSnap.val().role) === 1) {
                    return next()
                } else return res.status(401).send({ error: 'Invalid Role' });
            }).catch(e => {
                return res
                    .status(501)
                    .send({ error: e });
            })
            next();
        } catch (e) {
            return res
                .status(401)
                .send({ error: 'Unauthorized' });
        }
    });
};

module.exports = checkIfAuthenticated