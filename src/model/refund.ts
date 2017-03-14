import { Injectable } from '@angular/core';
import { CostCenterModel } from './cost-center'
import { UserModel } from './user'
import 'rxjs/add/operator/map';

@Injectable()
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
		this.user = new UserModel()
	}

	isValidCostCenter () {
		return this.costCenter !== undefined 
	}

	isValidTotalPrice () {
		return this.totalPrice !== undefined
		&& this.totalPrice !== 0
	}
}
