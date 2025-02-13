class ApiResponse{
    constructor(statusCode,data=null,message){
        this.statusCode=statusCode,
        this.data=data,
        this.message=message
    }
}

export default ApiResponse;