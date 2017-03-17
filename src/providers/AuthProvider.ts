import { UserModel } from '../model/user'
const MongoClient = require('mongodb').MongoClient 
const ObjectId = require('mongodb').ObjectId
const config = require('../config')
import { TokenHelper } from '../helpers/token'
export class AuthProvider{
	
	constructor(){}

	public static connect(){
		return new Promise((resolve, reject) => {
			MongoClient.connect(config.mongodb.users, (err, db) => {
				if(err !== null){
					console.log(err)
					reject(err)
				}else{
					console.log("Connected successfully to server...")
					resolve(db)
				}
			})
		})
	}

	public static authUser(db, currentUser: UserModel){
		let query = { email: currentUser.email }

		return new Promise((resolve, reject) => {
			db.collection("users")
			.findOne(query, (err, user) => {
				console.log(err)
				console.log(user)
				if(err){
					reject(err)	
				}else{
					if(user.password === currentUser.password) resolve(TokenHelper.generatePrivate())
						reject("invalid_password")
				}
			})
		})
	}
}