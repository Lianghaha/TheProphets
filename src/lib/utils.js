import CryptoJS from "crypto-js"

export const utils = {
   //Can encrypt both String and Object
   encrypt(data) {
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
   },
}
