import { hash, compare } from "https://deno.land/x/bcrypt/mod.ts";

export const bcrypt = {
    hash: async (value) => {
        const hashedValue = await hash(value)
        return hashedValue
    },
    compare: async (value1, value2) => {
        const isMatched = await compare(value1, value2)
        return isMatched
    }
}