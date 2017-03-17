import { UserModel } from '../model/user'
import { MongoClient } from '../helpers/mongodb'

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
}