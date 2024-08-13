import { z } from 'zod'

export const UserFormValidation = z.object({
  name: z.string()
    .min(8, {
      message: 'El usuario debe tener al menos 8 caracteres'
    })
    .max(50, {
      message: 'El usuario no puede tener más de 50 caracteres'
    }),
  email: z.string().email('Dirección de correo electrónico inválida'),
  phone: z.string().refine((phone) => /^\+?[1-9]\d{1,14}$/.test(phone), 'Número de teléfono inválido')
})
