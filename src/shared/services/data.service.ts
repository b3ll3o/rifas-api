import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
  getDataAtual(): Date {
    const data = new Date();
    data.setHours(data.getHours() - 3);
    return data;
  }
}
