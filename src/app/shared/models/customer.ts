import { NumberConverter, StringConverter } from '../utils/conversion';

export class CustomerTable {
    name: any;
    social_media_user_name: string
    email: string

    constructor() {
        this.name = null;
        this.social_media_user_name = null;
        this.email = null;
    }
}
class Address {
    street: string
    city: string
    province: string
    country: string

    constructor() {
        this.street = null
        this.city = null
        this.province = null
        this.country = null
    }

    deserialize(model?: any) {

        Object.keys(model).map(keys => {
            this[keys] = StringConverter(model[keys] || null)
        });
        return this;
    }
}
class ContactInfo {
    phone_number: string;
    address: Address

    constructor() {
        this.phone_number = null;
        this.address = null;
    }

    deserialize(model?: any) {
        this.phone_number = StringConverter(model.phone_number || null);
        if (model.address) {
            this.address = new Address().deserialize(model.address);
        }
        return this;
    }
}


export class Customer {

    id: number
    name: string
    social_media: string
    social_media_user_name: string
    email: string
    role: string
    contact_info: ContactInfo

    constructor() {
        this.id = null;
        this.name = null;
        this.social_media = null;
        this.social_media_user_name = null;
        this.email = null;
        this.contact_info = null;
        this.role = 'user';
    }

    deserialize(model?: any) {

        Object.keys(model).map(key => {
            if (model[key] && typeof model[key] != 'object')
                this[key] = StringConverter(model[key] || null)
        });

        if (model.contact_info) {
            this.contact_info = new ContactInfo().deserialize(model.contact_info);
        }
        return this;
    }

}