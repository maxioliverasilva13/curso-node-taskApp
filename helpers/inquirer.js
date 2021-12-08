const inquirer = require('inquirer');
require("colors");

const questions = [
    {
        type: "list",
        name: "opcion",
        message: "Que desea hacer?",
        choices: [
            {
                value: "1",
                name: `${"1".green}. Crear una tarea`,
            },
            {
                value: "2",
                name: `${"2".green}. Listar tareas`,
            },
            {
                value: "3",
                name: `${"3".green}. Listar tareas completadas`,
            },
            {
                value: "4",
                name: `${"4".green}. Listar tareas pendientes`,
            },
            {
                value: "5",
                name: `${"5".green}. Completar tareas`,
            },
            {
                value: "6",
                name: `${"6".green}. Borrar tareas`,
            },
            {
                value: "0",
                name: `${"0".green}. Salir`,
            },
        ]
    }
]



const pause = [
    {
        type: "input",
        name: "input",
        message: "Precione enter para continuar",
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log("===========================".green);
    console.log("  Seleccione una opcion  ".white);
    console.log("===========================\n".green);

    const { opcion } = await inquirer.prompt(questions);
    return opcion;
}


const inquirerPause = async () => {
    console.log("")
    const opt = await inquirer.prompt(pause);
    return opt;
}

const leerInput = async (message) => {

    const question = [
        {
            type: "input",
            name: "desc",
            message,
            validate(value) {
                if (value?.length === 0) {
                    return "Ingrese un valor obligatorio"
                } else {
                    return true;
                }
            }
        }
    ]
    const { desc } = await inquirer.prompt(question);
    return { desc };
}



const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        return {
            value: tarea.id,
            name: `${`${i + 1}`.green}. ${tarea.descripcion}`,
        }
    })
    choices.unshift({
        value: 0,
        name: `${`${0}`.green}. Cancelar`,
    })
    console.log("")
    const questionBorrar = {
        type: "list",
        name: "tareaId",
        message: "Indique la tarea a borrar?",
        choices,
    }

    const { tareaId } = await inquirer.prompt(questionBorrar);
    return tareaId;
}



const listarPendientesCompletadas = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        return {
            value: tarea.id,
            name: `${`${i + 1}`.green}. ${tarea.descripcion}`,
            checked: (tarea.completadoEn != null) ? true : false
        }
    })
    console.log("")
    const pregunta = {
        type: "checkbox",
        name: "ids",
        message: "Seleccione",
        choices,
    }

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}



const confirmar = async (message) => {
    const question = [
        {
            type: "confirm",
            name: "ok",
            message
        }
    ]
    const { ok } = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    inquirerMenu,
    inquirerPause,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    listarPendientesCompletadas
}