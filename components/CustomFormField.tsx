'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control } from 'react-hook-form'
import { FormFieldType } from './forms/OwnerForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { es } from 'date-fns/locale/es'

registerLocale('es', es)

interface FormData {
  name: string
  email: string
  phone: string
  birthDate: string
  gender: string
  address: string
  occupation: string
  emergencyContactName: string
  emergencyContactNumber: string
}

interface CustomProps {
  control: Control<FormData>
  fieldType: FormFieldType
  name: keyof FormData
  label?: string
  placeholder?: string
  iconSrc?: string
  iconAlt?: string
  disabled?: boolean
  dateFromat?: string
  showTimeSelect?: boolean
  children?: React.ReactNode
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any, props: CustomProps }): React.ReactNode => {
  if (field === undefined) return null

  const { fieldType, iconAlt = '', iconSrc = '', placeholder = '', showTimeSelect, dateFromat, renderSkeleton } = props
  const { onChange: handleChange, ...restField } = field

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          {iconSrc !== '' && iconAlt !== '' && (
            <Image
              src={iconSrc}
              alt={iconAlt}
              height={24}
              width={24}
              className='ml-2'
            />
          )}
          <FormControl>
            <Input placeholder={placeholder} {...field} className='shad-input border-0' />
          </FormControl>
        </div>
      )

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry='CO'
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={restField.value}
            onChange={handleChange}
            className='input-phone'
          />
        </FormControl>
      )

    case FormFieldType.DATE_PICKER:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          <Image
            src='/assets/icons/calendar.svg'
            alt='calendar'
            height={24}
            width={24}
            className='ml-2'
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFromat !== undefined ? dateFromat : 'dd/MM/yyyy'}
              showTimeSelect={showTimeSelect !== undefined ? showTimeSelect : false}
              timeInputLabel='Hora:'
              wrapperClassName='date-picker'
              locale={es}
            />
          </FormControl>
        </div>
      )

    case FormFieldType.SKELETON:
      return renderSkeleton !== undefined ? renderSkeleton(field) : null
    default:
      return null
  }
}

const CustomFormField = (props: CustomProps): React.ReactNode => {
  const { control, fieldType, name, label } = props
  if (label === undefined) return null
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {fieldType !== FormFieldType.CHECKBOX && label !== '' && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className='shad-error' />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
