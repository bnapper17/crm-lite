"use client"

import { InputWithLabel } from "@/components/inputs/inputWithLabel"
import { TextAreaWithLabel } from "@/components/inputs/TextareaWithLabel"


export default function ClientFields() {
      
    return (
        <div>
            <div className="flex gap-4">
                <InputWithLabel
                    fieldTitle="First Name"
                    nameInSchema="firstName"
                    />
                <InputWithLabel
                    fieldTitle="Last Name"
                    nameInSchema="lastName"
                    />
            </div>
            <InputWithLabel
                fieldTitle="Street Address"
                nameInSchema="address1"
                />
            <div className = "flex gap-4">
                <InputWithLabel
                    fieldTitle="City"
                    nameInSchema="city"
                    />
                <InputWithLabel
                    fieldTitle="State"
                    nameInSchema="state"
                    />
                <InputWithLabel
                    fieldTitle="Zip"
                    nameInSchema="zip"
                    />
            </div>
            <div className = "flex gap-4">
                <InputWithLabel
                    fieldTitle="Phone"
                    nameInSchema="phone"
                    />
                <InputWithLabel
                    fieldTitle="email"
                    nameInSchema="email"
                    />
            </div>
            <TextAreaWithLabel
                fieldTitle="Notes"
                nameInSchema="notes"
                />
        </div>
    )
}
