import React, { useState } from 'react';
import WebApi from "../WebApi/WebApi";


function SearchBar(e) {
    const [employeSearchValue, setemployeSearchValue] = useState('');
    const [empDataObj, setEmpDataObj] = useState({});

    async function fetchData() {
        try {
            let response = await WebApi.checkEmployees();
            if (response.status === 200) {
                let employeeJson = await response.json(); 
                if (employeeJson.indexOf(employeSearchValue) > -1) {
                    let employeedata=[];
                    employeedata=[...employeedata,employeSearchValue]
                    getEmployeeSubs(employeedata, 0,{});
                }
                else {
                    alert("No record found");
                }
            }
        } catch (error) {
            console.log(error);
        }

        async function getEmployeeSubs(employeedata, i,dataObj) {
            if(employeedata[i]){
                let response = await WebApi.getEmployeeData(employeedata[i]);
                if (response.status === 200) {
                    let employeeJson = await response.json();
                    console.log(employeeJson);
                    if (employeeJson.length === 1) {
                        dataObj={...dataObj,[employeedata[i]]:''}
                        getEmployeeSubs(employeedata, i + 1,dataObj)
                    }
                    if (employeeJson.length > 1) {
                        let nonDirectSub = employeeJson[1]["direct-subordinates"];
                        dataObj={...dataObj,[employeedata[i]]:nonDirectSub};
                        employeedata = [...new Set([...employeedata, ...nonDirectSub])]
                        getEmployeeSubs(employeedata, i + 1,dataObj)
                    }
                }
            }
            else{
                console.log(dataObj)
                setEmpDataObj(dataObj);
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
