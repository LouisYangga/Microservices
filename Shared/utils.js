const axios = require('axios')
const { response } = require('express')
const utils = {

    validateUser: async(email) =>{
        const body = {email : email}
        axios.post('http://localhost:3000/user/find', body)
        .then((response)=>{return response.data}).catch((error)=>{
            console.error('User Not Found')
        })
    }

}
module.exports = utils