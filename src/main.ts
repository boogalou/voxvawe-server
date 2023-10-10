import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { corsConfig } from "./config/cors.config";
import { ConfigService } from "@nestjs/config";
import { AuthSocketAdapter } from "./middleware/auth-socket.adapter";
import { RedisIoAdapter } from "./middleware/redis-io.adapter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsConfig);
  app.use(cookieParser());

  // const redisIoAdapter = new RedisIoAdapter(app);
  // await redisIoAdapter.connectToRedis();
  // app.useWebSocketAdapter(redisIoAdapter);



  const authSocketAdapter = new AuthSocketAdapter(app, new ConfigService());
  app.useWebSocketAdapter(authSocketAdapter);



  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.setGlobalPrefix("api")
    .listen(3000);

}
bootstrap();
