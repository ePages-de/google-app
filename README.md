# Google App

This repository hosts the app home page for the ePages integration
for Google Smart Shopping.

## Requirements

For the OAuth app verification we need to fulfil the following requirements:

- Explain the app features
- Explain how the app uses the user's data
- Link to the privacy policy
- Use the ePages branding

## Development

### Start app

```
npm ci
npm start
```

Now, the app will be accessible on http://localhost:3000 .

### Show the Google login button

The Google login button only appears on the page if the OAuth request parameters are provided. For testing, you can call the app homepage with the client ID of our sandbox OAuth app:

http://localhost:3000?client_id=746318976034-e9r0hta4db0d21e56d7eh1nhi8n4kj4d.apps.googleusercontent.com


### Localization

```jsx
{ i18n.t('views.homepage.navbar.concept.label') }
```

## Deployment

### Render release files

```
$ npm ci
$ npm run build
$ ls -l build
-rw-rw-r-- 1 jdoe jdoe 1109 Nov 12 17:55 asset-manifest.json
-rw-rw-r-- 1 jdoe jdoe 3870 Nov 12 17:55 favicon.ico
drwxrwxr-x 3 jdoe jdoe 4096 Nov 12 17:55 img
-rw-rw-r-- 1 jdoe jdoe 2249 Nov 12 17:55 index.html
drwxrwxr-x 2 jdoe jdoe 4096 Nov 12 17:55 legal-content
-rw-rw-r-- 1 jdoe jdoe   67 Nov 12 17:55 robots.txt
drwxrwxr-x 5 jdoe jdoe 4096 Nov 12 17:55 static
```
 
### Publish to GitHub pages

```
npm run deploy
```

## References

- https://stackoverflow.com/questions/59793437/example-of-an-oauth-homepage-for-google
- https://support.google.com/cloud/answer/9110914?hl=en

