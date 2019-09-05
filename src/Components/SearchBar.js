import React, { useState } from 'react';
import WebApi from "../WebApi/WebApi";
import "../App.css";
import SearchHistory from './SearchHistory';

function SearchBar(props) {
    const [employeSearchValue, setemployeSearchValue] = useState('');
    const [value, setValue] = React.useState(JSON.parse(localStorage.getItem('employeeHistory')) || {});

    React.useEffect(() => {
        setValue(JSON.parse(localStorage.getItem('employeeHistory')));
    }, []);

    async function fetchData() {
        try {
            var employeeHisObj = JSON.parse(localStorage.getItem("employeeHistory"))
            if (!employeeHisObj) {
                employeeHisObj = { employeeHistory: '' };
            }
            localStorage.setItem("employeeHistory", JSON.stringify({ 'employeeHistory': [employeSearchValue, ...employeeHisObj.employeeHistory] }));
            let response = await WebApi.checkEmployees();
            if (response.status === 200) {
                let employeeJson = await response.json();
                if (employeeJson.indexOf(employeSearchValue) > -1) {
                    let employeedata = [];
                    employeedata = [...employeedata, employeSearchValue];
                    getEmployeeSubs(employeedata, 0);

                }
                else {
                    alert("No record found");
                    setValue(JSON.parse(localStorage.getItem('employeeHistory')));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getEmployeeSubs(employeedata, i) {
        if (employeedata[i]) {
            let response = await WebApi.getEmployeeData(employeedata[i]);
            if (response.status === 200) {
                let employeeJson = await response.json();
                if (employeeJson.length === 1) {
                    getEmployeeSubs(employeedata, i + 1)
                }
                if (employeeJson.length > 1) {
                    let nonDirectSub = employeeJson[1]["direct-subordinates"];
                    employeedata = [...new Set([...employeedata, ...nonDirectSub])]
                    getEmployeeSubs(employeedata, i + 1)
                }
            }
        }
        else {
            employeedata.shift();
            props.data.history.push({ pathname: `/employeeOverview/${employeSearchValue}`, state: { detail: employeedata, name: employeSearchValue } });

        }
    }

    return (
        <div>
            <input className="input" type="text" placeholder="Search Employee" onChange={(e) => setemployeSearchValue(e.target.value)} value={employeSearchValue} />
            <span >
                <button className="button" type="button" onClick={fetchData}>Search</button>
            </span>
            <SearchHistory data={value}></SearchHistory>

        </div>
    )
}

export default SearchBar
