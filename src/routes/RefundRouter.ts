import { Router, Request, Response, NextFunction } from 'express'
import { RefundProvider } from '../providers/RefundProvider'
import { RefundModel } from '../model/refund'
import { TokenHelper } from '../helpers/token'
import { RandomHelper } from '../helpers/random'

export class RefundRouter{
	public router: Router
	private refundProvider: RefundProvider

	constructor(){
		this.router = Router()
		this.init()
	}

	private createOne(req: Request, res: Response, next: NextFunction){
		let refund = new RefundModel()
		refund.mapper(req.body)
		
		if(refund.isValid()){
			TokenHelper.verify(req.headers['x-access-token'])
			.then(() => RefundProvider.createOne(refund))
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

	private getAll(req: Request, res: Response, next: NextFunction){
		TokenHelper.verify(req.headers['x-access-token'])
		.then(() => RefundProvider.getAll())
		.then(refunds => res.send(refunds))
		.catch(err => res.status(401).send(err))
	}

	private getOne(req: Request, res: Response, next: NextFunction){
		let id = req.params.id

		TokenHelper.verify(req.headers['x-access-token'])
		.then(() => RefundProvider.getOne(id))
		.then(refund => res.send(refund))
		.catch(err => res.status(401).send(err))
	}

	init(){
		this.router.get('/', this.getAll)
		this.router.get('/:id', this.getOne)
		this.router.post('/', this.createOne)
	}

}

const refundRoutes = new RefundRouter()
refundRoutes.init()

export default refundRoutes.router