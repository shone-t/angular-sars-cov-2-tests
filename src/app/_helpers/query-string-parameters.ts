export class QueryStringParameters {
    private paramsAndValues: string[];
  
    constructor() {
      this.paramsAndValues = [];
    }
  
    public push(key: string, value: Object): void {
      value = encodeURIComponent(value?.toString()).replace(/%2C/g, ',');
      this.paramsAndValues.push([key, value].join('='));
    }
  
    public toString = (): string => this.paramsAndValues.join('&');
  }