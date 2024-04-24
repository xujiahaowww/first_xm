import CryptoJS, { SHA1, MD5 } from 'crypto-js'
import { sm4Encrypt, sm4Decrypt } from './sm4'

export const sha1 = msg => SHA1(msg).toString()

export const md5 = msg => MD5(msg).toString()

export const aesEncrypt = (word, aeskey) => {
  const _key = aeskey.substring(0, 16)
  const key = CryptoJS.enc.Utf8.parse(_key)
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: CryptoJS.enc.Utf8.parse('A-16-Byte-String'),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  return encrypted.toString()
}

export const aesDecrypt = (word, aeskey) => {
  const _key = aeskey.substring(0, 16)
  const key = CryptoJS.enc.Utf8.parse(_key)
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    iv: CryptoJS.enc.Utf8.parse('A-16-Byte-String'),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

export { sm4Encrypt, sm4Decrypt }
