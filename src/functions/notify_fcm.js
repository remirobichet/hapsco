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
        // env stored in netlify
        'Authorization': 'key=' + process.env.FCM_AUTH,
      },
      data: JSON.stringify({
        notification: {
          title: 'Hapsco',
          body: 'Oublie pas!',
          icon: '/assets/manifest-icons/icon-96x96.png',
          click_action: 'http://hapsco.remirobichet.fr'
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
