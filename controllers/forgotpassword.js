const uuid = require('uuid');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');

const User = require('../models/users');
const Forgotpass = require('../models/forgotpassword');

exports.forgotPassword= async (req, res) => {
    try {
        const { email } =  req.body;
        const user = await User.findOne({where : { email }});
        if(user){
            const id = uuid.v4();
            // console.log('id:',id);
            user.createForgotpassword({ id , active: true })
                // .catch(err => {
                //     throw new Error(err)
                // })
            // sgMail.setApiKey(process.env.SENGRID_API_KEY)
            // const msg = {
            //     to: email, // Change to your recipient
            //     from: 'dileep2424@hotmail.com', // Change to your verified sender
            //     subject: 'Resetpassword',
            //     text: 'Hi There, check the below link to reset you password',
            //     html: `<a href="http://3.89.220.159:4050/password/resetpassword/${id}">Reset password</a>`,
            // }
            // sgMail
            // .send(msg)
            .then((response) => {
                console.log(`http://3.89.220.159:4050/password/resetpassword/${id}`);
                // console.log(response[0].statusCode)
                // console.log(response[0].headers)
                return res.status(202).json({message: 'Link to reset password sent to your mail ', sucess: true})

            })
            .catch((error) => {
                throw new Error(error);
            })

            //send mail
        }else {
            throw new Error('User doesnt exist')
        }
    } catch(err){
        console.error(err)
        return res.json({ message: err, sucess: false });
    }

}


exports.resetpassword = (req, res) => {
    const id =  req.params.id;
    Forgotpass.findOne({ where : { id }}).then(forgotpasswordrequest => {
        if(forgotpasswordrequest){
            forgotpasswordrequest.update({ active: false});
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
            res.end()

        }
    })
}

exports.updatepassword = (req, res) => {

    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        Forgotpass.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
            User.findOne({where: { id : resetpasswordrequest.userId}}).then(user => {
                // console.log('userDetails', user)
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
                    });
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}