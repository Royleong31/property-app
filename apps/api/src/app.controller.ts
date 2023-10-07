import { GetTestResponse, GetHelloResponse } from "@myapp/types-contract";

import { Controller, Get, Inject } from "@nestjs/common";
import { AppService } from "./app.service";
import { DB_PROVIDER } from "./database/database.provider";
import { dbType } from "./database/database.module";
import { countries } from "./database/schema";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(DB_PROVIDER) private readonly db: dbType
  ) {}

  @Get("")
  async index(): Promise<{ message: string }> {
    const countriesReturn = await this.db.select().from(countries);
    console.log(countriesReturn);
    await this.db.insert(countries).values({ name: "fsa" });
    return { message: this.appService.getHello() };
  }

  @Get("/getHello")
  async getHello(): Promise<GetHelloResponse> {
    return { id: "1", title: "2333", body: "3" };
  }

  @Get("/getTest")
  async getTest(): Promise<GetTestResponse> {
    return { firstName: 333333 };
  }
}
