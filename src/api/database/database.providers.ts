import { DataSource } from 'typeorm';
import 'dotenv/config';
console.log(process.env.DATABASE_USERNAME);

export const databaseProviders = [
  {
    provide: DataSource, // add the datasource as a provider
    inject: [],
    useFactory: async () => {
      // using the factory function to create the datasource instance
      try {
        const dataSource = new DataSource({
          type: 'postgres',
          host: process.env.HOST,
          port: Number(process.env.PORT_POSTGRES),
          username: process.env.DATABASE_USERNAME,
          password: process.env.PASSWORD,
          database: process.env.DATABASE_NAME,
          synchronize: true,
          entities: [`${__dirname}/../**/**.entity{.ts,.js}`], // this will automatically load all entity file in the src folder
        });
        await dataSource.initialize(); // initialize the data source
        console.log('Database connected successfully');
        return dataSource;
      } catch (error) {
        console.log('Error connecting to database');
        throw error;
      }
    },
  },
];
