const jwt = require('jsonwebtoken')
const config = require('../config')

export class TokenHelper{
	constructor(){}

	static verify(token: string){
		return new Promise((resolve, reject) => {
			jwt.verify(token, config.tokenSecret, (err, decoded) => {
		 		if(err) reject(err)
		 			resolve(decoded)
		 	})
		})
	}

	static verifyCustom(token: string, secret: string){
		return new Promise((resolve, reject) => {
			jwt.verify(token, secret, (err, decoded) => {
		 		if(err) reject(err)
		 			resolve(decoded)
		 	})
		})	
	}

	static generatePublic(){
		return jwt.sign({ access: 'public' }, config.tokenSecret, { expiresIn: '1d' })
	}

	static generatePrivate(){
		return jwt.sign({ access: 'private' }, config.tokenSecret, { expiresIn: '1h' })
	}

	static generateCustom(object: Object){
		return jwt.sign(object, config.tokenSecret, { expiresIn: '7d' })	
	}
}