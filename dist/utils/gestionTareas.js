"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerSiguienteId = exports.buscarTarea = exports.filtrarTareas = exports.editarTareaLista = exports.agregarTareaLista = exports.crearTarea = void 0;
const crearTarea = (id, titulo, descripcion, dificultad, vencimiento, estado = 'pendiente') => {
    const fecha = new Date().toLocaleString();
    return Object.freeze({
        id,
        titulo,
        descripcion,
        estado,
        dificultad,
        vencimiento: vencimiento || null,
        creacion: fecha,
        ultimaEdicion: fecha
    });
};
exports.crearTarea = crearTarea;
const agregarTareaLista = (lista, nuevaTarea) => {
    return [...lista, nuevaTarea]; //se usa ... en lugar de push para crear un nuevo array
};
exports.agregarTareaLista = agregarTareaLista;
const editarTareaLista = (lista, id, cambio //solo se permite el cambio en algunos campos, por ej en id para evitar errores en el filtrado
) => {
    return lista.map(t => {
        if (t.id === id) {
            return Object.freeze(Object.assign(Object.assign(Object.assign({}, t), cambio), { ultimaEdicion: new Date().toLocaleString() // se actualiza la fecha de creación
             }));
        }
        return t;
    });
};
exports.editarTareaLista = editarTareaLista;
const filtrarTareas = (lista, estado) => {
    if (!estado) {
        return [...lista]; //si no se filtra por estado, se devuelve una copia de todo
    }
    return lista.filter(t => t.estado === estado);
};
exports.filtrarTareas = filtrarTareas;
const buscarTarea = (lista, palabraClave) => {
    const palabraMin = palabraClave.toLowerCase();
    return lista.filter(t => t.titulo.toLowerCase().includes(palabraMin) || t.descripcion.toLowerCase().includes(palabraMin));
};
exports.buscarTarea = buscarTarea;
const obtenerSiguienteId = (lista) => {
    return lista.length > 0 ?
        Math.max(...lista.map(t => t.id)) + 1 : 1;
};
exports.obtenerSiguienteId = obtenerSiguienteId;
