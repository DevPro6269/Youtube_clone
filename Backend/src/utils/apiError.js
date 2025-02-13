class ApiError extends Error{
    constructor(statusCode,message){
         super()
        this.message=message,
        this.statusCode=statusCode
    }
}
export default ApiError;