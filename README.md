# Hapsco

Datavisualisation over PWA for personnal use.

## Requirement

Node version 10.15.1

Angular CLI: 8.3.5

Angular 8.2.7

## Dev

Run local : `npm start`

## Netlify

Tool used to builds deploys and hosts this app

### Deploy

`npm build:netlify` command is used in [netlify.toml](netlify.toml) file that override netlify parameter.

It runs `ng build --prod` command to build the app for production and `netlify-lambda build src/functions` to build and serve lambda functions.

### Functions

As mentioned above, [netlify-lambda](https://github.com/netlify/netlify-lambda) helps to build and serve lambda functions.

Run `npm run serve:netlify` will start a dev server for the source folder and route requests with a .netlify/functions/ prefix, with a default port of 9000.

Environment variable are stored in Netlify project and reuse in lambda function with `process.env.VAR_NAME` format.

## Firestore

### Realtime database

A firestore realtime database is used to store devices IDs.

### Cloud Firestore

A Cloud firestore database is used to store data from the app.

## PWA

This app is generated as a PWA. Thus, end-users can add the app to home screen on theirs phone/tablets.

## Reminder

End-users can accepts push notifications to receive a push notification every day as a reminder.

A [cron job](https://cron-job.org) is launched every day to the netilfy function endpoint in order to send the push notification.

## Styles & components

I have chosen Angular Material to style and create components.

A dark theme is set-up in `styles.scss`.

Many Angular Material components have been used accross the app.

## Todo

- firestore prod mode ?
- documentation
- user login ?
- test
