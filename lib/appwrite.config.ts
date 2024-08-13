import * as sdk from 'node-appwrite'

export const {
  PROJECT_ID, API_KEY, DATABASE_ID, OWNER_COLLETCTION_ID, PETS_COLLECTION_ID, VETS_COLLECTION_ID, APPOINTMENTS_COLLECTION_ID, NEXT_PUBLIC_BUCKET_ID: BUCKET_ID, NEXT_PUBLIC_ENDPOINT: ENDPOINT
} = process.env

const client = new sdk.Client()

if (
  typeof ENDPOINT !== 'string' ||
  typeof PROJECT_ID !== 'string' ||
  typeof API_KEY !== 'string'
) {
  throw new Error('Missing or invalid Appwrite configuration')
}

client
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY)

export const databases = new sdk.Databases(client)
export const storage = new sdk.Storage(client)
export const users = new sdk.Users(client)
export const messaging = new sdk.Messaging(client)
