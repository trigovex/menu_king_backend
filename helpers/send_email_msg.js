import nodemailer from "nodemailer"

const SendEmailBasedOnServerSettings = async (host, port,from_email, paasword, to_email, subject, message) => {\

    try{

        console.log(host, port,from_email, paasword, to_email, subject, message)
        let transporter = nodemailer.createTransport({
            host: host,
            port: port,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: from_email,
                pass: paasword,
            },
            tls:{
                rejectUnauthorized: false,
            }
            
        });
    
        let emailDetails = {
            from: from_email,
            to: to_email,
            subject: subject,
            html: message,
        };
    
        let resp = await transporter.sendMail(emailDetails)
        console.log("Email Resp ===>>>", JSON.stringify(resp))
    }
    catch(err){
        console.log("Error ===>>>", err, err.response)
        throw err.response
    }
}

export {SendEmailBasedOnServerSettings};