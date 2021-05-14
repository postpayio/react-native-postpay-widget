import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';

export type ProductWidgetProps = {
  merchantId: Number,
  locale?: 'en' | 'ar',
  widgetUrl?: String,
  amount: Number,
  currency: String,
  closeButton?: Boolean,
  numInstalments?: Number,
  widgetType: 'payment-summary' | 'info-modal' | 'product',
};

const ProductWidget = (props: ProductWidgetProps) => {
  const {
    merchantId,
    numInstalments,
    closeButton,
    currency,
    amount,
    locale,
    widgetUrl,
    widgetType,
  } = props;
  const [webViewHeight, setWebViewHeight] = useState(null);

  const onSizeUpdated = size => {
    setWebViewHeight(size.height);
  };

  const onMessage = ({nativeEvent}) => {
    const res = JSON.parse(nativeEvent.data);
    if (res.type === 'PostpayWidgetLoaded') {
      setWebViewHeight(res.height);
    }
    // console.log('xxx', nativeEvent.data);
    if (res.url) {
      // navigate('WebPage', {
      //     url: `https://cdn.postpay.io/widgets/react-native?widgetType=info-modal&merchantId=${merchantId}&locale=${locale}&widgetUrl=${widgetUrl}&amount=${amount}&currency=${currency}&closeButton=${closeButton}&num-instalments=${numInstalments}`,
      // });
    }
  };

  const getUrl = () => {
    let url = 'https://cdn.postpay.io/widgets/react-native';

    if (widgetType) {
      url += `?widgetType=${widgetType}`;
    }
    if (merchantId) {
      url += `&merchantId=${merchantId}`;
    }
    if (locale) {
      url += `&locale=${locale}`;
    }
    if (widgetUrl) {
      url += `&widgetUrl=${widgetUrl}`;
    }
    if (amount) {
      url += `&amount=${amount}`;
    }
    if (currency) {
      url += `&currency=${currency}`;
    }
    if (closeButton) {
      url += `&closeButton=${closeButton}`;
    }
    if (numInstalments) {
      url += `&num-instalments=${numInstalments}`;
    }
    // console.log(url);
    return url;
  };

  return (
    <View style={{height: webViewHeight}}>
      <WebView
        source={{
          uri: getUrl(),
        }}
        javaScriptEnabled={true}
        scrollEnabled={false}
        onMessage={onMessage}
      />
    </View>
  );
};

export default ProductWidget;

const styles = StyleSheet.create({});
