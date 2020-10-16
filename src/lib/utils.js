import CryptoJS from "crypto-js"

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
      localStorage.setItem("identity", email)
      localStorage.setItem("username", username)
      localStorage.setItem("token", token)
   }

   export const checkLogin = () => {
      //TODO 发送请求确认token有没过期，if没过期 return true
      return localStorage.getItem("token")
   }

   export const getCurrentTime = () => {
      let d = new Date()
      let timeNumeric = d.getTime()
      let timeReadable = `${d.getFullYear()}/${
         d.getMonth() + 1
      }/${d.getDate()} @ ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
      return { timeNumeric, timeReadable }
   }


