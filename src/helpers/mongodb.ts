const MongoClientClazz = require('mongodb').MongoClient 
const ObjectId = require('mongodb').ObjectId
const config = require('../config.json')

export class MongoClient{

	constructor(){
		return MongoClientClazz
	}

	public static connect(url: string){
		return new Promise((resolve, reject) => {
			MongoClientClazz.connect(url, (err, db) => {
				if(err)
					reject(err)
					resolve(db)
			})
		})
	}

	public static clusters = config.clusters
}