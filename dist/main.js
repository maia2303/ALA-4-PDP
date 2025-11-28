"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const gestionTareas_1 = require("./utils/gestionTareas");
const prompt = (0, prompt_sync_1.default)();
const imprimirTarea = (t) => {
    console.log(`[ID: ${t.id}] ${t.titulo} `);
};
const mostrarDetalles = (t) => {
    const dificultadEstrella = "★".repeat(t.dificultad) + "☆".repeat(3 - t.dificultad);
    console.log(`
    ID: ${t.id} \n
    Título: ${t.titulo}\n
    Descripción: ${t.descripcion}\n
    Dificultad: ${t.dificultad} - ${dificultadEstrella}\n
    Estado: ${t.estado}\n
    Vencimiento: ${t.vencimiento}\n
    Creación: ${t.creacion}\n
    Última edición: ${t.ultimaEdicion}`);
};
const menuAgregar = (listaActual) => {
    console.log("---NUEVA TAREA---");
    let titulo = "";
    while (titulo.trim() === "") {
        titulo = prompt("Título: ");
    }
    const descripcion = prompt("Descripción: ");
    let dificInput = Number(prompt("Dificultad [1] Fácil | [2] Medio | [3] Difícil: "));
    const dificultad = (dificInput >= 1 && dificInput <= 3) ? dificInput : 1;
    const vencimiento = prompt("Vencimiento (YYYY-MM-DD): ");
    const nueva = (0, gestionTareas_1.crearTarea)((0, gestionTareas_1.obtenerSiguienteId)(listaActual), titulo, descripcion, dificultad, vencimiento);
    console.log("✅  TAREA AGREGADA CON ÉXITO.");
    return (0, gestionTareas_1.agregarTareaLista)(listaActual, nueva);
};
const menuEditar = (listaActual, id) => {
    const tarea = listaActual.find(t => t.id === id);
    if (!tarea) {
        return [...listaActual];
    }
    console.log(`Editando la tarea ${tarea.titulo} (dejar vacío para mantener la información)`);
    const nuevoTitulo = prompt("Título: ");
    const nuevaDescripcion = prompt("Descripción: ");
    const nuevoEstadoInput = prompt("Estado [1] pendiente | [2] en curso | [3] terminada | [4] cancelada: ");
    let nuevoEstado;
    if (nuevoEstadoInput === '1')
        nuevoEstado = 'pendiente';
    if (nuevoEstadoInput === '2')
        nuevoEstado = 'en curso';
    if (nuevoEstadoInput === '3')
        nuevoEstado = 'terminada';
    if (nuevoEstadoInput === '4')
        nuevoEstado = 'cancelada';
    //objeto para cambios
    const cambios = {};
    if (nuevoTitulo.trim())
        cambios.titulo = nuevoTitulo;
    if (nuevaDescripcion.trim())
        cambios.descripcion = nuevaDescripcion;
    if (nuevoEstado)
        cambios.estado = nuevoEstado;
    return (0, gestionTareas_1.editarTareaLista)(listaActual, id, cambios);
};
const menuVer = (listaActual) => {
    const opcion = prompt("¿Qué tareas deseas ver? [1] Todas | [2] Pendientes | [3] En curso | [4] Terminadas | [5] Canceladas:  ");
    let filtrar;
    if (opcion === '2')
        filtrar = 'pendiente';
    if (opcion === '3')
        filtrar = 'en curso';
    if (opcion === '4')
        filtrar = 'terminada';
    const resultados = (0, gestionTareas_1.filtrarTareas)(listaActual, filtrar);
    if (resultados.length === 0) {
        console.log("No hay tareas agregaadas.");
    }
    else {
        resultados.forEach(imprimirTarea);
    }
    const idVer = Number(prompt("Elija el ID de la tarea que desea ver (o 0 para volver)"));
    if (idVer !== 0) {
        const t = resultados.find(tarea => tarea.id === idVer);
        if (t)
            mostrarDetalles(t);
    }
    return listaActual;
};
const menuFuncional = (tareas) => {
    console.log("\n ------Mis tareas-----");
    console.log("[1] Ver mis tareas.");
    console.log("[2] Agregar una tarea.");
    console.log("[3] Buscar una tarea.");
    console.log("[4] Editar una tarea por ID.");
    console.log("[0] Salir.");
    const opcion = prompt(">> ");
    if (opcion === '0') {
        console.log("Saliendo...");
        return;
    }
    let nuevasTareas = tareas;
    switch (opcion) {
        case '1':
            menuVer(tareas);
            break;
        case '2':
            nuevasTareas = menuAgregar(tareas);
            break;
        case '3':
            const termino = prompt("Buscar: ");
            const encontradas = (0, gestionTareas_1.buscarTarea)(tareas, termino);
            encontradas.forEach(imprimirTarea);
            break;
        case '4':
            const idEditar = Number(prompt("ID de tarea a editar: "));
            nuevasTareas = menuEditar(tareas, idEditar);
            break;
        default:
            console.log("Opción inválida.");
    }
    menuFuncional(nuevasTareas);
};
menuFuncional([]);
