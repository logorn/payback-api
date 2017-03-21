import { UserModel } from '../model/user'
import { MongoClient } from '../helpers/mongodb'
import { MailHelper } from '../helpers/mail'
import { RandomHelper } from '../helpers/random'

const ObjectId = require('mongodb').ObjectId

export class UserProvider{
	
	constructor(){}

	public static connect(){
		return MongoClient.connect(MongoClient.clusters.users)
	}

	public static createOne(db, user: UserModel){
		return new Promise((resolve, reject) => {
			db.collection("users")
			.insertOne(user, (err, result) => {
				db.close()
				if(err)
					reject(err)
					resolve(result)
			})
		})
	}

	public static getAll(db){
		return new Promise((resolve, reject) => {
			db.collection("users")
			.find({})
			.toArray((err, users) => {
				db.close()
				if(err)
					reject(err)
					resolve(users)
			})
		})
	}

	public static getOne(db, id: string){
		return new Promise((resolve, reject) => {
			db.collection("users")
			.findOne({
				"_id": ObjectId(id)
			}, (err, user) => {
				db.close()
				if(err) 
					reject(err)
					resolve(user)
			})
		})
	}

	public static verifyPassword(db, id: string, password: string){
		return new Promise((resolve, reject) => {
			db.collection("users")
			.findOne({
				"_id": ObjectId(id)
			}, (err, user) => {
				if(err){
					db.close()
					reject(err)
				}else if(user.password === password){
					resolve(db)
				}else{
					db.close()
					reject({
						message: "invalid_password"
					})
				}
			})
		})
	}

	public static verifyEmail(db, email: string){
		return new Promise((resolve, reject) => {
			db.collection("users")
			.findOne({
				"email": email
			}, (err, user) => {

				if(err){
					db.close()
					reject(err)	
				}else if(user){
					resolve(db)
				}else {
					db.close()
					reject({
						message: 'email_not_found'
					})
				}
			})
		})
	}

	public static sendRecoverPasswordEmail(email: string, newPassword: string){
		return MailHelper.sendMail(
			email, 
			'Recover password', 
			`Your new password is: ${newPassword}`, 
			`<p>Your new password is: <b>${newPassword}</b></p>`)
	}

	public static changePasswordByEmail(db, email: string){
		let newPassword = RandomHelper.generate(8)
		let collection = db.collection("users")

		return new Promise((resolve, reject) => {
			
			collection.findOne({email}, (err, user) => {
				if(err){
					db.close()
					reject(err)
				}else{
					user.password = newPassword
					collection.update({email}, user, (err, user) => {
						db.close()
						if(err) 
							reject(err)
							resolve(newPassword)
					})
				}
			})
			
		})
	}

	public static changePassword(db, id: string, newPassword: string){
		let criteria = {"_id": ObjectId(id)}
		let collection = db.collection("users")

		return new Promise((resolve, reject) => {
			collection.findOne(criteria, (err, user) => {
				if(err){
					db.close()
					reject(err)
				}else{
					user.password = newPassword
					collection.update(criteria, user, (err, user) => {
						db.close()
						if(err)
							reject(err)
							resolve("password_changed")
					})
				}
			})
		})
	}
}