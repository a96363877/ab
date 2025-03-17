"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Country codes data
const countryCodes = [
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { code: "KW", name: "Kuwait", dialCode: "+965", flag: "🇰🇼" },
  { code: "QA", name: "Qatar", dialCode: "+974", flag: "🇶🇦" },
  { code: "BH", name: "Bahrain", dialCode: "+973", flag: "🇧🇭" },
  { code: "OM", name: "Oman", dialCode: "+968", flag: "🇴🇲" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { code: "JO", name: "Jordan", dialCode: "+962", flag: "🇯🇴" },
  { code: "LB", name: "Lebanon", dialCode: "+961", flag: "🇱🇧" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "PK", name: "Pakistan", dialCode: "+92", flag: "🇵🇰" },
]

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  onCountryChange?: (country: string) => void
  label?: string
  required?: boolean
  className?: string
  placeholder?: string
  defaultCountry?: string
}

export function PhoneInput({
  value,
  onChange,
  onCountryChange,
  required = false,
  className,
  placeholder = "أدخل رقم الهاتف",
  defaultCountry = "AE",
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry)
  const [phoneNumber, setPhoneNumber] = useState("")

  // Initialize phone number and country code from value
  useEffect(() => {
    if (value) {
      // Try to extract country code and number
      const country = countryCodes.find((c) => value.startsWith(c.dialCode))
      if (country) {
        setSelectedCountry(country.code)
        setPhoneNumber(value.substring(country.dialCode.length))
      } else {
        setPhoneNumber(value)
      }
    }
  }, [])

  // Update the combined value when either part changes
  const handleCountryChange = (code: string) => {
    setSelectedCountry(code)
    const country = countryCodes.find((c) => c.code === code)
    if (country) {
      const newValue = `${country.dialCode}${phoneNumber}`
      onChange(newValue)
      if (onCountryChange) onCountryChange(code)
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value
    setPhoneNumber(newPhoneNumber)

    const country = countryCodes.find((c) => c.code === selectedCountry)
    if (country) {
      const newValue = `${country.dialCode}${newPhoneNumber}`
      onChange(newValue)
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex">
        <Select value={selectedCountry} onValueChange={handleCountryChange}>
          <SelectTrigger className="h-14 w-1/3 rounded-r-none border-l-0 bg-white">
            <SelectValue placeholder="Country">
              {countryCodes.find((c) => c.code === selectedCountry)?.flag}{" "}
              {countryCodes.find((c) => c.code === selectedCountry)?.dialCode}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {countryCodes.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <span className="flex items-center">
                  <span className="mr-2">{country.flag}</span>
                  <span>{country.name}</span>
                  <span className="ml-auto text-muted-foreground">{country.dialCode}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          id="phone"
          type="tel"
          value={phoneNumber}
          maxLength={10}
          onChange={handlePhoneChange}
          className="rounded-l-none h-14 w-[290px] bg-white"
          placeholder={placeholder}
          required={required}
          dir="ltr"
        />
      </div>
    </div>
  )
}

