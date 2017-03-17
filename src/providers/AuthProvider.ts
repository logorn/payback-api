import { UserModel } from '../model/user'
import { TokenHelper } from '../helpers/token'
import { MongoClient } from '../helpers/mongodb'

export class AuthProvider{
	
	constructor(){}

	public static connect(){
		return MongoClient.connect(MongoClient.clusters.auth)
	}

	public static authUser(db, currentUser: UserModel){
		let query = { email: currentUser.email }

		return new Promise((resolve, reject) => {
			db.collection("users")
			.findOne(query, (err, user) => {
				if(err){
					reject(err)	
				}else{
					if(user.password === currentUser.password) resolve({access_token: TokenHelper.generatePrivate()})
						reject("invalid_password")
				}
			})
		})
	}
}