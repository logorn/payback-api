import { RegionModel } from './region'
import { Injectable } from '@angular/core'

@Injectable()
export class CountryModel {
	public id: number
	public name: string
	public regions: Array<RegionModel>

	constructor(id: number, name: string){
		this.id = id
		this.name = name
	}
}