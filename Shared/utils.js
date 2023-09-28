const axios = require('axios')
const { response } = require('express')
const utils = {

    validateUser: async(email) =>{
        const body = {email : email}
        axios.post('http://localhost:3000/api/find', body)
        .then((response)=>{console.log(response.data)}).catch((error)=>{
            console.error('User Not Found')
        })
    }

}
module.exports = utils