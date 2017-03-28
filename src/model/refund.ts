import { CostCenterModel } from './cost-center'
import { UserModel } from './user'

export class RefundModel {
	public expenseDate: string
	public checkingCopy: string
	public isApproved: boolean
	public status: string
	public costCenter: CostCenterModel
	public user: UserModel
	public totalPrice: number

	constructor(){
		this.isApproved = undefined
		this.status = "pendente"
		this.expenseDate = new Date().toISOString()
	}

	mapper(refund: any){
		this.checkingCopy = refund.checkingCopy
		this.costCenter = refund.costCenter
		this.user = refund.user
		this.totalPrice = refund.totalPrice
	}

	isValidCostCenter () {
		return this.costCenter !== undefined 
	}

	isValidTotalPrice () {
		return this.totalPrice !== undefined
		&& this.totalPrice !== 0
	}

	isValid(){
		return this.isValidCostCenter()
		&& this.isValidTotalPrice()
	}
}
