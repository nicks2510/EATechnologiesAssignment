import React from 'react'
import SearchBar from './SearchBar';
import SearchHistory from './SearchHistory';

export default function Home() {
    return (
        <React.Fragment>
            <SearchBar></SearchBar>
            <SearchHistory></SearchHistory>
        </React.Fragment>
    )
}
