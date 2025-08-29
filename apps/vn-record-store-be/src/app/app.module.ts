import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AlbumsModule } from './albums/albums.module';
import { CheckoutModule } from './checkout/checkout.module';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import * as fs from 'fs';

const isDocker = fs.existsSync('/.dockerenv') || process.env.DOCKER === 'true';
const envFiles = [
  '.env',                 // default
  '.env.local',           // local overrides
  isDocker ? '.env.docker' : undefined, // docker-only overrides
].filter(Boolean) as string[];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFiles,
      // On Vercel or prod, rely on real env vars, don't read files
      ignoreEnvFile: !!process.env.VERCEL || process.env.NODE_ENV === 'production',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      introspection: true,
      csrfPrevention: false,
    }),
    AlbumsModule,
    CheckoutModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
