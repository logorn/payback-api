const MongoClient = require('mongodb').MongoClient 
const ObjectId = require('mongodb').ObjectId
const config = require('../config.json')

import { UserModel } from '../model/user'
import { TokenHelper } from '../helpers/token'

export class AuthProvider{
	
	constructor(){}

	public static authUser(currentUser: UserModel){
		let query = { email: currentUser.email }

		return new Promise((resolve, reject) => {
			MongoClient.connect(config.clusters.users, (err, db) => {
				if(err) reject(err)

				db.collection("users")
				.findOne(query, (err, user) => {
					if(err){
						reject(err)	
					}else{
						if(user.password === currentUser.password) 
							resolve({access_token: TokenHelper.generatePrivate()})
							reject("invalid_password")
					}
				})
			})
		})
	}
}