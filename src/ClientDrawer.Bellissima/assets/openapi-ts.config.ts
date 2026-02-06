import { defineConfig, defaultPlugins } from '@hey-api/openapi-ts';

export default defineConfig({
    input: 'http://localhost:44315/umbraco/swagger/clientdrawer/swagger.json',
    output: 'src/api',
    plugins: [
        ...defaultPlugins,
        '@hey-api/client-fetch',
        {
            name: '@hey-api/sdk',
            asClass: true,
            classNameBuilder: '{{name}}Service',
        }
    ],
});