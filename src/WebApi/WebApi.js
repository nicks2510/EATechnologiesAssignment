
const url='http://api.additivasia.io/api/v1/assignment/';

 let WebApi={
    checkEmployees(){
        return fetch(`${url}employees`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
    }
}

    // getDataFromApi = async (employeeName) => {
    //     let api = `${url}employees/${employeeName}`;
    //     const res = await fetch(api);
    //     const tempResult = await res.json()
    //     const result = await tempResult;
    //     return result;
    // },
    
    // checkEmployees= async(employeeName) =>{
    //     let api= `${url}employees/`;
    //     const res = await fetch(api);
    //     return await res.json();
    // },
    
    // getEmployeeData = (data, i) => {
    
    //     if (!_.isUndefined(data[i])) {
    //         this.getDataFromApi(data[i]).then(res => {
    //             if (_.isEmpty(res)) {
    //                 alert("No Result Were Found")
    //                 this.setState(prevState => {
    //                     return {
    //                         isLoading: !prevState.isLoading,
    //                     }
    //                 })
    
    //             } else {
    //                 if (res.length === 1) {
    
    //                     this.getDataRecusrsively(data, i + 1)
    //                 }
    //                 if (res.length > 1) {
    //                     let nonDirectSub = res[1]["direct-subordinates"];
    //                     data = [...new Set([...data, ...nonDirectSub])]
    
    //                     this.getDataRecusrsively(data, i + 1)
    
    //                 }
    //             }
    //         })
    //     } else {
    //         this.inputRef.current.value = ""
    //         this.updateState(data)
    //     }
    
    // }

    export default WebApi;

