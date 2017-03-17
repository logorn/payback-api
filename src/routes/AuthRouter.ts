import { Router, Request, Response, NextFunction } from 'express'
import { UserModel } from '../model/user'
import { TokenHelper } from '../helpers/token'

export class AuthRouter{
	public router: Router

	constructor(){
		this.router = Router() 
		this.init()
	}

	public getToken(req: Request, res: Response, next: NextFunction){
		res.send(TokenHelper.generatePublic())
	}

	public auth(req: Request, res: Response, next: NextFunction){
		res.send(TokenHelper.generatePrivate())
	}

	init(){
		this.router.get('/', this.getToken) 
		this.router.post('/', this.auth) 
	}
}

const authRoutes = new AuthRouter() 
authRoutes.init() 

export default authRoutes.router 
