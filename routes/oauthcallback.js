const createUser = require('../controller/ct-authentication');
const checkIfAuthenticated = require('../middleware/md-authentication');
const puppeteer = require('puppeteer');
const { google } = require('googleapis');
const Photos = require('googlephotos')
var express = require('express');
var router = express.Router();
const arrayShuffle = require('array-shuffle');
var emailTemplate = require('./emailtemplate')

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


router.get('/', async (req, res) => {
    // console.log('Hello' + JSON.stringify(mailInfo));

    const authCode = req.query.code
    const imgUrls = await getImgUrls(authCode);
    const players = mailInfo.players
    try {
        var template = emailTemplate(mailInfo.date, mailInfo.time, mailInfo.stadium, players, imgUrls);
        res.send(template);
    } catch (error) {
        console.log('ecec' + error);

    }
    await sendEmail(mailInfo.emailList, template);
    try {
        res.send(emailTemplate(mailInfo.date, mailInfo.time, mailInfo.stadium, players, imgUrls));
    } catch (error) {
        console.log('Send mail fail: ' + error);

    }
});

const sendEmail = (emailList, htmlBody) => {
    var options = {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_EMAIL_PASS,
        to: emailList,
        subject: 'DITO Thông Báo ' + mailInfo.date,
        html: htmlBody
    }
    const send = require('gmail-send')(options);
    return send().then(res => {
        console.log(res.result);
    })
}

const getImgUrls = async (authCode) => {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URL,
    );

    const { tokens } = await oauth2Client.getToken(authCode)

    console.log(tokens);
    //   const response = await photos.albums.list(50, pageToken);
    const photos = new Photos(tokens.access_token);
    const albumList = await photos.sharedAlbums.list(50);
    var albumIdList = [];
    await albumList.sharedAlbums.forEach(album => {
        albumIdList.push(album.id)
    })

    //shuffle list to get random album
    var shuffleAlbumIdList = arrayShuffle(albumIdList)
    const imgList = await photos.mediaItems.search(shuffleAlbumIdList[0], 100);
    var imgListUrls = [];
    await imgList.mediaItems.forEach(img => {
        imgListUrls.push(img.baseUrl)
    });

    //shuffle img list to get random urls
    var shuffleImgUrls = arrayShuffle(imgListUrls);
    var selectedImgUrls = [];
    for (let i = 0; i < 5; i++) {
        selectedImgUrls.push(shuffleImgUrls[i]);
    }
    return selectedImgUrls;
}


const doScreenCapture = async (dateTime) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(process.env.LOGIN_URL, { waitUntil: 'domcontentloaded' });
        await page.type('[name="email"]', process.env.DITO_USER);
        await page.type('[name="password"]', process.env.DITO_PASSWORD);
        await page.click('#btnLogin');
        // await page.waitFor(3000)
        // await page.screenshot({
        //     path: "./Tscreenshot.jpg",
        //     type: "jpeg",
        //     fullPage: true
        //   });
        await page.waitForSelector('#btnSetTeam');
        const divTeam = await page.$('#team')
        await page.waitFor(1000);

        let shotResult = await divTeam.screenshot().then((result) => {
            console.log('Screenshot OK');
            return result;
        }).catch(e => {
            console.error('Error in shooting screen', e);
            return false;
        });
        await browser.close();

        const cloudinary_options = {
            public_id: 'match_' + dateTime
        };

        if (shotResult) {
            result = await cloudinaryPromise(shotResult, cloudinary_options)
            return result.url;
        } else {
            return null;
        }

    } catch (error) {
        console.log('Screen Capture error: ' + error.message);
        return error
    }

}
function cloudinaryPromise(shotResult, cloudinary_options) {
    return new Promise(function (res, rej) {
        cloudinary.v2.uploader.upload_stream(cloudinary_options,
            function (error, cloudinary_result) {
                if (error) {
                    console.error('Upload to cloudinary failed: ', error);
                    rej(error);
                }
                res(cloudinary_result);
            }
        ).end(shotResult);
    });
}
module.exports = router;
