const { v4: uuIdV4 } = require("uuid")

class Tarea {
    id = "";
    descripcion = "";
    completadoEn = null;

    constructor(descripcion) {
        this.descripcion = descripcion;
        this.id = uuIdV4();
    }


}


module.exports = Tarea;