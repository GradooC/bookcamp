import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { CAMPINGS } from '../../config';
import { CampingItem } from '../camping-item';
import { SPACE } from '../../styles';

export type CampingListProps = {};

export function CampingList({}: CampingListProps) {
    return (
        <FlatList
            data={CAMPINGS}
            contentContainerStyle={styles.container}
            renderItem={({ item }) => <CampingItem item={item} />}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: SPACE['2.5'],
    },
});
