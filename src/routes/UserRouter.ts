import { Router, Request, Response, NextFunction } from 'express'
import { UserProvider } from '../providers/UserProvider'
import { UserModel } from '../model/user'
import { TokenHelper } from '../helpers/token'
import * as jwt from 'jsonwebtoken'
var config = require('../config')

export class UserRouter {
	public router: Router
	private userProvider: UserProvider

	constructor() {
		this.router = Router() 
		this.init()
	}

	/**
	 * POST create a new User.
	 */
	 public createOne(req: Request, res: Response, next: NextFunction) {
	 	let user = new UserModel()
	 	user.company = Number(req.body.company)
	 	user.email = req.body.email
	 	user.confirmPassword = req.body.confirmPassword
	 	user.password = req.body.password
	 	user.name = req.body.name
	 	user.phone = req.body.phone
	 	
	 	if(user.isValid()){
	 		let userService = new UserProvider()
	 		userService.connect()
	 		.then(db => userService.createOne(db, user))
	 		.then(status => res.send(status))
	 		.catch(err => res.status(500).send(err))
	 	}else {
	 		res.status(406).send("not_valid")
	 	}
	 }

	/**
	 * GET all Users.
	 */
	 public getAll(req: Request, res: Response, next: NextFunction) {
	 	let userService

	 	TokenHelper.verify(req.headers['x-access-token'])
	 	.then(() => userService = new UserProvider())
	 	.then(() => userService.connect())
		.then(db => userService.getAll(db))
		.then(users => res.send(users))
		.catch(err => res.status(401).send(err))
	 }

	/**
	 * GET one user by id
	 */
	 public getOne(req: Request, res: Response, next: NextFunction) {
	 	var id = req.params.id

	 	let userService = new UserProvider()
	 	userService.connect()
	 	.then(db => userService.getOne(db, id))
	 	.then(users => res.send(users))
	 	.catch(err => res.status(401).send(err))
	 }

	/**
	 * Take each handler, and attach to one of the Express.Router's
	 * endpoints.
	 */
	 init() {
	 	this.router.get('/', this.getAll) 
	 	this.router.get('/:id', this.getOne) 
	 	this.router.post('/', this.createOne)
	 }

	}

	// Create the UserRouter, and export its configured Express.Router
	const userRoutes = new UserRouter() 
	userRoutes.init() 

	export default userRoutes.router 