var MongoClient = require('mongodb').MongoClient 
var Db = require('mongodb').Db
var ObjectId = require('mongodb').ObjectId
const config = require('../config')
import { UserModel } from '../model/user'

export class UserProvider {
	
   constructor () {}

   public connect(){
      return new Promise((resolve, reject) => {
         MongoClient.connect(config.mongodb.users, (err, db) => {
            if(err !== null){
               console.error(err)
               reject(err)
            }else{
               console.log("Connected successfully to server")
               resolve(db)
            }
         })   
      })
   }

   public createOne(db, user: UserModel) {
   	return new Promise((resolve, reject) => {
   		db.collection("users")
   		.insertOne(user, (err, r) => {
   			if(err !== null){
               db.close()
   				reject("Error")
   			}else{
               db.close()
   				resolve("User stored")
   			}
   		}) 
   	})
   }

   public getAll(db) {
   	return new Promise((resolve, reject) => {
   		db.collection("users")
   		.find({})
   		.toArray((err, users) => {
   			if(err !== null){
               db.close()
   				reject(err)
   			}else{
               db.close()
   				resolve(users)
   			}
   		})  
   	})
   }

   public getOne(db, id: string) {
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