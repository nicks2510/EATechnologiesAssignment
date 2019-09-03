import React from 'react'
import SearchBar from './SearchBar';
import SearchHistory from './SearchHistory';

export default function Home(props) {
    return (
        <React.Fragment>
            <SearchBar data={props}></SearchBar>
            <SearchHistory></SearchHistory>
        </React.Fragment>
    )
}
