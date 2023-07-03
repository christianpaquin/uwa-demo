// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// config settings for the sample issuer

// issuer settings
export const ISSUER_PORT: string = '4002'
export const ISSUER_URL: string = `https://human.iam`
export const ISSUER_ABOUT_URL: string = `https://human.iam/about.html`
export const ISSUANCE_SUFFIX: string = '/issue'
export const JWKS_SUFFIX: string = '/.well-known/jwks.json'
export const TOKEN_VALIDITY_IN_DAYS: number = 1
export const TOKEN_LABEL_TYPE: string = 'Validation'
export const TOKEN_LABEL_VALUES = {
    1: 'in person',
    2: 'video',
    3: 'email'
}
export const getLabel = (userId: string): number => 1 // return one of the label types
