import {CountryModel} from './country'

export class RegionModel {
	public id: number
	public name: string
	public country: CountryModel

	constructor () {}
}