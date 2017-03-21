var randomstring = require("randomstring");

export class RandomHelper {
	constructor(){}

	public static generate(length: number) {
		return randomstring.generate({
			length,
			charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*'})
	}
}