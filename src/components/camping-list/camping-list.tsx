import React, { useState } from 'react';
import { Button, FlatList, StyleSheet } from 'react-native';
import { CAMPINGS } from '../../config';
import { CampingItem } from '../camping-item';
import { SPACE } from '../../styles';

export type CampingListProps = {
    isRunning: boolean;
};

export function CampingList({ isRunning }: CampingListProps) {
    return (
        <FlatList
            data={CAMPINGS}
            contentContainerStyle={styles.container}
            renderItem={({ item }) => (
                <CampingItem item={item} isRunning={isRunning} />
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: SPACE['2.5'],
        paddingHorizontal: SPACE['2.5'],
    },
});
