async function hashPw(password) {
    const data = new TextEncoder().encode(password) //utf-8
    const pwHashBuffer = await crypto.subtle.digest('SHA-256', data) //hashed → arrayBuffer 
    const pwHashArray = Array.from(new Uint8Array(pwHashBuffer)) //byte array
    const pwHashHex =  pwHashArray.map(((byte) => byte.toString(16).padStart(2, '0'))).join('')
    return pwHashHex
}

export default hashPw;