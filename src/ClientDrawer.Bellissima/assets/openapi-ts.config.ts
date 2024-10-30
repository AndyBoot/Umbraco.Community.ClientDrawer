import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    //client: '@hey-api/client-fetch',
    //input: 'http://localhost:30745/umbraco/swagger/clientdrawer/swagger.json',
    //output: 'src/api',
    input: 'http://localhost:30745/umbraco/swagger/clientdrawer/swagger.json',
    output: {
        lint: false,
        path: 'src/api'
    },
    debug: true,
    schemas: false,
    types: {
        enums: 'typescript'
    }
});