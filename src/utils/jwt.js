import { create, verify,getNumericDate } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

export const jwt = {
    sign: async (payloadData, secretOrPrivateKey, options) => {
        const header = { alg: "HS256", typ: "JWT" };
        const expiresIn  = +options.expiresIn
        const tokenExpiryDate = getNumericDate(60 * 60 * expiresIn)
        const payload = { ...payloadData,"exp":tokenExpiryDate}
        const token = await create(header,payload,secretOrPrivateKey)
        return token
    },
    verify: async (token,key) => {
        const payload = await verify(token, key, "HS256");
        return payload
    }
}