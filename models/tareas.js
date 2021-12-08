const { v4: uuIdV4 } = require("uuid");
const { leerDB } = require("../helpers/guardarArchivo");
const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    constructor(descripcion) {
        this._listado = {};
    }

    crearTarea(desc = "") {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasfromArray = (tareas = []) => {
        tareas.forEach((item) => {
            this._listado[item?.id] = item;
        })
    }

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado)?.forEach((key) => {
            listado.push(
                this._listado[key]
            )
        })
        return listado;
    }

    listadoCompleto(listado = this.listadoArr) {
        console.log("")

        listado.forEach(({ descripcion, completadoEn }, i) => {
            const completada = completadoEn ? `Completada`.green : `Pendiente`.red
            console.log(`${i}. ${descripcion} :: ${completada} `)
        })
    }

    listarPendientesCompletadas(completadas = true) {
        console.log("")
        const listado = this.listadoArr;
        this.listadoCompleto(listado.filter(({ completadoEn }) => (completadoEn == null) == completadas))
    }

    borrarTarea(id = "") {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }
    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }


}


module.exports = Tareas;