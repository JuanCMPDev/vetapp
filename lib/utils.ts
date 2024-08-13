import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value))

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit', // numeric day of the month (e.g., '25')
    month: '2-digit', // abbreviated month name (e.g., '10')
    year: 'numeric', // numeric year (e.g., '2023')
    hour: 'numeric', // numeric hour (e.g., '08')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: false // use 24-hour clock
  }

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'lun.')
    day: '2-digit', // numeric day of the month (e.g., '25')
    month: '2-digit', // abbreviated month name (e.g., '10')
    year: 'numeric' // numeric year (e.g., '2023')
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit', // numeric day of the month (e.g., '25')
    month: '2-digit', // abbreviated month name (e.g., '10')
    year: 'numeric' // numeric year (e.g., '2023')
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '08')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: false // use 24-hour clock
  }

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'es-ES',
    dateTimeOptions
  )

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    'es-ES',
    dateDayOptions
  )

  const formattedDate: string = new Date(dateString).toLocaleString(
    'es-ES',
    dateOptions
  )

  const formattedTime: string = new Date(dateString).toLocaleString(
    'es-ES',
    timeOptions
  )

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime
  }
}

export function encryptKey (passkey: string) {
  return btoa(passkey)
}

export function decryptKey (passkey: string) {
  return atob(passkey)
}
