// =====================================================
// Jacque Festas — Mock Data
// =====================================================
import type { Product, CakeFlavor, SnackFlavor, Topper, ReadyKit } from 'src/types'

// ---- Produtos ----
export const products: Product[] = [
  {
    id: 1,
    name: 'Festa na Caixa',
    category: 'festa-na-caixa',
    image: 'https://via.placeholder.com/400x300/FF6B2C/FFFFFF?text=Festa+na+Caixa',
    basePrice: 150,
    popularity: 95,
    description: 'Kit completo para sua festa: bolo, salgados e docinhos personalizados',
  },
  {
    id: 2,
    name: 'Bolo',
    category: 'bolo',
    image: 'https://via.placeholder.com/400x300/FF9A5C/FFFFFF?text=Bolo',
    basePrice: 80,
    popularity: 80,
    description: 'Bolos artesanais com sabores e decorações personalizadas',
  },
  {
    id: 3,
    name: 'Salgado',
    category: 'salgado',
    image: 'https://via.placeholder.com/400x300/FFB870/FFFFFF?text=Salgados',
    basePrice: 45,
    popularity: 70,
    description: 'Salgados fresquinhos e deliciosos para sua festa',
  },
]

// ---- Sabores de Bolo ----
export const cakeFlavors: CakeFlavor[] = [
  {
    id: 1,
    name: 'Chocolate',
    image: 'https://via.placeholder.com/200x200/5C3317/FFFFFF?text=Chocolate',
    masses: ['branca', 'chocolate'],
    prices: { '1kg': 80, '2kg': 130, '3kg': 175, '4kg': 215, '5kg': 250 },
  },
  {
    id: 2,
    name: 'Baunilha',
    image: 'https://via.placeholder.com/200x200/F5DEB3/2C1A0E?text=Baunilha',
    masses: ['branca'],
    prices: { '1kg': 75, '2kg': 120, '3kg': 160, '4kg': 195, '5kg': 225 },
  },
  {
    id: 3,
    name: 'Red Velvet',
    image: 'https://via.placeholder.com/200x200/C0392B/FFFFFF?text=Red+Velvet',
    masses: ['branca'],
    prices: { '1kg': 90, '2kg': 145, '3kg': 195, '4kg': 240, '5kg': 280 },
  },
  {
    id: 4,
    name: 'Cenoura',
    image: 'https://via.placeholder.com/200x200/FF7F00/FFFFFF?text=Cenoura',
    masses: ['branca', 'chocolate'],
    prices: { '1kg': 75, '2kg': 120, '3kg': 160, '4kg': 195, '5kg': 225 },
  },
  {
    id: 5,
    name: 'Limão',
    image: 'https://via.placeholder.com/200x200/7BC67A/FFFFFF?text=Limão',
    masses: ['branca'],
    prices: { '1kg': 80, '2kg': 130, '3kg': 175, '4kg': 215, '5kg': 250 },
  },
  {
    id: 6,
    name: 'Morango',
    image: 'https://via.placeholder.com/200x200/E91E63/FFFFFF?text=Morango',
    masses: ['branca'],
    prices: { '1kg': 85, '2kg': 135, '3kg': 180, '4kg': 220, '5kg': 255 },
  },
]

// ---- Sabores de Salgado ----
export const savoryFlavors: SnackFlavor[] = [
  { id: 1,  name: 'Coxinha' },
  { id: 2,  name: 'Enroladinho de queijo' },
  { id: 3,  name: 'Kibe' },
  { id: 4,  name: 'Mini esfirra' },
  { id: 5,  name: 'Bolinha de queijo' },
  { id: 6,  name: 'Risoles de frango' },
  { id: 7,  name: 'Mini quiche' },
  { id: 8,  name: 'Enroladinho de salsicha' },
]

// ---- Sabores de Docinho ----
export const sweetFlavors: SnackFlavor[] = [
  { id: 1, name: 'Brigadeiro' },
  { id: 2, name: 'Beijinho' },
  { id: 3, name: 'Cajuzinho' },
  { id: 4, name: 'Trufa de chocolate' },
  { id: 5, name: 'Bicho de pé' },
  { id: 6, name: 'Olho de sogra' },
  { id: 7, name: 'Palha italiana' },
  { id: 8, name: 'Brigadeiro branco' },
]

// ---- Toppers ----
export const toppers: Topper[] = [
  // Femininos
  { id: 1,  name: 'Princesa Rosa',  image: 'https://via.placeholder.com/200x200/FF9EBC/FFFFFF?text=Princesa', gender: 'feminino' },
  { id: 2,  name: 'Unicórnio',      image: 'https://via.placeholder.com/200x200/E1BEFF/FFFFFF?text=Unicórnio', gender: 'feminino' },
  { id: 3,  name: 'Borboletas',     image: 'https://via.placeholder.com/200x200/FFB3DE/FFFFFF?text=Borboletas', gender: 'feminino' },
  { id: 4,  name: 'Flores',         image: 'https://via.placeholder.com/200x200/FF8FAB/FFFFFF?text=Flores', gender: 'feminino' },
  { id: 5,  name: 'Bailarina',      image: 'https://via.placeholder.com/200x200/FFC0CB/FFFFFF?text=Bailarina', gender: 'feminino' },
  // Masculinos
  { id: 6,  name: 'Super-Herói',    image: 'https://via.placeholder.com/200x200/1565C0/FFFFFF?text=Super-Herói', gender: 'masculino' },
  { id: 7,  name: 'Dinossauro',     image: 'https://via.placeholder.com/200x200/2E7D32/FFFFFF?text=Dinossauro', gender: 'masculino' },
  { id: 8,  name: 'Futebol',        image: 'https://via.placeholder.com/200x200/1B5E20/FFFFFF?text=Futebol', gender: 'masculino' },
  { id: 9,  name: 'Astronauta',     image: 'https://via.placeholder.com/200x200/283593/FFFFFF?text=Astronauta', gender: 'masculino' },
  { id: 10, name: 'Pirata',         image: 'https://via.placeholder.com/200x200/4A1942/FFFFFF?text=Pirata', gender: 'masculino' },
  // Neutros
  { id: 11, name: 'Estrelas',       image: 'https://via.placeholder.com/200x200/FFD600/2C1A0E?text=Estrelas', gender: 'neutro' },
  { id: 12, name: 'Arco-íris',      image: 'https://via.placeholder.com/200x200/FF6B2C/FFFFFF?text=Arco-íris', gender: 'neutro' },
  { id: 13, name: 'Balões',         image: 'https://via.placeholder.com/200x200/26C6DA/FFFFFF?text=Balões', gender: 'neutro' },
]

// ---- Kits Prontos ----
export const readyKits: ReadyKit[] = [
  {
    id: 1,
    name: 'Kit Escolha Certa',
    description: 'Ideal para pequenas reuniões. Prático e saboroso.',
    price: 159.90,
    image: 'https://via.placeholder.com/400x300/FF6B2C/FFFFFF?text=Kit+Escolha+Certa',
    items: {
      cake: { flavor: 'Chocolate', weight: '1.5kg' },
      savories: { qty: 50, flavors: 'Coxinha e Bolinha de Queijo' },
      sweets: { qty: 25, flavors: 'Brigadeiro e Beijinho' }
    }
  },
  {
    id: 2,
    name: 'Kit Super Festa',
    description: 'O preferido! Completo para uma festa inesquecível.',
    price: 249.90,
    image: 'https://via.placeholder.com/400x300/FF9A5C/FFFFFF?text=Kit+Super+Festa',
    items: {
      cake: { flavor: 'Morango com Ninho', weight: '2.5kg' },
      savories: { qty: 100, flavors: 'Misto de Salgados' },
      sweets: { qty: 50, flavors: 'Brigadeiro, Beijinho e Cajuzinho' }
    }
  },
  {
    id: 3,
    name: 'Kit Mega Comemoração',
    description: 'Para grandes momentos. Abundância e variedade.',
    price: 389.90,
    image: 'https://via.placeholder.com/400x300/FFB870/FFFFFF?text=Kit+Mega',
    items: {
      cake: { flavor: 'Red Velvet', weight: '3.5kg' },
      savories: { qty: 150, flavors: 'Mix Completo Premium' },
      sweets: { qty: 100, flavors: 'Seleção Gourmet de Doces' }
    }
  }
]

// ---- Tabelas de Preço ----
export const savoryPrices: Record<number, number> = {
  25: 45,
  50: 85,
  75: 120,
  100: 150,
}

export const sweetPrices: Record<number, number> = {
  25: 35,
  50: 65,
  75: 95,
  100: 120,
}

export const PHOTO_PRICE = 8
export const CANDLE_PRICE = 15
export const TOPPER_PRICE = 10
