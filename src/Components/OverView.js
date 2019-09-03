import React from 'react'

export default function OverView(props) {
    return (
        <div className="centre-align">
            <h1>Employee Overview</h1>
            <p>Subordinates of employee {props.location.state.name}</p>
            <ul>
                {props.location.state.detail && props.location.state.detail.length===0? (<li>No Subordinates found</li>):
                    props.location.state.detail.map((employee)=><li key={Symbol(employee).toString()}>{employee}</li>)}
            </ul>

        </div>
    )
}
