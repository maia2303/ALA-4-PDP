import { identity } from "lodash";
import { Tarea, Dificultad, Estado } from "../models/DataTarea";

export const crearTarea = (
    id: number,
    titulo: string,
    descripcion: string,
    dificultad: Dificultad,
    vencimiento: string,
    estado: Estado = 'pendiente'
): Tarea => { //retorna un objeto congelado (usando Object.freeze()) para evitar modificaciones
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

export const agregarTareaLista = (lista: readonly Tarea[], nuevaTarea: Tarea): Tarea[] => {
    return[...lista, nuevaTarea]; //se usa ... en lugar de push para crear un nuevo array
};

export const editarTareaLista = (
    lista: readonly Tarea[], 
    id: number,
    cambio: Partial<Omit<Tarea, 'id' | 'creacion' >> //solo se permite el cambio en algunos campos, por ej en id para evitar errores en el filtrado
): Tarea[]  => {
    return lista.map(t => {
        if(t.id === id){
            return Object.freeze({
                ...t, //copia las propiedades anteriores de la tareaa
                ...cambio, // sobreescribe las nuevas propiedades
                ultimaEdicion: new Date().toLocaleString() // se actualiza la fecha de creación
            });
        }
        return t;
    });
};

export const filtrarTareas = (lista: readonly Tarea[], estado?: Estado): Tarea[] => {
    if(!estado){ 
        return [...lista]; //si no se filtra por estado, se devuelve una copia de todo
    }
    return lista.filter(t => t.estado === estado);
};

export const buscarTarea = (lista: readonly Tarea[], palabraClave: string): Tarea[] => {
    const palabraMin = palabraClave.toLowerCase();
    return lista.filter(t =>
        t.titulo.toLowerCase().includes(palabraMin) || t.descripcion.toLowerCase().includes(palabraMin)
    );
};



export const obtenerSiguienteId = (lista: readonly Tarea[]): number => { //funcion pura para obtener el siguiente id de tarea
    return lista.length > 0?
    Math.max(...lista.map(t => t.id)) + 1: 1;
};
