// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import type { GetUmbracoClientdrawerApiV1GetdataResponse, GetUmbracoClientdrawerApiV1GetheaderactiondataResponse } from './types.gen';

/**
 * @returns unknown OK
 * @throws ApiError
 */
export const getUmbracoClientdrawerApiV1Getdata = (): CancelablePromise<GetUmbracoClientdrawerApiV1GetdataResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/umbraco/clientdrawer/api/v1/getdata',
    errors: {
        401: 'The resource is protected and requires an authentication token'
    }
}); };

/**
 * @returns unknown OK
 * @throws ApiError
 */
export const getUmbracoClientdrawerApiV1Getheaderactiondata = (): CancelablePromise<GetUmbracoClientdrawerApiV1GetheaderactiondataResponse> => { return __request(OpenAPI, {
    method: 'GET',
    url: '/umbraco/clientdrawer/api/v1/getheaderactiondata',
    errors: {
        401: 'The resource is protected and requires an authentication token'
    }
}); };