import { CountryModel } from './country'
import { RegionModel } from './region'

export class Phone {
	public number: number
	public country: CountryModel
	public region: RegionModel

	constructor(
		number: number, 
		country: CountryModel, 
		region: RegionModel){
		
		this.number = number
		this.country = country
		this.region = region
	}
}