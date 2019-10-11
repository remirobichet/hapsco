const request = require('request');

exports.handler = function(event, context, callback) {

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
      to: 'dzFHqs3DkvM:APA91bHA-mUD3SO2ZOclUiqFMHZ0SPfW8A4Hca7pVuQTpbXMtjuvt2CwGceswdeFYKiI4CZjiQIfho18boZcPb2z0240I04BretruS9JQWtoEwFUvBSy4vOx-d_TCBs8dU8x6EIKAFGt'
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
