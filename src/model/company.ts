import { Injectable } from '@angular/core'
import { CostCenterModel } from './cost-center'

@Injectable()
export class CompanyModel {

	public id: number
	public name: string
	public costCenters: Array<CostCenterModel>

	constructor(id: number, name: string){
		this.id = id
		this.name = name
	}

	public static mock() {
		let companies: Array<CompanyModel> = new Array<CompanyModel>()
		companies.push(new CompanyModel(1, "IBM"))
		companies.push(new CompanyModel(2, "Google"))
		companies.push(new CompanyModel(3, "Facebook"))
		companies.push(new CompanyModel(4, "Microsoft"))
		return companies
	}
}