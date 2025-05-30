import { process } from "./process.js";
// === Helper functions ===

function base64ToUint8Array(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
}

function uint8ArrayToBase64(bytes) {
    return btoa(String.fromCharCode(...bytes));
}

// === Core logic ===

const ENV_FILE_PATH = ".env";
const ENV_KEY_NAME = "JWT_SECRET_KEY";

let base64Key;

// Step 1: Try to read .env file and get key
let lines = [];
try {
    const content = await Deno.readTextFile(ENV_FILE_PATH);
    lines = content.split("\n");
    for (const line of lines) {
        if (line.startsWith(`${ENV_KEY_NAME}=`)) {
            base64Key = line.split("=")[1];
            break;
        }
    }
} catch {
    lines = [];
}

// Step 2: If no key, generate a new one and write to .env
if (!base64Key) {
    const newKey = await crypto.subtle.generateKey(
        { name: "HMAC", hash: "SHA-256" },
        true,
        ["sign", "verify"],
    );

    const raw = await crypto.subtle.exportKey("raw", newKey);
    base64Key = uint8ArrayToBase64(new Uint8Array(raw));

    lines.push(`${ENV_KEY_NAME}=${base64Key}`);
    await Deno.writeTextFile(ENV_FILE_PATH, lines.join("\n"));
}

// Step 3: Import final key for use
const imported_base64Key = process.env.JWT_SECRET_KEY

const imported_rawKey = base64ToUint8Array(imported_base64Key);
export const key = await crypto.subtle.importKey(
    "raw",
    imported_rawKey,
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign", "verify"],
);
