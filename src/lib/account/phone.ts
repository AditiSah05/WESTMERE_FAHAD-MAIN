/** Mobile number as typed: optional +, 8-15 digits, spaces and dashes allowed. */
export const PHONE = /^\+?\d[\d\s-]{6,18}\d$/
export const phoneOk = (v: string) => PHONE.test(v) && v.replace(/\D/g, '').length <= 15
