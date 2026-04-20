export type ProductType = "sublimada" | "retro" | "polo";

export interface ProductDescription {
  description: string;
  bullets: string[];
  composition: string;
  sizing: string;
}

export const PRODUCT_DESCRIPTIONS: Record<ProductType, ProductDescription> = {
  sublimada: {
    description:
      "Camiseta de edición especial con diseño sublimado de principio a fin. Corte oversize relajado, ideal para uso diario y como pieza de colección. Inspirada en la identidad saprissista, pensada para quienes llevan el morado más allá del estadio.",
    bullets: [
      "100% poliéster interlock",
      "Sublimación total (el diseño no se despinta ni se agrieta)",
      "Escudo bordado termoadherido",
      "Lavable a máquina en agua fría",
    ],
    composition:
      "100% poliéster. Lavar al revés en agua fría, no usar blanqueador, secar a la sombra, planchar a baja temperatura.",
    sizing:
      "Oversize. Si dudás entre dos tallas, elegí la menor para un fit regular.",
  },
  retro: {
    description:
      "Camiseta homenaje a la historia morada, reinterpretada con los detalles que marcaron una era. Tela técnica transpirable, pensada para quienes viven el fútbol dentro y fuera de la cancha.",
    bullets: [
      "100% poliéster interlock tipo jersey deportivo",
      "Escudo y detalles sublimados en alta definición",
      "Corte regular, cuello redondo reforzado",
      "Lavable a máquina",
    ],
    composition:
      "100% poliéster. Lavar al revés en agua fría, no planchar sobre el escudo, secar a la sombra.",
    sizing: "Regular fit. Tallas de XS a XL.",
  },
  polo: {
    description:
      "Polo con corte moderno que mezcla el ADN futbolero con una silueta streetwear. Confeccionado en tela piqué suave, con detalles bordados que le dan terminación premium.",
    bullets: [
      "Tela piqué 100% poliéster",
      "Detalles bordados (no sublimados)",
      "Corte oversize (hombre) / crop (mujer)",
      "Cuello polo con botones",
    ],
    composition:
      "100% poliéster piqué. Lavar en agua fría, no usar secadora, planchar al revés.",
    sizing:
      "Oversize. Mujer: crop fit, cae justo sobre la cintura.",
  },
};

export const DELIVERY_TIME = "7 a 14 días hábiles dentro de Costa Rica";
