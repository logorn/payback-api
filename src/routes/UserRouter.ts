import { Router, Request, Response, NextFunction } from 'express'
import { UserProvider } from '../providers/UserProvider'
import { UserModel } from '../model/user'
import { TokenHelper } from '../helpers/token'

export class UserRouter{
	public router: Router
	private userProvider: UserProvider

	constructor(){
		this.router = Router()
		this.init()
	}

	public createOne(req: Request, res: Response, next: NextFunction){
		let user = new UserModel()
		user.mapper(req.body)
		
		if(user.isValid()){
			TokenHelper.verify(req.headers['x-access-token'])
			.then(() => UserProvider.connect())
			.then(db => UserProvider.createOne(db, user))
			.then(status => res.send(status))
			.catch(err => {
				switch(err.code){
					case 11000:
						res.status(401).send('email_already_exists')
						break
					default:
						res.status(500).send()
						break
				}
			})
		}else{
			res.status(406).send('not_valid')
		}
	}

	public getAll(req: Request, res: Response, next: NextFunction){
		TokenHelper.verify(req.headers['x-access-token'])
		.then(() => UserProvider.connect())
		.then(db => UserProvider.getAll(db))
		.then(users => res.send(users))
		.catch(err => res.status(401).send(err))
	}

	public getOne(req: Request, res: Response, next: NextFunction){
		let id = req.params.id

		TokenHelper.verify(req.headers['x-access-token'])
		.then(() => UserProvider.connect())
		.then(db => UserProvider.getOne(db, id))
		.then(user => res.send(user))
		.catch(err => res.status(401).send(err))
	}

	init(){
		this.router.get('/', this.getAll)
		this.router.get('/:id', this.getOne)
		this.router.post('/', this.createOne)
	}

}

const userRoutes = new UserRouter()
userRoutes.init()

export default userRoutes.router