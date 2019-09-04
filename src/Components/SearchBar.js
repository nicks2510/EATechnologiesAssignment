import React, { useState } from 'react';
import WebApi from "../WebApi/WebApi";
import "../App.css";

function SearchBar(props) {
    const [employeSearchValue, setemployeSearchValue] = useState('');
    const [value, setValue] = React.useState(localStorage.getItem('employeeHistory') || '');
    
    
    // console.log(employeeHistory);
    // React.useEffect(() => {
    //     setValue(localStorage.getItem('employeeHistory'));
    //   }, [value]);

      
    async function fetchData() {
        try {
            // var employeeHistory=localStorage.getItem('employeeHistory');
            
            //employeeHistory.push(employeSearchValue);
            var employeeHistory={employeeHistory:''};
            if(employeeHistory)
            employeeHistory=JSON.parse(localStorage.getItem("employeeHistory"))
            localStorage.setItem("employeeHistory",JSON.stringify({employeeHistory: [...employeeHistory, employeSearchValue]}) );
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
    console.log(value);
    return (
        <div>
            <input className="input" type="text" placeholder="Search Employee" onChange={(e) => setemployeSearchValue(e.target.value)} value={employeSearchValue} />
            <span >
                <button className="button" type="button" onClick={fetchData}>Search</button>
            </span>
            
            
        </div>
    )
}

export default SearchBar
