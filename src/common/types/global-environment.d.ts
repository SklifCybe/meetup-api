declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_HOST: string;
            DB_PORT: string;
            DB_NAME: string;
            DB_USERNAME: string;
            DB_PASSWORD: string;
            PORT: string;
            SALT: string;
            ACCESS_TOKEN: string;
            REFRESH_TOKEN: string;
        }
    }
}

export {};
