import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule, CommonModule, CachingModule } from 'be-core'
import { load } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [load],
      isGlobal: true
    }),
    CommonModule,
    HealthModule,
    CachingModule
  ]
})
export class AppModule {}
