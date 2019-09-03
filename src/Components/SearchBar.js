import React, { useState } from 'react';
import WebApi from "../WebApi/WebApi";

function SearchBar(props) {
    const [employeSearchValue, setemployeSearchValue] = useState('');

    async function fetchData() {
        try {
            let response = await WebApi.checkEmployees();
            if (response.status === 200) {
                let employeeJson = await response.json();
                if (employeeJson.indexOf(employeSearchValue) > -1) {
                    let employeedata = [];
                    employeedata = [...employeedata, employeSearchValue]
                    getEmployeeSubs(employeedata, 0);
                }
                else {
                    alert("No record found");
                }
            }
        } catch (error) {
            console.log(error);
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
    }

    return (
        <div>
            <input type="text" placeholder="Search Employee" onChange={(e) => setemployeSearchValue(e.target.value)} value={employeSearchValue} />
            <span >
                <button type="button" onClick={fetchData}>Search</button>
            </span>
        </div>
    )
}

export default SearchBar
