import React from 'react'

function SearchHistory(props) {
    return (
        <div className="search-list">
            <ul>
                {
                    props.data && props.data.employeeHistory && props.data.employeeHistory.map((employee) => <li key={Math.random()}>{employee}</li>)
                }
            </ul>
        </div>
    )
}

export default SearchHistory
