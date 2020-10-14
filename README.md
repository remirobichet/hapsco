# hapsco

> :chart_with_upwards_trend: Data Visualization over PWA

## Requirement :hammer_and_wrench:

Node version 10.15.1

Angular CLI: 8.3.5

Angular 8.2.7

## Dev :keyboard:

Run local : `npm start`

## Netlify :cloud: :building_construction:

Tool used to builds deploys and hosts this app

### Deploy :rocket:

`npm build:netlify` command is used in [netlify.toml](netlify.toml) file that override netlify parameter.

It runs `ng build --prod` command to build the app for production and `netlify-lambda build src/functions` to build and serve lambda functions.

### Functions :loop:

As mentioned above, [netlify-lambda](https://github.com/netlify/netlify-lambda) helps to build and serve lambda functions.

Run `npm run serve:netlify` will start a dev server for the source folder and route requests with a .netlify/functions/ prefix, with a default port of 9000.

Environment variable are stored in Netlify project and reuse in lambda function with `process.env.VAR_NAME` format.

## Firestore :card_file_box:

### Realtime database :card_file_box: :hourglass:

A firestore realtime database is used to store devices IDs.

### Cloud Firestore :card_file_box: :cloud:

A Cloud firestore database is used to store data from the app.

## PWA :iphone:

This app is generated as a PWA. Thus, end-users can add the app to home screen on theirs phone/tablets.

## Reminder :alarm_clock:

End-users can accepts push notifications to receive a push notification every day as a reminder.

A [cron job](https://ifttt.com/) is launched every day to the netilfy function endpoint in order to send the push notification.

## Styles & components :lipstick:

I have chosen Angular Material to style and create components.

A dark theme is set-up in `styles.scss`.

Many Angular Material components have been used across the app.

## Todo :pencil:

- Implement test :white_check_mark:
- User login w/ Firestore auth :question: :frowning_man:
- Firestore production mode :question: :wrench:
