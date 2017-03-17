import { UserModel } from '../model/user'
const MongoClient = require('mongodb').MongoClient 
const ObjectId = require('mongodb').ObjectId
const config = require('../config')

export class UserProvider{
	
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

	public static createOne(db, user: UserModel){
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

	public static getAll(db){
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

	public static getOne(db, id: string){
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