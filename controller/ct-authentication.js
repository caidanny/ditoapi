const admin = require('../config/firebase-service');

const createUser = async (req, res) => {
    const {
        uid
    } = req.body;

    // const user = await admin.auth().createUser({
    //     email,
    //     phoneNumber,
    //     password,
    //     displayName: `${firstName} ${lastName}`,
    //     photoURL: photoUrl
    // });

    return res.json({halo : "word"});
};

module.exports = createUser