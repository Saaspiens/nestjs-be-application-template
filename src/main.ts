import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: 'icc.example.vn',
        credentials: true,
    });
    await app.listen(3000);
}
void bootstrap();
