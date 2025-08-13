"use client"

import { useFormContext } from "react-hook-form"

import { 
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

type Props<S> = {
    fieldTitle: string,
    nameInSchema: keyof S & string,
    message: string,
    disabled?: boolean
    className?: string
}


export function CheckboxWithLabel<S>({
    fieldTitle,message, nameInSchema, disabled = false, className
}: Props<S>) {
    const form = useFormContext()
    
    return (
        <FormField
            control = {form.control}
            name = {nameInSchema}
            render = {({field}) => (
                <FormItem >
                    <FormLabel
                        className="hidden"
                        htmlFor={nameInSchema}
                        >
                            {fieldTitle}
                        </FormLabel>

                    <div className={`flex justify-between items-center gap-4 ${className}`}>
                        <FormControl>
                            <Checkbox
                                id={nameInSchema}
                                {...field}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={disabled}
                                className="h-6 w-6 border-gray-700 cursor-pointer"
                                />
                        </FormControl>

                        <p className="text-xl text-two">{message}</p>

                    </div>

                    <FormMessage />
                    
                </FormItem>

            )}
        />
    )
}