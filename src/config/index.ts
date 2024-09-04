import * as dotenv from 'dotenv';
dotenv.config();
import pack from './../../package.json';

export interface Config {
  app: {
    name: string;
    version: string;
    description: string;
    port: number;
  };
  jwt: {
    secret: string;
  };
  server: {
    host: string;
    schemes: string[];
  };
  db: {
    name: string;
    password: string;
    database: string;
  };
}

export const config = {
  app: {
    name: pack.name || 'app-name',
    version: pack.version || '0.0.0',
    description: pack.description || 'app-description',
    port: 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret'
  },
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    schemes: ['http', 'https']
  },
  db: {
    name: process.env.DB_NAME || 'test',
    password: process.env.DB_PASSWORD || 'test',
    database: process.env.DB_DATABASE || 'test'
  }
};
