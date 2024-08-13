'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl } from '@/components/ui/form'
import CustomFormField from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { useState } from 'react'
import { UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/actions/owner.actions'
import { FormFieldType } from './OwnerForm'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { genderOptions } from '@/constants/constants'
import { Label } from '@/components/ui/label'

const RegisterForm = ({ user }: { user: User }): React.ReactNode => {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-12 flex-1'>

        <section className='space-y-4'>
          <h1 className='header'>Bienvenido! 🐱</h1>
          <p className='text-dark-700'>Necesitamos algunos datos</p>
        </section>

        <section className='space-y-6'>
          <h2 className='sub-header'>Informacion personal</h2>
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

        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control as any}
            fieldType={FormFieldType.INPUT}
            name='email'
            label='Email'
            placeholder='Ej: cosmefulanito@mail.com'
            iconSrc='/assets/icons/email.svg'
            iconAlt='user icon'
          />

          <CustomFormField
            control={form.control as any}
            fieldType={FormFieldType.PHONE_INPUT}
            name='phone'
            label='Número de telefono'
            placeholder='(300) 123-4567'
          />
        </div>

        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control as any}
            fieldType={FormFieldType.DATE_PICKER}
            name='birthDate'
            label='Fecha de nacimiento'
            placeholder='(300) 123-4567'
          />
          <CustomFormField
            control={form.control as any}
            fieldType={FormFieldType.SKELETON}
            name='gender'
            label='Selecciona tu género'
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className='flex h-11 gap-1 xl:justify-between'
                // eslint-disable-next-line react/jsx-handler-names
                  onValueChange={field.onChange} defaultValue={field.value}
                >
                  {genderOptions.map((option) => (
                    <div key={option} className='radio-group'>
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className='cursor-pointer'>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        {/* <section className='space-y-6'>
          <p className='sub-header'>Información de tu mascota</p>
        </section> */}

        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control as any}
            fieldType={FormFieldType.INPUT}
            name='address'
            label='Dirección'
            placeholder='Ej: Cl 123 # 45-67'
          />
          <CustomFormField
            control={form.control as any}
            fieldType={FormFieldType.INPUT}
            name='occupation'
            label='Ocupación'
            placeholder='Ej: Abogado/independiente'
          />
        </div>

        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control as any}
            fieldType={FormFieldType.INPUT}
            name='emergencyContactName'
            label='Contacto de emergencia'
            placeholder='Nombre completo'
          />

          <CustomFormField
            control={form.control as any}
            fieldType={FormFieldType.PHONE_INPUT}
            name='emergencyContactNumber'
            label='Número del contacto'
          />
        </div>

        <div className='flex flex-col gap-6 xl:flex-row' />

        <SubmitButton isLoading={isLoading}>Ingresa</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
