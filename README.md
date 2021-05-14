
[![npm version](https://badge.fury.io/js/@postpay/react-native-widget.svg)](https://badge.fury.io/js/@postpay/react-native-widget) ![](https://img.shields.io/github/issues/minhchienwikipedia/@postpay/react-native-widget.svg) ![](https://img.shields.io/github/stars/minhchienwikipedia/@postpay/react-native-widget.svg) ![](https://img.shields.io/github/license/minhchienwikipedia/@postpay/react-native-widget.svg) [![npm](https://img.shields.io/npm/dm/@postpay/react-native-widget.svg)](https://npmjs.com/package/@postpay/react-native-widget)

[![NPM](https://nodei.co/npm/@postpay/react-native-widget.png?downloads=true&stars=true)](https://nodei.co/npm/@postpay/react-native-widget/)

## Descriptions

Postpay SDK for React Native, this library supports both iOS & Android

## Prerequisites

This library uses [react-native-webview](https://github.com/react-native-webview/react-native-webview)
to render webview. Therefore this library needs to be installed **AND** linked into your project to work.

Other than the above dependency this library uses pure javascript and supports both iOS and Android

## Getting started

`$ npm install @postpay/react-native-widget --save`

- OR

`$ yarn add @postpay/react-native-widget`

## Usage
```javascript
import { PostpayWidget } from '@postpay/react-native-widget';

<PostpayWidget
    merchantId="id_c56705f1a9304e8c8a16e1da98ec8734"
    widgetType='product'
    amount="20050"
    currency="AED"
    locale="en"
    widgetUrl="https://widgets-dev.postpay.io"
    numInstalments={2}
/>
```

#### Props

```javascript
type PostpayWidgetProps = {
    merchantId: Number,
    widgetType: 'payment-summary' | 'product',
    locale?: 'en' | 'ar',
    widgetUrl?: String,
    amount: Number,
    currency: String,
    closeButton?: Boolean,
    numInstalments?: Number,
    onPressLink?: void,
    requestCloseModal?: void,
    style?: StyleProp<ViewStyle>,
};
```
---

## License

This module is [MIT licensed](./LICENSE)

---