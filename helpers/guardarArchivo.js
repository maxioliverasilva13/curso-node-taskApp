const fs = require("fs")
const archivo = "./database/data.json"

const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data) || "")
}

const leerDB = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    } else {
        const data = fs.readFileSync(archivo, { encoding: "utf-8" })
        return JSON.parse(data || "[]")
    }
}


module.exports = {
    guardarDB,
    leerDB
}