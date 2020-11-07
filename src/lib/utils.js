import CryptoJS from "crypto-js"
import axios from "axios"

export const encrypt = (str) => {
   const encrypted = CryptoJS.AES.encrypt(
      str,
      process.env.REACT_APP_SECRET
   ).toString()
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
   // console.log("=============== clearCookieLocalStorage ===============")
   // console.log("Cookie Before: " + document.cookie)
   const str = document.cookie.split(";")
   for (var i = 0; i < str.length; i++) {
      const cur = str[i].split("=")
      const key = cur[0]
      document.cookie = key + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
      document.cookie =
         key.trim() + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
   }
   localStorage.clear()
   // console.log("Cookie After: " + document.cookie)
}

export const setCookieLocalStorage = (
   identity,
   username,
   token,
   profile_img
) => {
   document.cookie = `identity=${identity};path=/`
   document.cookie = `username=${username};path=/`
   document.cookie = `token=${token};path=/`
   document.cookie = `profile_img=${profile_img};path=/`
   localStorage.setItem("identity", identity)
   localStorage.setItem("username", username)
   localStorage.setItem("token", token)
   localStorage.setItem("profile_img", profile_img)
   // console.log("=============== setCookieLocalStorage ===============")
   // console.log("Cookie After: " + document.cookie)
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
            // console.log("=============== checkLogin ===============")
            // console.log(response)
            if (response.data.status === 0) flag = true
            else {
               clearCookieLocalStorage()
            }
         })
         .catch((err) => console.log(err))
   }
   return flag
}

export const responseGoogle = async (response) => {
   // console.log("=============== Login responseGoogle ===============")
   if (response.error) {
      console.log("responseGoogle error: " + response.error)
      return false
   }
   let flag = false
   await axios
      .post("/api/google_login", {
         tokenID: response.tokenId,
      })
      .then((response) => {
         // console.log("responeGoogle Response: ")
         // console.log(response.data)
         const data = response.data
         const { userInfo } = data
         if (data.status === 0) {
            setCookieLocalStorage(
               userInfo.googleAcID.toString(),
               userInfo.username,
               data.tokenRequest.token,
               userInfo.profile_img
            )
            flag = true
         } else {
            alert(data.message)
         }
      })
      .catch((err) => console.log(err))
   return flag
}
