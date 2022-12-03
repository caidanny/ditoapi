const createUser = require('../controller/ct-authentication');
const checkIfAuthenticated = require('../middleware/md-authentication');
const { google } = require('googleapis');
const Photos = require('googlephotos')
var express = require('express');
var router = express.Router();
const firebase = require('../config/firebase')
const arrayShuffle = require('array-shuffle');
var emailTemplate = require('./emailtemplate');
const { resource } = require('../app');

router.post('/', checkIfAuthenticated, async (req, res, next) => {
  mailInfo = req.body;
  var refresh_token = req.body.rtoken
  if (refresh_token === null || refresh_token === undefined) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URL
    );

    const scopes = [
      Photos.Scopes.READ_ONLY,
      Photos.Scopes.SHARING,
      'https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.compose', 'https://www.googleapis.com/auth/gmail.send'
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      approval_prompt: 'force'
    });
    res.send(url);
  }
  else {

    var imgUrls = await getImgUrls(refresh_token);
    const players = mailInfo.players
    var template = emailTemplate(mailInfo.date, mailInfo.time, mailInfo.stadium, players, imgUrls);


    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URL,
    );

    oauth2Client.setCredentials({
      refresh_token: refresh_token
    });

    var tokens = await oauth2Client.refreshAccessToken();
    var subject = 'DITO Thông Báo ' + mailInfo.date;
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`
    var to = mailInfo.emailList.toString()
    var from = 'dito.football@gmail.com'

    var headers = [];
    headers.push('From: <' + from + '>');
    headers.push('To: ' + to);
    headers.push('Content-type: text/html;charset=iso-8859-1');
    headers.push('MIME-Version: 1.0');
    headers.push('Subject: ' + utf8Subject);
    headers.push('');
    headers.push(template);

    var email = headers.join('\r\n').trim();
    var base64EncodedEmail = Buffer.from(email).toString('base64');
    base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');

    const gmail = google.gmail('v1');
    try {
      gmail.users.messages.send({
        auth: oauth2Client,
        userId: 'me',
        resource: {
          raw: base64EncodedEmail
        }
      }, null, (err, res) => {
        console.log(err);
      })
      next();
    } catch(e) {
      console.log(e);
    }
  }

}, (req, res) => {
  res.send("Hellloooo");
});

const getImgUrls = async (refresh_token, next) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL,
  );

  oauth2Client.setCredentials({
    refresh_token: refresh_token
  });

  var tokens = await oauth2Client.refreshAccessToken();
  
  const photos = await new Photos(tokens.credentials.access_token);
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
  var shuffleImgUrls = await arrayShuffle(imgListUrls);
  var selectedImgUrls = [];
  for (let i = 0; i < 5; i++) {
    selectedImgUrls.push(shuffleImgUrls[i]);
  }
  return await selectedImgUrls;
}

/////test


module.exports = router;
