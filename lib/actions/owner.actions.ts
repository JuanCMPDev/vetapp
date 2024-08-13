'use server'

import { ID, Query, Models } from 'node-appwrite'
import { users } from '../appwrite.config'

interface CreateUserParams {
  name: string
  email: string
  phone: string
}

export const createUser = async (user: CreateUserParams): Promise<Models.User<{}>> => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    )
    return newUser
  } catch (error: any) {
    if (error?.code === 409) {
      const documents = await users.list([
        Query.equal('email', user.email)
      ])
      return documents?.users[0]
    } else {
      throw new Error(error?.message ?? 'An unexpected error occurred.')
    }
  }
}

export const getUser = async (userId: string): Promise<Models.User<{}>> => {
  try {
    const user = await users.get(userId)
    return user
  } catch (error: any) {
    throw new Error(error?.message ?? 'An unexpected error occurred.')
  }
}
