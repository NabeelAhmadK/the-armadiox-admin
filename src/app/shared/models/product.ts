export class Product {

    product_id: number
    product_name: string
    product_description: string
    units_in_stock: number
    units_on_order: number
    unit_cost: number
    product_category: number
    product_type: number
    product_variation: string
    discount: number

    constructor() {
        this.product_id = null
        this.product_name = null
        this.product_description = null
        this.units_in_stock = null
        this.units_on_order = null
        this.unit_cost = null
        this.product_category = null
        this.product_type = null
        this.product_variation = null
        this.discount = null
    }

}