// =====================================================
// Jacque Festas — WhatsApp Message Builder
// =====================================================
import { formatCurrency } from './formatters'
import { savoryFlavors, sweetFlavors, TOPPER_PRICE } from 'src/data/mockData'
import type { OrderItem } from 'src/types'

const WHATSAPP_NUMBER = '5511948026955'

function getSavoryFlavorName(id: number | null): string {
  if (!id) return '—'
  return savoryFlavors.find((f) => f.id === id)?.name ?? '—'
}

function getSweetFlavorName(id: number | null): string {
  if (!id) return '—'
  return sweetFlavors.find((f) => f.id === id)?.name ?? '—'
}

function buildItemBlock(index: number, item: OrderItem): string {
  const { flow, finalPrice } = item
  const lines: string[] = []

  lines.push(`*${index}. ${flow.product.name}*`)

  // Kit Pronto
  if (flow.selectedReadyKit) {
    const k = flow.selectedReadyKit
    lines.push(`• Kit Selecionado: *${k.name}*`)
    lines.push(`  - Bolo: ${k.items.cake.flavor} (${k.items.cake.weight})`)
    lines.push(`  - Salgados: ${k.items.savories.qty} (${k.items.savories.flavors})`)
    lines.push(`  - Docinhos: ${k.items.sweets.qty} (${k.items.sweets.flavors})`)
  }

  // Bolo
  if (flow.cakeFlavor && flow.cakeWeightKg) {
    const massLabel = flow.cakeMass === 'branca' ? 'Massa branca' : 'Massa de chocolate'
    lines.push(`• Bolo: ${flow.cakeFlavor.name} • ${flow.cakeWeightKg}kg • ${massLabel}`)
  }

  // Salgados
  if (flow.savoryQty > 0) {
    const groupsDesc = flow.savoryGroups
      .map((g) => `${25}x ${getSavoryFlavorName(g.flavorId)}`)
      .join(' / ')
    lines.push(`• Salgados: ${flow.savoryQty}un (${groupsDesc})`)
  }

  // Docinhos
  if (flow.sweetQty > 0) {
    const groupsDesc = flow.sweetGroups
      .map((g) => `${25}x ${getSweetFlavorName(g.flavorId)}`)
      .join(' / ')
    lines.push(`• Docinhos: ${flow.sweetQty}un (${groupsDesc})`)
  }

  // Tema
  if (flow.themeType === 'pronto' && flow.topper) {
    lines.push(`• Tema: Pronto — Topper ${flow.topper.name} (${formatCurrency(TOPPER_PRICE)})`)
  } else if (flow.themeType === 'personalizado') {
    lines.push(`• Tema: Personalizado`)
    if (flow.customThemeDesc) {
      lines.push(`  Descrição: ${flow.customThemeDesc}`)
    }
    if (flow.customThemeImg) {
      lines.push(`  📍 _[Imagem de referência anexada pelo cliente]_`)
    }
  }

  // Vela
  if (flow.hasCandle) {
    lines.push(`• Vela: Sim (${flow.candleAge ?? 1} ${flow.candleAge === 1 ? 'mês/ano' : 'anos'}) — ${formatCurrency(15)}`)
  } else {
    lines.push(`• Vela: Não`)
  }

  // Mensagem/topper
  if (flow.topperMessage) {
    lines.push(`• Mensagem: ${flow.topperMessage}`)
  }

  // Fotos pessoais
  if (flow.personalPhotos.length > 0) {
    lines.push(
      `• Fotos para impressão: ${flow.personalPhotos.length} foto(s) — ${formatCurrency(flow.personalPhotos.length * 8)}`
    )
    lines.push(`  ⚠️ _[O cliente deve enviar os arquivos a seguir]_`)
  }

  lines.push(`*Subtotal: ${formatCurrency(finalPrice)}*`)

  return lines.join('\n')
}

/**
 * Monta a mensagem formatada para o WhatsApp
 */
export function buildMessage(orderItems: OrderItem[], observations?: string): string {
  const separator = '━━━━━━━━━━━━━━━━'
  const parts: string[] = ['🎉 *Novo Pedido — Jacque Festas*\n']

  orderItems.forEach((item, i) => {
    parts.push(separator)
    parts.push(buildItemBlock(i + 1, item))
  })

  // Total geral
  const total = orderItems.reduce((sum, item) => sum + item.finalPrice, 0)
  parts.push(separator)
  parts.push(`*TOTAL GERAL: ${formatCurrency(total)}*`)

  // Observações
  if (observations && observations.trim()) {
    parts.push(`\n📝 Observações: ${observations.trim()}`)
  }

  return parts.join('\n')
}

/**
 * Gera a URL do WhatsApp com a mensagem codificada
 */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
