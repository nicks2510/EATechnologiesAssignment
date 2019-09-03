import React from 'react'
import SearchBar from './SearchBar';
import SearchHistory from './SearchHistory';

export default function Home(props) {
    return (
        <React.Fragment>
            <h1 className="centre-align">Employee Explorer</h1>
            <SearchBar data={props}></SearchBar>
            <SearchHistory></SearchHistory>
        </React.Fragment>
    )
}
