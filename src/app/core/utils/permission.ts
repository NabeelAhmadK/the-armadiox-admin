export class Permission {
  role_id: number;
  function_id: number;
  function_name: string;
  locale_key: string;
  function_url: string;
  icon: string;
  function_class: string;
  parent_function_id: number;
  can_create: boolean;
  can_update: boolean;
  can_view: boolean;
  can_delete: boolean;
  menu_order: number;
  children: Array<any>;

  constructor() {
    this.role_id = null;
    this.function_id = null;
    this.function_name = '';
    this.locale_key = '';
    this.function_url = '';
    this.icon = '';
    this.function_class = '';
    this.parent_function_id = null;
    this.menu_order = 0;
    this.can_create = false;
    this.can_update = false;
    this.can_view = false;
    this.can_delete = false;

    this.children = [];
  }

  deserialize(model: any) {
    this.role_id = model.role_id || null;
    this.function_id = model.function_id || null;
    this.function_name = model.function_name || '';
    this.locale_key = model.locale_key || '';
    this.function_url = model.function_url || '';
    this.icon = model.icon || '';
    this.function_class = model.function_class || '';
    this.parent_function_id = model.parent_function_id || null;

    this.menu_order = model.menu_order || 0;
    this.can_create = model.can_create || false;
    this.can_update = model.can_update || false;
    this.can_view = model.can_view || false;
    this.can_delete = model.can_delete || false;

    this.children = [];
    return this;
  }
}
