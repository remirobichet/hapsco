const axios = require('axios')

exports.handler = function(event, context, callback) {

  let deviceIds = '';

  // Proxy params for dev from company
  let httpsProxyAgent = require('https-proxy-agent');
  let agent = new httpsProxyAgent('http://fr-proxy.groupinfra.com:3128');
  let config = {
    httpsAgent: agent
  };

  axios.get('https://cloud-firestore-hapsco.firebaseio.com/fcmTokens.json?format=export')
  .then((res) => {
    deviceIds = Object.values(res.data);
    console.log(deviceIds);
    return axios({
      url: 'https://fcm.googleapis.com/fcm/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAASF7PJjg:APA91bECtRYvxgihms660Ml8y1mX_kMIz4E_odkBj03qGM6vVhs8Rb3cJm39jka6Mtc_u-_FE6OgBQQgzaWVbZrT8bpTHoWybVSd945uXl5BacXTfICfnjr8q6p0DwLSN6yuI1q8tN1C',
      },
      data: JSON.stringify({
        notification: {
          title: 'Hapsco',
          body: 'Oublie pas!',
        },
        registration_ids: deviceIds
      })
    })
  })
  .then((res) => {
    console.log('Success :');
    console.log(res);
    return callback(null, {
        statusCode: 200,
        body: res.data,
      }
    )
  })
  .catch((error) => {
    console.log('Error: ');
    console.log(error);
    return callback(error)
  })
};
