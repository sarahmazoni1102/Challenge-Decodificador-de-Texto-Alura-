const textareaContent = document.querySelector("textarea")
const buttonEncrypt = document.getElementById("codificar")
const buttonDecrypt = document.getElementById("decodificar")
const textCopyArea = document.querySelector("aside")

var listTextsEncrypt = []
var listKeys = []
let count=0;

const inputTextCopy = document.createElement("div")
const buttonCopy = document.createElement("button")

buttonEncrypt.addEventListener('click', function(event){
  event.preventDefault()
  CreateElementsAndAtributtes()

  const message = textareaContent.value
  const key = crypto.randomUUID()
  const iv = CryptoJS.lib.WordArray.random(16);
  const textEncrypt = CryptoJS.AES.encrypt(message, key, {iv:iv}).toString();
  console.log("Texto criptografado: " + textEncrypt);
  listTextsEncrypt.push(textEncrypt)
  listKeys.push(key)
  count++;
  inputTextCopy.innerText = textEncrypt;
})

buttonDecrypt.addEventListener('click', function(event){
  event.preventDefault();
  CreateElementsAndAtributtes()

  const message = textareaContent.value
  for(var i=0; i<listTextsEncrypt.length; i++){
    if(message == listTextsEncrypt[i]){
      var key = listKeys[i];
      var textEncrypted = listTextsEncrypt[i];
      break; 
    }
  }
  const iv = CryptoJS.lib.WordArray.random(16);
  const textDecrypt = CryptoJS.AES.decrypt(textEncrypted, key, {iv:iv}).toString(CryptoJS.enc.Utf8);
  console.log("Texto descriptografado: " + textDecrypt)
  inputTextCopy.innerText = textDecrypt;
})

function CreateElementsAndAtributtes(){

  inputTextCopy.id = "input-text-copy"
  buttonCopy.id = "button-copy"

  buttonCopy.innerText= "Copiar"
  textCopyArea.innerHTML = ``

  textCopyArea.appendChild(inputTextCopy);
  textCopyArea.appendChild(buttonCopy)
}

buttonCopy.addEventListener('click', function(){
  var copyText = document.createRange();
  copyText.selectNode(inputTextCopy)
  window.getSelection().removeAllRanges()
  window.getSelection().addRange(copyText)
  document.execCommand("copy")
  alert("Texto copiado!")
  window.getSelection().removeAllRanges()
})

textareaContent.addEventListener("change", function(){
  var text = this.value.replace(/\n/g, '')
  this.value = text
})
