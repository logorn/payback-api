import { Router, Request, Response, NextFunction } from 'express'
import { UserModel } from '../model/user'
import * as jwt from 'jsonwebtoken'
var config = require('../config')

export class AuthRouter {
	public router: Router

	constructor() {
		this.router = Router() 
		this.init()
	}

	public getToken(req: Request, res: Response, next: NextFunction){
		var token = jwt.sign({ access: 'public' }, config.tokenSecret, { expiresIn: '15m' })
		res.send(token)
	}

	public auth(req: Request, res: Response, next: NextFunction){
		var token = jwt.sign({ access: 'private' }, config.tokenSecret, { expiresIn: '1h' })
		res.send(token)
	}

	/**
	* Take each handler, and attach to one of the Express.Router's
	* endpoints.
	*/
	init() {
		this.router.get('/', this.getToken) 
		this.router.post('/', this.auth) 
	}
}

// Create the UserRouter, and export its configured Express.Router
const authRoutes = new AuthRouter() 
authRoutes.init() 

export default authRoutes.router 
