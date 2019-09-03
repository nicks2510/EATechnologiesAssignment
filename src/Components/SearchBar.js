import React,{useState} from 'react';
import WebApi from "../WebApi/WebApi";


function SearchBar() {
    const [employeSearchValue, setemployeSearchValue] = useState('');
    async function fetchData(employeSearchValue){
    try {
        let response = await WebApi.checkEmployees();
    if (response.status == 200) {
        let employeeJson = await response.json(); // (3)
        if(employeeJson.indexOf(employeSearchValue)>-1){
            console.log(1);
        };
      }
    } catch (error) {
        
    }
    

}
    
    return (
        <div>
            <input type="text" placeholder="Search Employee" onChange={(e)=>setemployeSearchValue(e.target.value)} value={employeSearchValue}/>
            <span >
                <button type="button" onClick={fetchData}>Search</button>
            </span>
        </div>
    )
}

export default SearchBar
