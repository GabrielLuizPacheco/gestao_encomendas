// =====================================================
// Jacque Festas — Formatters
// =====================================================

/**
 * Formata um número como moeda brasileira: R$ X.XXX,XX
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value)
}
