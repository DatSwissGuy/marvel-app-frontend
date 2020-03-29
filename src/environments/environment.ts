// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  marvelApiUrl: 'http://gateway.marvel.com/v1/public',

  // Credentials for the Marvel API
  apiPublicKey: 'MyPublicKey',
  apiPrivateKey: 'MyPrivateKey',
  timeStamp: 'MyTimestamp',

  // md5(Timestamp + Private Key + Public Key)
  // md5(MyTimestampMyPrivateKeyMyPublicKey)
  hash: 'MyGeneratedHash',

  apiInitialOffset: 0,
  apiResultLimit: 20,
  apiTypeaheadResultLimit: 5,

  // Credentials for a Laravel based Backend (separate repository)
  backEndApiUrl: 'http://my-own-api.test',
  authClientId: 'LaravelClientId',
  authClientSecret: 'LaravelClientSecret'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
