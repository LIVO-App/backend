const cryptoJs = require('crypto-js');

/*var JsonFormatter = {
    stringify: function(cipherParams) {
      // create json object with ciphertext
      var jsonObj = { ct: cipherParams.ciphertext.toString(cryptoJs.enc.Base64url) };
      // optionally add iv or salt
      if (cipherParams.iv) {
        jsonObj.iv = cipherParams.iv.toString();
      }
      if (cipherParams.salt) {
        jsonObj.s = cipherParams.salt.toString();
      }
      // stringify json object
      //console.log(JSON.stringify(jsonObj));
      return JSON.stringify(jsonObj);
    },
    parse: function(jsonStr) {
      // parse json string
      var jsonObj = JSON.parse(jsonStr);
      // extract ciphertext from json object, and create cipher params object
      var cipherParams = cryptoJs.lib.CipherParams.create({
        ciphertext: cryptoJs.enc.Base64url.parse(jsonObj.ct)
      });
      // optionally extract iv or salt
      if (jsonObj.iv) {
        cipherParams.iv = cryptoJs.enc.Hex.parse(jsonObj.iv);
      }
      if (jsonObj.s) {
        cipherParams.salt = cryptoJs.enc.Hex.parse(jsonObj.s);
      }
      return cipherParams;
    }
  };*/

function cipher(str){
    var ciphertext = cryptoJs.AES.encrypt(str, process.env.DB_SUPER_SECRET/*,{
        format: JsonFormatter
    }*/);
    //console.log("IN ENCRYPT");
    //console.log(ciphertext);
    return ciphertext;
}

function decipher(str){

    var decrypted = cryptoJs.AES.decrypt(str, process.env.DB_SUPER_SECRET/*,{format: JsonFormatter}*/);
    //console.log("DATA DECRYPTED");
    //console.log(decrypted);
    var originalText = decrypted.toString(cryptoJs.enc.Utf8);
    //console.log("REAL DATA");
    //console.log(originalText);
    return originalText;
}

function encrypt_password(str){
    var encrypted = cryptoJs.SHA256(str);
    return encrypted;
}

/*txt = cipher("NZZFDR82M63L649S");
console.log("Codice Fiscale: "+txt.toString());
text = decipher(txt.toString());
//text = decipher("0xd150986669fada97d8b78cf00b1b4de2");
console.log(text);
txt2 = cipher("23/08/1982");
//console.log(decipher("U2FsdGVkX1+53h4iPaTwOlGAMQeF2aisy3ZiI1uUu24="));
console.log("Data Nascita: "+txt2.toString());
console.log(decipher(txt2));
txt3 = cipher("Via Milano, 315, Valsecca (BG)");
console.log("Indirizzo: "+txt3);
console.log(decipher(txt3));
//console.log("CIPHER");
//console.log(cipher(text));

psw = encrypt_password("Password");
console.log("Password = "+psw);*/
module.exports = {cipher, decipher, encrypt_password};