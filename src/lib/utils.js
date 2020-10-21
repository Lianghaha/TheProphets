import CryptoJS from "crypto-js"
import axios from "axios"

//Can encrypt both String and Object
export const encrypt = (str) => {
   const encrypted = CryptoJS.AES.encrypt(str, process.env.REACT_APP_SECRET).toString()
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
   const str = document.cookie.split(";")
   // console.log(str)
   for (var i = 0; i < str.length; i++) {
      var cur = str[i].split("=")
      document.cookie = cur[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
   }
   localStorage.clear()
}

export const setCookieLocalStorage = (email, username, token) => {
   document.cookie = `identity=${email}`
   document.cookie = `username=${username}`
   document.cookie = `token=${token}`
   // console.log("setCookieLocalStorage Token:"token)
   localStorage.setItem("identity", email)
   localStorage.setItem("username", username)
   localStorage.setItem("token", token)
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
            console.log("checkLogin: ")
            console.log(response.data)
            if (response.data.status === 0) flag = true
            else {
               clearCookieLocalStorage()
            }
         })
         .catch((err) => console.log(err))
   }
   return flag
}
