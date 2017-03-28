const MongoClient = require('mongodb').MongoClient 
const ObjectId = require('mongodb').ObjectId
const config = require('../config.json')

import { RefundModel } from '../model/refund'
import { MailHelper } from '../helpers/mail'

export class RefundProvider{
	
	constructor(){}

	public static createOne(refund: RefundModel){
		return new Promise((resolve, reject) => {
			MongoClient.connect(config.clusters.refunds, (err, db) => {
				if(err){
					reject(err)
				}else{
					db.collection("refunds")
					.insertOne(refund, (err, result) => {
						db.close()
						if(err)
							reject(err)
							resolve(result)
					})	
				}
			})
		})
	}

	public static getAll(){
		return new Promise((resolve, reject) => {
			MongoClient.connect(config.clusters.refunds, (err, db) => {
				if(err){
					reject(err)
				}else{
					db.collection("refunds")
					.find({})
					.toArray((err, refunds) => {
						db.close()
						if(err)
							reject(err)
							resolve(refunds)
					})	
				}
			})
		})
	}

	public static getOne(id: string){
		return new Promise((resolve, reject) => {
			MongoClient.connect(config.clusters.refunds, (err, db) => {
				if(err){
					reject(err)
				}else{
					db.collection("refunds")
					.findOne({
						"_id": ObjectId(id)
					}, (err, refund) => {
						db.close()
						if(err) 
							reject(err)
							resolve(refund)
					})
				}
			})
		})
	}
}