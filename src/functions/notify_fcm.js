const request = require('request');
// @TODO use https://firebase.google.com/docs/reference/rest/database/
// to get id of devices

exports.handler = function(event, context, callback) {
  let deviceIds = '';

   request({
    url: 'https://cloud-firestore-hapsco.firebaseio.com/.json',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }, function(error, response, body) {
     deviceIds = body.fmcTokens
  });

  return request({
    url: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAASF7PJjg:APA91bECtRYvxgihms660Ml8y1mX_kMIz4E_odkBj03qGM6vVhs8Rb3cJm39jka6Mtc_u-_FE6OgBQQgzaWVbZrT8bpTHoWybVSd945uXl5BacXTfICfnjr8q6p0DwLSN6yuI1q8tN1C',
    },
    body: JSON.stringify({
      notification: {
        title: 'Hapsco',
        body: 'Oublie pas!',
      },
      to: deviceIds
    })
  }, function(error, response, body) {
    if (error) {
      callback(null, {
        statusCode: 500,
        body: body,
      })
    } else {
      callback(null, {
        statusCode: response.statusCode,
        body: body,
      })
    }
  });
};
