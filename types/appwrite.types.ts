import { Models } from 'node-appwrite'

export interface Owner extends Models.Document {
  email: string // Tipo de datos: email
  phone: string // Tipo de datos: string
  userId: string // Tipo de datos: string (clave primaria)
  name: string // Tipo de datos: string
  privacyConsent: boolean // Tipo de datos: boolean
  gender: Gender
  birthDate: string | undefined // Tipo de datos: string (puede ser ISO 8601 o formato similar)
  address: string // Tipo de datos: string
  occupation: string | undefined // Tipo de datos: string
  emergencyContactName: string // Tipo de datos: string
  emergencyContactNumber: string // Tipo de datos: string
  identificationType: string // Tipo de datos: string
  identificationNumber: string // Tipo de datos: string
}
