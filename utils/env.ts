import 'https://deno.land/x/dotenv@v3.2.0/load.ts'
export const BaseURL = Deno.env.get('BaseURL')
export const MongoApiKey = Deno.env.get('MongoAPIKey')
export const MongoCluster = Deno.env.get('MongoCluster')
export const MongoAPIBaseUrl = Deno.env.get('MongoAPIBaseUrl')
