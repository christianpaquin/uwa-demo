// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// config settings for the sample issuer

// issuer settings
export const ISSUER_PORT: string = '4000'
export const ISSUER_URL: string = `https://commun.ity`
export const ISSUER_ABOUT_URL: string = `https://commun.ity/about.html`
export const ISSUANCE_SUFFIX: string = '/issue'
export const JWKS_SUFFIX: string = '/.well-known/jwks.json'
export const TOKEN_VALIDITY_IN_DAYS: number = 100
export const TOKEN_LABEL_TYPE: string = 'Membership level'
export const TOKEN_LABEL_VALUES = {
    1: 'Gold',
    2: 'Silver',
    3: 'Bronze'
}
export const getLabel = (userId: string): number => 1 // return one of the label types
