const fs = require("fs");
const fsp = fs.promises;
const write = async (json) => {
  await fsp.writeFile(
    "./App/file/answer.json",
    JSON.stringify(json)
  )

};
const getArq = async () => {
  return fs.createReadStream("./App/file/answer.json");

};

module.exports = { write, getArq };