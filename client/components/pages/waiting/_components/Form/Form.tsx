'use client';

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormDataProps } from '@/components/shared/Header';

import FormField from './components/FormField';
import { WaitingListFormData } from './types/form'

interface FormProps {
    data?: FormDataProps
}

const schema = z
    .object({
        email: z.string().email(),
    })
    .required()

export default function Form(props: FormProps) {
    const { data } = props
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<WaitingListFormData>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data: WaitingListFormData) => {
        console.log('SUCCESS', data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
                type="email"
                placeholder={data?.placeholder ?? ''}
                name="email"
                register={register}
                error={errors.email}
            />
            <input type="submit" value={data?.buttonText} />
        </form>
    )
}
