import { Injectable } from '@angular/core'

@Injectable()
export class CostCenterModel{
	public id: number
	public name: string
	public code: string

	constructor(){}

	public static mock() {
		var costCenters = new Array<CostCenterModel>()
		var costCenter1 = new CostCenterModel()
		costCenter1.id = 0
		costCenter1.name = "RH"
		costCenter1.code = "002.300-2"

		var costCenter2 = new CostCenterModel()
		costCenter2.id = 3
		costCenter2.name = "Diretoria"
		costCenter2.code = "002.300-2"

		var costCenter3 = new CostCenterModel()
		costCenter3.id = 2
		costCenter3.name = "Financeiro"
		costCenter3.code = "002.300-2"

		costCenters.push(costCenter1)
		costCenters.push(costCenter2)
		costCenters.push(costCenter3)

		return costCenters
	}
}
