const axios = require('axios')
const utils = {

    validateUser: async (email) => {
        const body = { email: email };
        try {
            const response = await axios.post('http://user_service:3000/user/find', body);
            return response.data
        } catch (error) {
            throw new Error(error); // You might want to rethrow the error for handling it elsewhere
        }
    },
    setUserAdmittance: async(email,status)=>{
        const body = { admittance: status, email: email };
        try {
            const response = await axios.put('http://user_service:3000/user/admit', body);
            // Check if the status code is 200
            if (response.status === 200) {
                console.log('Update Admittance Request was successful.');
                return true; // You can return a boolean or any other value to indicate success
            } else {
                console.log('Update Admittance Request was not successful. Status code:', response.status);
                return false; // You can return a boolean or any other value to indicate failure
            }
        } catch (error) {
            console.error('An error occurred:', error);
            return false; // Return false to indicate failure
        }
    },
    removeSubject: async( email)=>{
        const body = {email:email}
        try {
            const response = await axios.post('http://user_service:3000/user/removeSubject',body)
            return response.data
        } catch (error) {
            throw new Error('Unable to remove subject')
        }
    }


}
module.exports = utils