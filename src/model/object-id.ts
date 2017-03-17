const objectId = require('mongodb').ObjectId

export class ObjectId{

	consntructor(id){
		objectId(id)
	}

	get(){
		return objectId
	}
}