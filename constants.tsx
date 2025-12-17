
import { Technique } from './types';

export const TECHNIQUES: Technique[] = [
  {
    id: 'filtracion',
    name: 'Filtración',
    definition: 'Mezcla-filtro-separar-sólidos insolubles-líquidos.',
    keywords: ['filtro', 'sólidos insolubles', 'líquidos'],
    icon: 'fa-filter'
  },
  {
    id: 'tamizado',
    name: 'Tamizado',
    definition: 'Separar-sólidos-distinto tamaño-malla.',
    keywords: ['sólidos', 'distinto tamaño', 'malla'],
    icon: 'fa-border-all'
  },
  {
    id: 'decantacion',
    name: 'Decantación',
    definition: 'Separar-líquidos inmiscibles-o-sólido-de-líquido-diferencia-densidad.',
    keywords: ['líquidos inmiscibles', 'densidad', 'separar'],
    icon: 'fa-vials'
  },
  {
    id: 'extraccion_sl',
    name: 'Extracción sólido-líquido',
    definition: 'Disolviendo-componente-de-sólido-líquido adecuado.',
    keywords: ['disolviendo', 'componente', 'adecuado'],
    icon: 'fa-flask-vial'
  },
  {
    id: 'sedimentacion',
    name: 'Sedimentación',
    definition: 'Dejar-sólidos-densos-depositen-fondo-líquido.',
    keywords: ['depositen', 'fondo', 'densos'],
    icon: 'fa-arrow-down-long'
  },
  {
    id: 'flotacion',
    name: 'Flotación',
    definition: 'Separar-materiales-menos densos-flotan-líquido.',
    keywords: ['menos densos', 'flotan', 'líquido'],
    icon: 'fa-water'
  },
  {
    id: 'separacion_magnetica',
    name: 'Separación magnética',
    definition: 'Usar-imán-separar-materiales-magnéticos-no.',
    keywords: ['imán', 'magnéticos', 'no magnéticos'],
    icon: 'fa-magnet'
  },
  {
    id: 'cristalizacion',
    name: 'Cristalización',
    definition: 'Formar-cristales-separar-sólido-disuelto-en-líquido.',
    keywords: ['cristales', 'sólido disuelto', 'líquido'],
    icon: 'fa-gem'
  },
  {
    id: 'absorcion_adsorcion',
    name: 'Absorción vs Adsorción',
    definition: 'Absorción=disuelve-entero Adsorción=disuelve-superficie.',
    keywords: ['entero', 'superficie', 'disuelve'],
    icon: 'fa-arrows-to-dot'
  },
  {
    id: 'destilacion',
    name: 'Destilación',
    definition: 'Separar-líquidos-distintos-ebullición-evaporación y condensación.',
    keywords: ['ebullición', 'evaporación', 'condensación'],
    icon: 'fa-fire-burner'
  },
  {
    id: 'extraccion_ll',
    name: 'Extracción líquido-líquido',
    definition: 'Transferir-soluto-líquido-otro inmiscible-afín.',
    keywords: ['transferir', 'soluto', 'inmiscible', 'afín'],
    icon: 'fa-droplet'
  }
];
