import { UserModel } from '../model/user'
const MongoClient = require('mongodb').MongoClient 
const ObjectId = require('mongodb').ObjectId
const config = require('../config')

export class UserProvider{
	
	constructor(){}

	public connect(){
		console.log("connecting to mongodb")
		return new Promise((resolve, reject) => {
			console.log("entrando na promisse")
			console.log(config.mongodb.users)
			
			MongoClient.connect(config.mongodb.users, (err, db) => {
				console.log(err)
				console.log(db)
				if(err !== null){
					console.log('Err: ' + err)
					reject(err)
				}else{
					console.log("Connected successfully to server...")
					resolve(db)
				}
			})
		})
	}

	public createOne(db, user: UserModel){
		return new Promise((resolve, reject) => {
			db.collection("users")
			.insertOne(user, (err, result) => {
				if(err !== null){
					db.close()
					reject(err)
				}else{
					db.close()
					resolve(result)
				}
			})
		})
	}

	public getAll(db){
		console.log("db: " + db)
		return new Promise((resolve, reject) => {
			db.collection("users")
			.find({})
			.toArray((err, users) => {
				if(err !== null){
					console.log(err)
					db.close()
					reject(err)
				}else{
					console.log(users)
					db.close()
					resolve(users)
				}
			})
		})
	}

	public getOne(db, id: string){
		return new Promise((resolve, reject) => {
			db.collection("users")
			.findOne({
				"_id": ObjectId(id)
			}, (err, user) => {
				if(err !== null){
					db.close()
					reject(err)
				}else{
					db.close()
					resolve(user)
				}
			})
		})
	}
}