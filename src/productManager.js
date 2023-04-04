const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path
		this.products = []
		this.idCounter = 0
    }
    async addProduct(title, description, price, thumbnail, code, stock) {
		try {
			if (!title || !description || !price || !thumbnail || !code || !stock)
					throw Error('Todos los campos son obligatorios')
			let products = await fs.promises.readFile(this.path, {encoding: 'utf8'})
			products = JSON.parse(products)
			if (products.some(e => e.code === code)) throw Error('El valor de code debe ser único')
			products.push({
				title,
				description,
				price,
				thumbnail,
				code,
				stock,
				id: products.length + 1
			});
			const productsJSON = JSON.stringify(products, null, 2)
			await fs.promises.writeFile(this.path, productsJSON, {encoding: 'utf8'})
			return products
		} catch (error) {
			if (error.message.includes('no such file or directory')) {
				const productsJSON = JSON.stringify([{
					title,
					description,
					price,
					thumbnail,
					code,
					stock,
					id: ++this.products.length
				}], null, 2)
				await fs.promises.writeFile(this.path, productsJSON, {encoding: 'utf8'})
				return this.products
			} else {
				console.log(error.message);
			}
		}
    }
    async getProducts() {
		try {
			let products = await fs.promises.readFile(this.path, {encoding: 'utf8'})
			products = JSON.parse(products)
			return products
		} catch (error) {
			if (error.message.includes('no such file or directory')) {
				const productsJSON = JSON.stringify(this.products, null, 2)
				await fs.promises.writeFile(this.path, productsJSON, {encoding: 'utf8'})
				return this.products
			} else {
				console.log(error);
			}
		}
    }
    async getProductById(id) {
		try {
			let products = await fs.promises.readFile(this.path, {encoding: 'utf8'})
			products = JSON.parse(products)
			const product = products.find(e => e.id === Number(id))
			if (product) return product
			// else return `Error, el producto con id ${id} no se ha encontrado`
			else return {error: `El producto con el id ${id} no existe`}
		} catch (error) {
			if (error.message.includes('no such file or directory')) {
				const productsJSON = JSON.stringify(this.products, null, 2)
				await fs.promises.writeFile(this.path, productsJSON, {encoding: 'utf8'})
				return this.products
			} else {
				console.log(error);
			}
		}
    }
	// async updateProduct(id, object) {
	// 	try {
	// 		let products = await fs.promises.readFile(this.path, {encoding: 'utf8'})
	// 		products = JSON.parse(products)
	// 		let index;
	// 		const product = products.find((e,i) => {
	// 			if (e.id === id) {
	// 				index = i
	// 				return true
	// 			}
	// 		})
	// 		if (!product) return 'Not found'
	// 		for (const key in object) {
	// 			if (Object.hasOwnProperty.call(product, key) && key !== 'id') {
	// 				product[key] = object[key];
	// 			}
	// 		}
	// 		products[index] = product
	// 		const productsJSON = JSON.stringify(this.products, null, 2)
	// 		await fs.promises.writeFile(this.path, productsJSON, {encoding: 'utf8'})
	// 		return product;
	// 	} catch (error) {
	// 		if (error.message.includes('no such file or directory')) {
	// 			const productsJSON = JSON.stringify(this.products, null, 2)
	// 			await fs.promises.writeFile(this.path, productsJSON, {encoding: 'utf8'})
	// 			return this.products
	// 		} else {
	// 			console.log(error);
	// 		}
	// 	}
	// }
	// async deleteProduct(id) {
	// 	try {
	// 		let products = await fs.promises.readFile(this.path, {encoding: 'utf8'})
	// 		products = JSON.parse(products)
	// 		let index;
	// 		const product = products.find((e,i) => {
	// 			if (e.id === id) {
	// 				index = i
	// 				return true
	// 			}
	// 		})
	// 		if (!product) return 'Not found'
	// 		const deleted = products.splice(index,1)[0]
	// 		return deleted
	// 	} catch (error) {
	// 		if (error.message.includes('no such file or directory')) {
	// 			const productsJSON = JSON.stringify(this.products, null, 2)
	// 			await fs.promises.writeFile(this.path, productsJSON, {encoding: 'utf8'})
	// 			return this.products
	// 		} else {
	// 			console.log(error);
	// 		}
	// 	}
	// }
}

const productManager = new ProductManager('./src/ProductManager.json')

module.exports = productManager