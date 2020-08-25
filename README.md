# MarvelApp

This is an educational Angular SPA consuming 2 RESTful APIs: The official Marvel API and a custom made API (Laravel).

This project was originally generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.9 and has been updated / upgraded to Angular version 9 including all dependencies (e.g. NgRx).

This Angular App was created during my internship at [Liip](https://www.liip.ch)

---
# Screenshots
![Marvel-App](doc/Marvel-App.png)
*The home screen*

---

![Marvel-Character-1](doc/Marvel-App-Character-2.png)
*Character detail page while logged in, no ratings and not favorized.*

---

![Marvel-Character-2](doc/Marvel-App-Character.png)
*Character detail page, with ratings and favorized.*

---
# How to run the app

## Marvel API
First of all you'll need your own API credentials from the official Marvel API (https://developer.marvel.com). Add those credentials to the `environment.ts` file (src/environments/environment.ts):

```typescript
// Credentials for the Marvel API
apiPublicKey: 'MyPublicKey',
apiPrivateKey: 'MyPrivateKey',
timeStamp: 'MyTimestamp',

// md5(Timestamp + Private Key + Public Key)
// md5(MyTimestampMyPrivateKeyMyPublicKey)
hash: 'MyGeneratedHash',
 ```

`timeStamp` is just any random string (refer to the documentation) and the hash is generated via MD5 algorithm.

Once you got everything set up, just run `ng serve` in the repo root folder.

## Backend (Optional)
For further features, like a (character) visitor counter, a option to "like" / "favorize" characters, a user profile and so on, a backend was added (REST). Currently the following backend options are available or work in progress:

- **Laravel** (+ MySQL) in this [repository](https://github.com/DatSwissGuy/marvel-app-backend).
- **.NET core** (+ Any Database), currently work in progress.

# TODO's
- Finish this readme :)
- Clean up code e.g. get rid of some anti-patterns
- Add docker support to build and serve the app
- Add AuthGuard for the user profile page
- Add server side rendering and also "dockerize" it