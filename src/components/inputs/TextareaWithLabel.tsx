"use client"

import { useFormContext } from "react-hook-form"

import { 
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Textarea} from "@/components/ui/textarea"
import { TextareaHTMLAttributes } from "react"

type Props<S> = {
    fieldTitle: string,
    nameInSchema: keyof S & string,
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextAreaWithLabel<S>({
    fieldTitle, nameInSchema, ...props
}: Props<S>) {
    const form = useFormContext()

    return (
        <FormField
            control = {form.control}
            name = {nameInSchema}
            render = {({field}) => (
                <FormItem>
                    <FormLabel
                        className="text-2xl xl:text-xl text-two"
                        htmlFor={nameInSchema}
                        >
                            {fieldTitle}
                        </FormLabel>

                    <FormControl>
                        <Textarea
                            id={nameInSchema}
                            {...props}
                            {...field}
                            className="border-gray-700 mb-4 h-20"
                        />
                    </FormControl>

                    <FormMessage />
                    
                </FormItem>

            )}
        />
    )
}