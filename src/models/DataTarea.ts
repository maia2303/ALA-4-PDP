export type Estado = 'pendiente' | 'en curso' | 'terminada' | 'cancelada';
export type Dificultad = 1 | 2 | 3;

export interface Tarea {
    readonly id: number,
    readonly titulo: string;
    readonly descripcion: string;
    readonly estado: Estado;
    readonly dificultad: Dificultad;
    readonly vencimiento: string | null;
    readonly creacion: string; //en los datos la creacion y ultima edicion se declaran como string y despues pasan a nueva fecha
    readonly ultimaEdicion: string;
}

