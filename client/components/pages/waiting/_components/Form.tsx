"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { IWaitingListForm } from "@/types/waitingList"

interface WaitingListFormProps {
  data: IWaitingListForm
}

const formSchema = z.object({
  email: z.string().email({
    message: "This is not a valid mail address.",
  }),
})

export function WaitingListForm(props: WaitingListFormProps) {
  const { buttonText, placeholder } = props.data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    fetch('/api/waiting-list', {
      method: 'POST',
      body: JSON.stringify(values),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-center gap-2 container">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="w-[400px]" placeholder={placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="border mt-0 space">{buttonText}</Button>
      </form>
    </Form>
  )
}
