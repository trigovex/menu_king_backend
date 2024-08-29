//@ts-nocheck

import jwt from 'jsonwebtoken'
 import dotenv from "dotenv";
dotenv.config();
class JsonWebToken {
    constructor(options) {
        this.options = options;
    }

    sign(payload) {
        return new Promise((resolve, reject) => {
            console.log(payload.exp)
            jwt.sign(payload, process.env.JWTKEY_SCERET_TOKEN, function (err, token) {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            });
        })
    }
    
    verify(jwtToken) {
        return new Promise((resolve, reject) => {
            jwt.verify(jwtToken, process.env.JWTKEY_SCERET_TOKEN, function (err, decoded) {
                if (err) {
                    resolve(false)
                } else {
                    resolve(decoded)
                }
            });
        })
    }
    async checkExpiry(jwtToken) {
        let decodedToken = jwt.decode(jwtToken, { complete: true });
        // console.log(decodedToken)
        if(!decodedToken?.payload?.exp){
            return true
        }
        
        let expirationTime = decodedToken.payload.exp;
        let currentTime = Math.floor(Date.now() / 1000);
        // console.log(currentTime, expirationTime)
        if (currentTime > expirationTime) {
            return true
        } else {
            return false
        }
    }
}

export default JsonWebToken;