import React from 'react'
import SearchBar from './SearchBar';

export default function Home(props) {
    return (
        <React.Fragment>
            <h1 className="centre-align">Employee Explorer</h1>
            <SearchBar data={props}></SearchBar>
        </React.Fragment>
    )
}
