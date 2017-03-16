import * as jwt from 'jsonwebtoken'
var config = require('../config')

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
}