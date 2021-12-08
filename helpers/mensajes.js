require("colors");


const mostrarMenu = () => {
    return new Promise((resolve) => {
        console.clear();
        console.log("===========================".green)
        console.log("  Seleccione una opcion  ".green)
        console.log("===========================\n".green)

        console.log(`Crear una tarea`);
        console.log(`Listar tareas`);
        console.log(`Listar tareas completadas`);
        console.log(`Listar tareas pendientes`);
        console.log(`Completar tareas`);
        console.log(`Borrar tareas`);
        console.log(`Salir \n`);

        const readLine = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        })
        readLine.question('Seleccione una opcion: ', (opt) => {
            readLine.close()
            resolve(opt);
        })
    })
}

const pausa = () => {

    return new Promise((resolve) => {
        const readLine = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        })
        readLine.question(`\nPresione ${"ENTER".green}: para continuar `, (opt) => {
            readLine.close()
            resolve();
        })
    })


}

module.exports = {
    mostrarMenu,
    pausa
}