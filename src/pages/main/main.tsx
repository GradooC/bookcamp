import React from 'react';

import { CampingList } from '../../components/camping-list';
import { Footer } from '../../components/footer';

export type MainProps = {};

export function Main({}: MainProps) {
    return (
        <>
            <CampingList />
            <Footer />
        </>
    );
}
