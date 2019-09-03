
const url='http://api.additivasia.io/api/v1/assignment/';

 let WebApi={
    checkEmployees(){
        return fetch(`${url}employees`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
    },
    getEmployeeData(employeeName){
        return fetch(`${url}employees/${employeeName}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
    }
}

export default WebApi;

