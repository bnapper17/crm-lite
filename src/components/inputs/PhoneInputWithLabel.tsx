"use client"

import { useFormContext } from "react-hook-form"

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { InputHTMLAttributes } from "react"
import { PatternFormat } from "react-number-format"

type Props<S> = {
    fieldTitle: string,
    nameInSchema: keyof S & string,
    className?: string,
} & InputHTMLAttributes<HTMLInputElement> 

export function PhoneInputWithLabel<S> ({
    fieldTitle, nameInSchema, className
}: Props<S>) {
    const form = useFormContext()

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem>
                    <FormLabel
                        className="text-2xl xl:text-xl text-two"
                        htmlFor={nameInSchema}
                    >
                        {fieldTitle}
                    </FormLabel>

                    <FormControl>
                        <PatternFormat 
                        type="text"
                        format="###-###-####"
                        id={nameInSchema}
                        className={`file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-xl
                        focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
                        aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border-gray-700 mb-2 ${className}`} 
                        {...field}/>
                    </FormControl>

                    <FormMessage />

                </FormItem>
            )}
        />
    )
}