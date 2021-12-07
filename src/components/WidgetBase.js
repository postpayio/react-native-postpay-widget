import React, { useRef, useState } from 'react';
import { Linking, View, StyleProp, ViewStyle, Dimensions, Platform } from 'react-native';
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

const deviceHeight = Dimensions.get('window').height;

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
    const currentHeight = useRef();
    const webViewRef = useRef();

    const onMessage = ({ nativeEvent }) => {
        const res = JSON.parse(nativeEvent.data);
        const isAndroid = Platform.OS === 'android';
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
        if (
            (res.type === 'PostpayWidgetLoaded' &&
                widgetType === 'payment-summary' &&
                (numInstalments < 2 || !numInstalments)) ||
            isAndroid ||
            widgetType === 'info-modal'
        ) {
            if (res.height === currentHeight.current || res.height < 0) {
                return;
            }
            setWebViewHeight(res.height);
            currentHeight.current = res.height;
        }
        if (res.height && res.width && currentHeight.current > deviceHeight) {
            if (
                res.height === currentHeight.current ||
                widgetType === 'info-modal' ||
                res.height < 0
            ) {
                return;
            }
            setWebViewHeight(res.height);
            currentHeight.current = res.height;
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

    const onShouldStartLoadWithRequest = (request) => {
        if (request?.url?.indexOf?.('https://cdn.postpay.io/') < 0) {
            Linking.openURL(request.url);
            return false;
        }
        return true;
    };

    const MAX_HEIGHT = deviceHeight - 100;
    const isModal = widgetType === 'info-modal';

    return (
        <View 
            renderToHardwareTextureAndroid={true} 
            style={[{ height: webViewHeight > MAX_HEIGHT ? MAX_HEIGHT : webViewHeight }, style]}>
            <AutoHeightWebView
                ref={webViewRef}
                viewportContent={'width=device-width, user-scalable=no'}
                source={{
                    uri: getUrl(),
                }}
                style={widgetType !== 'info-modal' && { width: style?.width }}
                javaScriptEnabled={true}
                scrollEnabled={isModal}
                onMessage={onMessage}
                bounces={false}
                onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            />
        </View>
    );
};

export default WidgetBase;
