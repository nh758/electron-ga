# electron-ga-uuid
[Google Analytics](https://developers.google.com/analytics/devguides/collection/protocol/v1/) client for [Electron](https://electronjs.org/) applications with some useful built in features.

Forked from [electron-ga](https://github.com/jaystack/electron-ga). Changed to use a locally stored unique id, which can be reset if requested.

## Features

- **Unique [Client ID](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#cid) for every install**
- Cache for **offline usage**
- **Promise-based** API
- It sends the following **params by default**:
  - [Protocol Version](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#v)
  - [Client ID](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#cid): stores a unique id to track the same client each time they use the app.
  - [Application Name](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#an)
  - [Application Version](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#av)
  - [User Language](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ul): determined by user agent
  - [User Agent](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ul): prepared to make interpretable for Analytics to parse the Platform info
  - [Screen Resolution](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#sr)
  - [Viewport Size](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#vp)
- Mechanism to reset the Client Id if the user requests

## Easy to start using

First create a Web Property in Google Analytics and add a Mobile App [View](https://support.google.com/analytics/answer/2649553). The Mobile App View is better suited to display analytics from [Electron](https://electronjs.org/), including application version.

[electron-ga-uuid]() works only in the [renderer process](https://electronjs.org/docs/tutorial/quick-start#renderer-process).

```js
import Analytics from 'electron-ga-uuid';

const analytics = new Analytics('UA-XXXXXXXX-X');
```

Then:

```js
await analytics.send('screenview', { cd: 'User List' });
await analytics.send('event', { ec: 'Scroll', ea: 'scrollto', el: 'row', ev: 123 });
```

[electron-ga-uuid]() uses [Google Analytics Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/). You can add custom [parameters](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters) or override any of them.

## API Reference

### **`constructor`**`(trackId[, initParams])`

The `trackId` is a string and its format is: `UA-XXXXXXXX-X`.

The `initParams` is an object and its optional properties are:

- **protocolVersion**
- **trackId**
- **clientId**
- **userId** - undefined by default
- **appName**
- **appVersion**
- **language**
- **userAgent**
- **viewport**
- **screenResolution**

You can set any of them with a constant string value or a getter function, that returns a string value:

```js
const analytics = new Analytics('UA-XXXXXXXX-X', {
  userId: '123456',
  language: () => store.getState().language
});
```

### **`send`**`(hitType[, additionalParams]) -> Promise`

The `hitType` is a string. You can find here the [available values](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#t).

The `additionalParams` is an object with any properties, which are acceptable by the [Google Analytics Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters).

### **`resetClientId`**`()`
Reset the Client Id if the user requests
```js
import { resetClientId } from 'electron-ga-uuid';
resetClientId();
```

---

## License

[MIT](https://spdx.org/licenses/MIT)

## Developed by

[JayStack](http://jaystack.com/)
