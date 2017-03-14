import {CountryModel} from './country'
import {Injectable} from '@angular/core'

@Injectable()
export class RegionModel {
	public id: number
	public name: string
	public country: CountryModel

	constructor(
		id: number, 
		name: string, 
		country: CountryModel) {
		
		this.id = id
		this.name = name
		this.country = country
	}
}