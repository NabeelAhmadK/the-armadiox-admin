export class FiltersByModel {
  title: string;
  value: string;

  constructor(data: any) {
    this.title = this.buildTitle(data);
    this.value = data || '';
  }

  private buildTitle(key) {
    if (!key) return '';
    return key.toString().replace(/_/g, ' ');
  }
}
