export interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  /** Ruta dentro de public/img/. Reemplaza el archivo para cambiar la foto. */
  imagen: string;
}

export const SERVICIOS: readonly Servicio[] = [
  {
    id: 'mantenimiento',
    nombre: 'Mantenimiento',
    descripcion: 'Mantenimiento de climas tipo minisplit y de ventana: limpieza de filtros, evaporador y condensador para que enfríe mejor y consuma menos.',
    imagen: 'img/mantenimiento.svg',
  },
  {
    id: 'reubicacion',
    nombre: 'Reubicación',
    descripcion: 'Desmontamos tu clima y lo instalamos en otro espacio, con pruebas de funcionamiento.',
    imagen: 'img/reubicacion.svg',
  },
  {
    id: 'instalacion',
    nombre: 'Instalación',
    descripcion: 'Instalación de climas tipo minisplit y de ventana: soporte, tubería, vacío, conexión eléctrica y arranque.',
    imagen: 'img/instalacion.svg',
  },
  {
    id: 'reparacion',
    nombre: 'Reparación',
    descripcion: 'Diagnóstico y reparación de fallas eléctricas, fugas, recarga de gas y tarjetas.',
    imagen: 'img/reparacion.svg',
  },
  {
    id: 'electrico-residencial',
    nombre: 'Servicio eléctrico residencial',
    descripcion: 'Instalaciones y reparaciones eléctricas en casa, 110/220V: contactos, apagadores, centros de carga y fallas.',
    imagen: 'img/electrico-residencial.svg',
  },
  {
    id: 'electrico-industrial',
    nombre: 'Electricidad industrial',
    descripcion: 'Sistemas de control y fuerza para uso industrial.',
    imagen: 'img/electrico-industrial.svg',
  },
];

export const VOLTAJES = ['110V', '220V', 'No estoy seguro'] as const;
