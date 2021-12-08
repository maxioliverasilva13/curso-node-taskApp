const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const { inquirerMenu, inquirerPause, leerInput, listadoTareasBorrar, confirmar, listarPendientesCompletadas } = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

require("colors");

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasfromArray(tareasDB)
    }
    do {
        opt = await inquirerMenu()


        switch (opt) {
            case "1":
                const { desc } = await leerInput("Ingrese una descripcion:");
                tareas.crearTarea(desc);

                break;
            case "2":
                tareas.listadoCompleto();
                break;
            case "3":
                tareas.listarPendientesCompletadas(false);
                break;
            case "4":
                tareas.listarPendientesCompletadas(true);
                break;
            case "5":
                const ids = await listarPendientesCompletadas(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case "6":
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id != 0) {
                    const ok = await confirmar("Estas seguro?");
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log("Tarea Borrada Correctamente")
                    }
                }

                break;
        }

        await inquirerPause();

        guardarDB(tareas.listadoArr)




    } while (opt !== "0");

    /* pausa(); */
}

main();