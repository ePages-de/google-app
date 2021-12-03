# Google App

This <ins>**public**</ins> repository hosts the app home page for the ePages integration with Google Smart Shopping.

## Features

### Explains the Smart Shopping integration

For the OAuth app verification the app homepage needs to fulfil the following requirements:

- Explain the app features
- Explain how the app uses the user's data
- Link to the privacy policy
- Use the ePages branding

See [support.google.com](https://support.google.com/cloud/answer/9110914#verification-requirements&zippy=%2Cwhat-are-the-requirements-for-verification) for details.

### Hosts legal documents

In the OAuth consent screen configuration we need to provide links to the app's privacy policy and the terms of use.

- https://google-app.epages.com/#/privacy-notice
- https://google-app.epages.com/#/terms-of-use

### Proxies the OAuth flow

It is important to Google that the user can trust the redirect URI where the authorization server redirects the browser to after the API consent. So, the redirect URL needs to be on the same domain like from where they started. Since the authorized redirect URIs need to be allow-listed, this cannot under the shop domain. So, we have the app homepage as intermediary step in the OAuth flow.

![OAuth flow](./docs/oauth-flow.png)

1. Instead of contacting the autorization server directly from the shop administration, we are sending the parameters which we would normally send there to the app homepage. The app homepage then provides a "Sign in with Google" button using those parameters (see [screenshot](./docs/oauth-start.png)).
2. After clicking on that button, you will be send to Google's authorization server.
3. Once the API consent has been given, the authorization server will redirect you back to the app homepage (see [screenshot](./docs/oauth-end.png)).
4. After a countdown of three seconds, there will be an automatic redirect to a redirect microservice.
5. That microservice will eventually dispatch the request to the ePages installation where the tokens get generated. The dispatching is happening with the help of the `scope` request parameter.

### Localizes content

Our Google app supports German, English, Spanish, and Dutch.
We determine which language to use based on the user's browser language.

### Prepares token generation

As a bonus feature, you can use the app homepage to help you manually generate access tokens. If you add only the `?client_id=xxxx` parameter to the homepage, the "Sign in with Google" button will be rendered with the default parameters and scopes required for the Google Smart Shopping app. Instead of redirecting you back to a shop, the app homepage will render a cURL snippet which you can run in your terminal for manual token generation.

```
# Example URL
https://google-app.epages.com?client_id=111111111111-a1a1aaa1aa1a11a11a1aa1aaa1a1aa1a.apps.googleusercontent.com
```

## Development

### Dependencies

To work on the Google app homepage, you need to have the current [LTS version of NodeJS](https://nodejs.org/en/download/) installed on your laptop.

### Start app

To start the development server, clone the repository, install the dependencies, and then call the `start` task.

```shell
git clone git@github.com:ePages-de/google-app.git
# https://github.com/ePages-de/google-app.git
cd google-app
npm install
npm start
```

Then, the app will be accessible at http://localhost:3000 .

### Localization

The app homepage uses [i18next](https://www.i18next.com/) for the internationalization. The translation keys are defined in [`src/locales`](./src/locales). They can be used in JSX code like this:

```jsx
import i18n from 'i18next';
```

```jsx
{ i18n.t('views.homepage.navbar.concept.label') }
```

### Resource links

In JavaScript code islands in JSX, you can use `process.env.PUBLIC_URL` to reference the base URL of the app homepage.

```jsx
<img src={process.env.PUBLIC_URL + '/img/Epages_Logo.png'} style={{ maxWidth: '200px' }} />
```

### Linting

Run the `fix` task for cleaning up the import sort order etc.

```
npm run fix
```

Run the `lint` task for finding code style issues before doing a pull request.

```
npm run lint
```

## Testing

### Run unit tests

This project uses [Jest](https://jestjs.io/) and the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for unit testing. You can run the tests by calling the `test` task.

```bash
npm run test
```

### OAuth start

The Google login button only appears on the homepage if the OAuth request parameters are provided. For testing, you can call the app homepage with the client ID of our sandbox OAuth app and example values for the other parameters:

http://localhost:3000?response_type=code&redirect_uri=https://shops.example-reseller.epages.systems&client_id=746318976034-e9r0hta4db0d21e56d7eh1nhi8n4kj4d.apps.googleusercontent.com&access_type=offline&scope=https://www.googleapis.com/auth/content%20https://www.googleapis.com/auth/siteverification%20https://www.googleapis.com/auth/adwords&prompt=consent&state=https%253A%252F%252Fmy-great-handicraft.com

If you provide only the `client_id` parameter, the default values for the Google Smart Shopping integration will be used:

http://localhost:3000?client_id=746318976034-e9r0hta4db0d21e56d7eh1nhi8n4kj4d.apps.googleusercontent.com

### OAuth end

The OAuth end page is rendered if the homepage was called with the OAuth response parameters.

For testing the redirection page, you can open this URL in a browser:

http://localhost:3000?state=eyJzeXN0ZW1SZWRpcmVjdFVyaSI6Imh0dHBzOi8vc2hvcHMucmVzZWxsZXIuZXBhZ2VzLnN5c3RlbXMiLCJvcmlnaW5hbFN0YXRlIjoiaHR0cHMlM0ElMkYlMkZzaG9wLmV4YW1wbGUuY29tIn0%3D&code=xxxxx&scope=email%20https://www.googleapis.com/auth/content%20https://www.googleapis.com/auth/siteverification%20https://www.googleapis.com/auth/adwords%20openid%20https://www.googleapis.com/auth/userinfo.email&authuser=1&prompt=consent

For testing the cURL snippet generation, you can call the app homepage with this example request:

http://localhost:3000/?code=xxxx&scope=https://www.googleapis.com/auth/content%20https://www.googleapis.com/auth/siteverification%20https://www.googleapis.com/auth/adwords

## Deployment

### Publish to GitHub Pages

Every commit in the repository triggeres the "Build & deploy" action defined in [`gh-pages.yaml`](.github/workflows/gh-pages.yaml).

If you want to trigger the deployment to GitHub Pages manually, you could do so by calling the `deploy` task.

```
npm run deploy
```

### Compile release files

If you want to deploy the homepage somewhere else, you can compile the release files with the `build` task and then copy the `/build` directory there.

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

## Copyright

© ePages GmbH 2021. All rights reserved.
