import CryptoJS from "crypto-js"
import axios from "axios"


//Can encrypt both String and Object
export const encrypt = (data) => {
   let JSONData = JSON.stringify(data)
   let encryptedData = CryptoJS.AES.encrypt(
      JSONData,
      process.env.REACT_APP_SECRET
   ).toString()
   //Base64 processing is required to clear "malformed utf-8 data" error
   let Base64Data = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(encryptedData)
   )
   return Base64Data
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
   console.log(token)
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

export const getCurrentTime = () => {
   let d = new Date()
   let timeNumeric = d.getTime()
   let timeReadable = `${d.getFullYear()}/${
      d.getMonth() + 1
   }/${d.getDate()} @ ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
   return { timeNumeric, timeReadable }
}

