"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@sanity/ui"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { IWaitingListForm } from "@/types/waitingList"

import { StatusCode } from "../_helpers/status"


interface WaitingListFormProps {
  data: IWaitingListForm
}

const formSchema = z.object({
  email: z.string().email({
    message: "This is not a valid mail address.",
  }),
})

export function WaitingListForm(props: WaitingListFormProps) {
  const { buttonText, placeholder, successMessage, errorMessageEmailAlreadyExists, errorMessageOther } = props.data

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      },
  })
      
  const { toast } = useToast()
  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch('/api/waiting-list', {
        method: 'POST',
        body: JSON.stringify({ email }),
      })

      if(response.status === StatusCode.SUCCESS) {
        toast({
          title: "Success",
          description: successMessage,
        })
      }

      if(response.status === StatusCode.EMAILEXISTS) {
        toast({
          title: "Error",
          description: errorMessageEmailAlreadyExists,
          variant: "destructive",
        })
      }

      if(response.status === StatusCode.FAILED) {
        toast({
          title: "Error",
          description: errorMessageOther,
          variant: "destructive",
        })
      }

      return response
    }
  })

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(() => mutation.mutate(form.getValues().email))}
        className="flex flex-col md:flex-row md:justify-center gap-2 container"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="sr-only !mb-0">Email</FormLabel>
              <FormControl>
                <Input className="md:w-[400px]" placeholder={placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit"
          className="border mt-0 space hover:bg-black hover:text-white transition-colors"
          disabled={mutation.isPending}
        >
          {buttonText}
        </Button>
      </form>
    </Form>
  )
}
