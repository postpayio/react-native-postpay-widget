import React, { useState } from 'react';
import { Linking, View, StyleProp, ViewStyle } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';

export type WidgetBaseProps = {
    merchantId: Number,
    locale?: 'en' | 'ar',
    widgetUrl?: String,
    amount: Number,
    currency: String,
    closeButton?: Boolean,
    numInstalments?: Number,
    widgetType: 'payment-summary' | 'info-modal' | 'product',
    onPressLink?: void,
    requestCloseModal?: void,
    style?: StyleProp<ViewStyle>,
};

const WidgetBase = (props: WidgetBaseProps) => {
    const {
        merchantId,
        numInstalments,
        closeButton,
        currency,
        amount,
        locale,
        widgetUrl,
        widgetType,
        onPressLink,
        requestCloseModal,
        style,
    } = props;
    const [webViewHeight, setWebViewHeight] = useState(null);

    const onMessage = ({ nativeEvent }) => {
        const res = JSON.parse(nativeEvent.data);
        if (res.type === 'PostpayWidgetLoaded') {
            setWebViewHeight(res.height);
        }
        if (res.type === 'PostpayInfoModalClose') {
            requestCloseModal?.();
        }
        if (res.url) {
            if (!onPressLink) {
                Linking.openURL(res.url);
                return;
            }
            onPressLink?.(res.url);
        }
    };

    const getUrl = () => {
        let url = `https://cdn.postpay.io/widgets/react-native`;

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
        return url;
    };

    return (
        <View style={[{ height: webViewHeight }, style]}>
            <AutoHeightWebView
                viewportContent={'width=device-width, user-scalable=no'}
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

export default WidgetBase;
