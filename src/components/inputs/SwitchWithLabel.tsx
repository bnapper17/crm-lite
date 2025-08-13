"use client"

import { useFormContext } from "react-hook-form"

import { 
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form"

import { Switch } from "@/components/ui/switch"

type Props<S> = {
    fieldTitle: string,
    nameInSchema: keyof S & string,
    disabled?: boolean
    className?: string
    isActive?: boolean
}


export function SwitchWithLabel<S>({
    fieldTitle, nameInSchema, className, disabled = false, isActive = true
}: Props<S>) {
    const form = useFormContext()
    
    return (
        <FormField
            control = {form.control}
            name = {nameInSchema}
            render = {({field}) => (
                <FormItem className={className}>
                    <FormLabel
                        htmlFor={nameInSchema}
                        >
                            {fieldTitle}
                    </FormLabel>

                    <FormControl>
                        <Switch
                            id={nameInSchema}
                            {...field}
                            checked={isActive ? false : field.value}
                            onCheckedChange={field.onChange}
                            disabled={disabled}
                            className="border-gray-700 "
                            />
                    </FormControl>                  
                </FormItem>

            )}
        />
    )
}