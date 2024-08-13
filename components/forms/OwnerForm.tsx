'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import CustomFormField from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { useState } from 'react'
import { UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/actions/owner.actions'

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton'
}

const OwnerForm = (): React.ReactNode => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  })

  async function onSubmit ({ name, email, phone }: z.infer<typeof UserFormValidation>): Promise<void> {
    setIsLoading(true)
    try {
      const userData = { name, email, phone }
      const user = await createUser(userData)

      if (user !== null && user !== undefined) {
        router.push(`/clientes/${user.$id}/registro`)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
        <section className='mb-12 space-y-4'>
          <h1 className='header'>Hola! 👋</h1>
          <p className='text-dark-700'>Agenda tu primera cita</p>
        </section>

        <CustomFormField
          control={form.control as any}
          fieldType={FormFieldType.INPUT}
          name='name'
          label='Nombre completo'
          placeholder='Ej: Cosme Fulanito'
          iconSrc='/assets/icons/user.svg'
          iconAlt='user icon'
        />

        <CustomFormField
          control={form.control as any}
          fieldType={FormFieldType.INPUT}
          name='email'
          label='Email'
          placeholder='Ej: cosmefulanito@rmail.com'
          iconSrc='/assets/icons/email.svg'
          iconAlt='user icon'
        />

        <CustomFormField
          control={form.control as any}
          fieldType={FormFieldType.PHONE_INPUT}
          name='phone'
          label='Phone number'
          placeholder='(300) 123-4567'
        />

        <SubmitButton isLoading={isLoading}>Ingresa</SubmitButton>
      </form>
    </Form>
  )
}

export default OwnerForm
