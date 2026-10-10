const Contact = require('../models/contact-models');

const getAllDataContact = async () => {
    try{
        return await Contact.findAll();
    }catch(error){
        return false;
    }
  
}

const createDataContact = async (name, email, message) => {
    return Contact.create({name, email: email.toLowerCase(), message});
} 


module.exports = {
    getAllDataContact,
    createDataContact
}
