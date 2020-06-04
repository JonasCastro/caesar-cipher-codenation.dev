const fileManager = require("./file/fileManager");
const crypto = require("./crypto");
const api = require("./services/api");
var FormData = require('form-data');
require('dotenv').config()

async function generateData() {
  try {
    var response = await api.get(`/generate-data?token=${process.env.TOKEN}`)
    return response.data
  } catch (error) {
    console.log(error);
  }

}
async function submitSolution() {
  var formData = new FormData();
  formData.append('answer', await fileManager.getArq());

  const response = await api.post(`/submit-solution?token=${process.env.TOKEN}`,
    formData, { headers: formData.getHeaders() }
  );
  console.log(response.data);

}
async function App() {
  var answer = await generateData();
  const decifrado = crypto.decipher(answer.cifrado, answer.numero_casas);
  answer.decifrado = decifrado;
  answer.resumo_criptografico = crypto.hashSha1(decifrado)

  await fileManager.write(answer)

  await submitSolution()
}

App();
