const joi=require('joi');
const schema=joi.object({
    oldPassword:joi.string().required().messages(),
    newPassword:joi.string().required().messages(),
    confirmPassword:joi.string().required().messages()

})
module.exports={schema};