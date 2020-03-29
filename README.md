# MarvelApp

This is an educational Angular SPA consuming 2 RESTful APIs: The official Marvel API and a custom made API (Laravel).

This project was originally generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.9 and has been updated / upgraded to Angular version 9 inclunding all dependencies (e.g. NgRx).

# Installation

## Marvel API
First of all you'll need your own API credentials from the official Marvel API (https://developer.marvel.com). Add those credentials to the `environment.ts` file (src/environments/environment.ts):

`typescript
// Credentials for the Marvel API
apiPublicKey: 'MyPublicKey',
apiPrivateKey: 'MyPrivateKey',
timeStamp: 'MyTimestamp',

// md5(Timestamp + Private Key + Public Key)
// md5(MyTimestampMyPrivateKeyMyPublicKey)
hash: 'MyGeneratedHash',
 `

`timeStamp` is just any random string (refer to the documentation) and the hash is generated via MD5 algorithm.

## Laravel

# TODO's

Finish this readme :)
