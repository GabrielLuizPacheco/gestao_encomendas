// =====================================================
// Jacque Festas — Price Calculator
// =====================================================
import { cakeFlavors, savoryPrices, sweetPrices, PHOTO_PRICE, CANDLE_PRICE } from 'src/data/mockData'
import type { FlowState } from 'src/types'

/**
 * Preço do bolo conforme sabor e peso
 */
export function calcCakePrice(flavorId: number, weightKg: number): number {
  const flavor = cakeFlavors.find((f) => f.id === flavorId)
  if (!flavor) return 0
  const key = `${weightKg}kg`
  return flavor.prices[key] ?? 0
}

/**
 * Preço dos salgados com cálculo proporcional para quantidades customizadas
 */
export function calcSavoryPrice(quantity: number): number {
  if (quantity <= 0) return 0
  const standardQtys = [25, 50, 75, 100]
  if (Object.prototype.hasOwnProperty.call(savoryPrices, quantity)) {
    return savoryPrices[quantity] as number
  }

  // Proporcional: preço por unidade da faixa mais próxima
  const closest = standardQtys.reduce((prev, curr) =>
    Math.abs(curr - quantity) < Math.abs(prev - quantity) ? curr : prev
  )
  const pricePerUnit = (savoryPrices[closest] ?? 0) / closest
  return Math.round(pricePerUnit * quantity * 100) / 100
}

/**
 * Preço dos docinhos com cálculo proporcional para quantidades customizadas
 */
export function calcSweetPrice(quantity: number): number {
  if (quantity <= 0) return 0
  const standardQtys = [25, 50, 75, 100]
  if (Object.prototype.hasOwnProperty.call(sweetPrices, quantity)) {
    return sweetPrices[quantity] as number
  }

  const closest = standardQtys.reduce((prev, curr) =>
    Math.abs(curr - quantity) < Math.abs(prev - quantity) ? curr : prev
  )
  const pricePerUnit = (sweetPrices[closest] ?? 0) / closest
  return Math.round(pricePerUnit * quantity * 100) / 100
}

/**
 * Preço das fotos impressas
 */
export function calcPhotosPrice(count: number): number {
  return count * PHOTO_PRICE
}

/**
 * Preço da vela
 */
export function calcCandlePrice(hasCandle: boolean): number {
  return hasCandle ? CANDLE_PRICE : 0
}

/**
 * Total do item baseado no FlowState atual
 */
export function calcItemTotal(flow: Partial<FlowState>): number {
  let total = 0

  // Bolo
  if (flow.cakeFlavor && flow.cakeWeightKg) {
    total += calcCakePrice(flow.cakeFlavor.id, flow.cakeWeightKg)
  }

  // Salgados
  if (flow.savoryQty && flow.savoryQty > 0) {
    total += calcSavoryPrice(flow.savoryQty)
  }

  // Docinhos
  if (flow.sweetQty && flow.sweetQty > 0) {
    total += calcSweetPrice(flow.sweetQty)
  }

  // Fotos
  if (flow.personalPhotos && flow.personalPhotos.length > 0) {
    total += calcPhotosPrice(flow.personalPhotos.length)
  }

  // Vela
  if (flow.hasCandle) {
    total += calcCandlePrice(true)
  }

  return total
}

/**
 * Total geral do carrinho
 */
export function calcOrderTotal(orderItems: Array<{ finalPrice: number }>): number {
  return orderItems.reduce((sum, item) => sum + item.finalPrice, 0)
}
