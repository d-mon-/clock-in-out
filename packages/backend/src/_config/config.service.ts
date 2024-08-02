import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string): string {
    const value = this.env[key];
    if (!value) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      //   ssl: false,
      entities: [__dirname + '/../**/*.entity.{ts,js}'],
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
      synchronize: true, // As this is alpha version, we synchronize everytime, once we go production, we need to run migration only there
    };
  }
}

export const configService = new ConfigService(process.env);
