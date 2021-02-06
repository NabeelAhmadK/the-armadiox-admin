import { NumberConverter, StringConverter } from '../utils/conversion';

export class Product {

    id: number
    product_name: string
    product_description: string
    product_in_stock: number
    product_in_order: number
    product_cost: number
    product_retail_price: number
    product_category_id: number
    product_type_id: number
    product_variation: string
    discount: number

    constructor() {
        this.id = null
        this.product_name = null
        this.product_description = null
        this.product_in_stock = null
        this.product_in_order = null
        this.product_cost = null
        this.product_retail_price = null
        this.product_category_id = null
        this.product_type_id = null
        this.product_variation = null
        this.discount = null
    }

    deserialize(model?: any) {
        this.id = StringConverter(model.id || null);
        this.product_name = StringConverter(model.product_name || null);
        this.product_description = StringConverter(model.product_description || null);
        this.product_in_stock = NumberConverter(model.product_in_stock || null);
        this.product_in_order = NumberConverter(model.product_in_order || 0);
        this.product_cost = NumberConverter(model.product_cost || null);
        this.product_retail_price = NumberConverter(model.product_retail_price || null);
        this.product_category_id = NumberConverter(model.product_category_id || null);
        this.product_type_id = NumberConverter(model.product_type_id || null);
        this.product_variation = StringConverter(model.product_variation || null);
        this.discount = NumberConverter(model.discount || 0);

        return this;

    }

}