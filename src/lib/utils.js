import CryptoJS from "crypto-js"
import axios from "axios"

//Can encrypt both String and Object
export const encrypt = (str) => {
   const encrypted = CryptoJS.AES.encrypt(
      str,
      process.env.REACT_APP_SECRET
   ).toString()
   // const decrypt = CryptoJS.AES.decrypt(encrypted, process.env.REACT_APP_SECRET)
   // console.log("Encrypted: " + encrypted)
   // console.log("Decrypted: " + decrypt.toString(CryptoJS.enc.Utf8))
   return encrypted
}

export const getCurrentTime = () => {
   let d = new Date()
   let timeNumeric = d.getTime()
   let timeReadable = `${d.getFullYear()}/${
      d.getMonth() + 1
   }/${d.getDate()} @ ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
   return { timeNumeric, timeReadable }
}

export const parseCookie = () => {
   // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
   // document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
   // console.log(document.cookie)
   if (document.cookie) {
      const str = document.cookie.split(";")
      // console.log(str)
      var result = {}
      for (var i = 0; i < str.length; i++) {
         var cur = str[i].split("=")
         result[cur[0]] = cur[1]
      }
      return result
   }
   return false
}

export const clearCookieLocalStorage = () => {
   console.log("=============== clearCookieLocalStorage ===============")
   console.log("Cookie Before: " + document.cookie)
   const str = document.cookie.split(";")
   // console.log(str)
   for (var i = 0; i < str.length; i++) {
      const cur = str[i].split("=")
      const key = cur[0]
      document.cookie = key + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
      document.cookie =
         key.trim() + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
      // console.log(key)
   }
   localStorage.clear()
   console.log("Cookie After: " + document.cookie)
}

export const setCookieLocalStorage = (email, username, token, profile_img) => {
   document.cookie = `identity=${email};path=/`
   document.cookie = `username=${username};path=/`
   document.cookie = `token=${token};path=/`
   document.cookie = `profile_img=${profile_img};path=/`
   localStorage.setItem("identity", email)
   localStorage.setItem("username", username)
   localStorage.setItem("token", token)
   localStorage.setItem("profile_img", profile_img)
   console.log("=============== setCookieLocalStorage ===============")
   console.log("Cookie After: " + document.cookie)
}

export const checkLogin = async () => {
   const identity = localStorage.getItem("identity")
   const token = localStorage.getItem("token")
   let flag = false
   if (token) {
      await axios
         .post(`/api/check_token`, {
            identity: identity,
            token: token,
         })
         .then((response) => {
            console.log("=============== checkLogin ===============")
            console.log(response)
            if (response.data.status === 0) flag = true
            else {
               clearCookieLocalStorage()
            }
         })
         .catch((err) => console.log(err))
   }
   return flag
}
