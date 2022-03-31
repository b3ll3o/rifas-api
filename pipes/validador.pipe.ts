import { ValidationPipe } from "@nestjs/common";

export class ValidadorPipe extends ValidationPipe {
  constructor(){
    super({
      stopAtFirstError: true,
      whitelist: true,
      transform: true
    })
  }
}