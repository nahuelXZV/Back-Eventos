declare namespace NodeJS {
    interface ProcessEnv {
        APP_NAME: string;
        APP_PROD: boolean;
        PORT: number;
        APP_URL: string;

        FRONTEND_URL: string;

        DB_CONNECTION: string;
        DB_HOST: string;
        DB_PORT: number;
        DB_DATABASE: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;

        HASH_SALT: number;
        JWT_AUTH: string;
        JWT_RECOVERY: string;

        AWS_S3_BUCKET: string;
        AWS_S3_ACCESS_KEY: string;
        AWS_S3_KEY_SECRET: string;
    }
}