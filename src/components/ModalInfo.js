import React from 'react';
import { StyleSheet, View } from 'react-native';
import WidgetBase, { WidgetBaseProps } from './WidgetBase';

const ModalInfo = (props: WidgetBaseProps) => {
    return (
        <View style={styles.content}>
            <WidgetBase {...props} widgetType="info-modal" />
        </View>
    );
};

export default ModalInfo;

const styles = StyleSheet.create({
    content: { borderRadius: 12, overflow: 'hidden' },
});
