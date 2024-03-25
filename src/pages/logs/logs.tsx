import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Log } from '../../types';
import { LogItem } from '../../components/log-item';
import { useLogList } from '../../providers/log-provider';
import { LOG_ITEM_HEIGHT } from '../../config';

export type LogsProps = {};

export function Logs({}: LogsProps) {
    const logs = useLogList();
    const flatListRef = useRef<FlatList<Log>>(null);
    const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);

    useEffect(() => {
        if (isAutoScrollEnabled) {
            flatListRef.current?.scrollToEnd({ animated: true });
        }
    });

    const handleOnEndReached = () => {
        setIsAutoScrollEnabled(true);
    };

    const handleOnTouchStart = () => {
        setIsAutoScrollEnabled(false);
    };

    return (
        <FlatList
            contentContainerStyle={styles.container}
            data={logs}
            ref={flatListRef}
            renderItem={({ item }) => <LogItem item={item} />}
            onEndReached={handleOnEndReached}
            onTouchStart={handleOnTouchStart}
            keyExtractor={({ id }) => String(id)}
            getItemLayout={(_data, index) => ({
                length: LOG_ITEM_HEIGHT,
                offset: LOG_ITEM_HEIGHT * index,
                index,
            })}
        />
    );
}

const styles = StyleSheet.create({
    container: {},
});
