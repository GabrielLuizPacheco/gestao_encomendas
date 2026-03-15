// =====================================================
// Jacque Festas — TypeScript Types
// =====================================================

export type ProductCategory = 'festa-na-caixa' | 'bolo' | 'salgado'
export type CakeMass = 'branca' | 'chocolate'
export type ThemeType = 'pronto' | 'personalizado'
export type OrderType = 'personalizado' | 'pronto'
export type TopperGender = 'feminino' | 'masculino' | 'neutro'

export interface Product {
  id: number
  name: string
  category: ProductCategory
  image: string
  basePrice: number
  popularity: number
  description: string
}

export interface CakeFlavor {
  id: number
  name: string
  image: string
  masses: CakeMass[]
  prices: Record<string, number> // chave: '1kg', '2kg', ...
}

export interface SnackFlavor {
  id: number
  name: string
}

export interface Topper {
  id: number
  name: string
  image: string
  gender: TopperGender
}

export interface FlavorGroup {
  groupIndex: number
  flavorId: number | null
}

export interface FlowState {
  product: Product
  orderType: OrderType | null
  cakeFlavor: CakeFlavor | null
  cakeWeightKg: number | null
  cakeMass: CakeMass | null
  savoryQty: number
  savoryGroups: FlavorGroup[]
  sweetQty: number
  sweetGroups: FlavorGroup[]
  themeType: ThemeType | null
  topper: Topper | null
  hasCandle: boolean
  topperMessage: string
  personalPhotos: File[]
  customThemeImg: File | null
  customThemeDesc: string
  totalPrice: number
}

export interface OrderItem {
  id: string        // UUID gerado no momento da adição
  flow: FlowState
  finalPrice: number
  summary: string   // texto resumido para exibição no carrinho
}
