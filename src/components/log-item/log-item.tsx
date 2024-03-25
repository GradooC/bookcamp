import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLOR } from '../../styles';
import { Log } from '../../types';
import { ErrorMessage } from '../../constants';
import { LOG_ITEM_HEIGHT } from '../../config';

export type LogItemProps = {
    item: Log;
};

function LogItemRaw({ item }: LogItemProps) {
    const { time, request, response } = item;
    let color = COLOR.SLATE[300];

    if (response.isSuccessful) {
        color = COLOR.GREEN[400];
    }

    if (response.errorMessage === ErrorMessage.OCCUPIED) {
        color = COLOR.RED[400];
    }

    return (
        <View style={styles.container}>
            <Text style={{ color }}>{time}</Text>
            <Text style={{ color }}>{JSON.stringify(request)}</Text>
            <Text style={{ color }}>{JSON.stringify(response)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: LOG_ITEM_HEIGHT,
    },
});

export const LogItem = React.memo(LogItemRaw);
