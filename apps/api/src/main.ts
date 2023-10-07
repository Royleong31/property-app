import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Request, Response } from "express";
import { AppModule } from "./app.module";

process.env.NEST_DEBUG = true as any;

declare const module: any;

const getApp = async (): Promise<INestApplication> => {
  const app = await NestFactory.create(AppModule);

  app.use("/health", (req: Request, res: Response) => {
    return res.status(200).send();
  });

  return app;
};

async function bootstrap(): Promise<void> {
  const app = await getApp();
  app.enableCors();
  // app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3200);
  console.log("running on port " + (process.env.PORT ?? 3200));

  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
}
bootstrap();
