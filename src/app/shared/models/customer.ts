import { NumberConverter, StringConverter } from '../utils/conversion';

export class Customer {

    customer_id: number
    name: string
    last_name: string
    social_media: string
    social_user_name: string
    address: string
    city: string
    state: string
    country: string
    postal_code: string
    phone_number: string
    email: string

    constructor() {
        this.customer_id = null;
        this.name = null;
        this.last_name = null;
        this.social_media = null;
        this.social_user_name = null;
        this.address = null;
        this.city = null;
        this.state = null;
        this.country = null;
        this.postal_code = null;
        this.phone_number = null;
        this.email = null;
    }

    deserialize(model?: any) {
        this.customer_id = NumberConverter(model.customer_id || null);
        this.name = StringConverter(model.name || null);
        this.last_name = StringConverter(model.last_name || null);
        this.social_media = StringConverter(model.social_media || null);
        this.social_user_name = StringConverter(model.social_user_name || null);
        this.address = StringConverter(model.address || null);
        this.city = StringConverter(model.city || null);
        this.state = StringConverter(model.state || null);
        this.country = StringConverter(model.country || null);
        this.postal_code = StringConverter(model.postal_code || null);
        this.phone_number = StringConverter(model.phone_number || null);
        this.email = StringConverter(model.email || null);
        return this;
    }

}