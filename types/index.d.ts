declare type Gender = 'Male' | 'Female' | 'Other'

declare interface CreateUserParams {
  name: string
  email: string
  phone: string
}

declare interface SearchParamProps {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

declare interface User extends CreateUserParams {
  $id: string
}
