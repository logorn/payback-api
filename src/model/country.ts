import { RegionModel } from './region'

export class CountryModel {
	public id: number
	public name: string
	public regions: Array<RegionModel>

	constructor(id: number, name: string){
		this.id = id
		this.name = name
	}
}