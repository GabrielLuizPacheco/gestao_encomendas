import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { calcItemTotal, calcOrderTotal } from 'src/utils/priceCalculator'
import { formatCurrency } from 'src/utils/formatters'
import type { Product, FlowState, OrderItem, CakeFlavor, CakeMass } from 'src/types'

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function buildSummary(flow: FlowState): string {
  const parts: string[] = []
  if (flow.selectedReadyKit) {
    parts.push(`Kit: ${flow.selectedReadyKit.name}`)
  }
  if (flow.cakeFlavor && flow.cakeWeightKg) {
    parts.push(`${flow.cakeFlavor.name} ${flow.cakeWeightKg}kg`)
  }
  if (flow.savoryQty > 0) {
    parts.push(`${flow.savoryQty} salgados`)
  }
  if (flow.sweetQty > 0) {
    parts.push(`${flow.sweetQty} docinhos`)
  }
  if (flow.themeType === 'pronto' && flow.topper) {
    parts.push(`Topper: ${flow.topper.name}`)
  } else if (flow.themeType === 'personalizado') {
    parts.push(`Tema pers.`)
  }
  if (flow.hasCandle) {
    parts.push(`Vela (${flow.candleAge}a)`)
  }
  return parts.join(' • ') || flow.product.name
}

function createEmptyFlow(product: Product): FlowState {
  return {
    product,
    orderType: null,
    selectedReadyKit: null,
    cakeFlavor: null,
    cakeWeightKg: null,
    cakeMass: null,
    savoryQty: 0,
    savoryGroups: [],
    sweetQty: 0,
    sweetGroups: [],
    themeType: null,
    topper: null,
    hasCandle: false,
    candleAge: null,
    topperMessage: '',
    personalPhotos: [],
    customThemeImg: null,
    customThemeDesc: '',
    totalPrice: 0,
  }
}

export const useOrderStore = defineStore('order', () => {
  const orderItems = ref<OrderItem[]>([])
  const activeFlow = ref<FlowState | null>(null)
  const dialogOpen = ref(false)
  const checkoutOpen = ref(false)

  // ---- Getters ----
  const hasItems = computed(() => orderItems.value.length > 0)
  const totalItems = computed(() => orderItems.value.length)
  const totalPrice = computed(() =>
    formatCurrency(calcOrderTotal(orderItems.value))
  )
  const totalPriceRaw = computed(() => calcOrderTotal(orderItems.value))

  // ---- Actions ----
  function startFlow(product: Product) {
    activeFlow.value = createEmptyFlow(product)
    dialogOpen.value = true
  }

  function updateFlow(data: Partial<FlowState>) {
    if (!activeFlow.value) return
    activeFlow.value = { ...activeFlow.value, ...data }
    // Recalcular total em tempo real
    activeFlow.value.totalPrice = calcItemTotal(activeFlow.value)
  }

  function updateCakeFlavor(flavor: CakeFlavor) {
    if (!activeFlow.value) return
    activeFlow.value.cakeFlavor = flavor
    // Se a massa atual não é válida para o novo sabor, limpar
    if (activeFlow.value.cakeMass && !flavor.masses.includes(activeFlow.value.cakeMass as unknown as CakeMass)) {
      activeFlow.value.cakeMass = null
    }
    // Auto-selecionar se só uma massa disponível
    if (flavor.masses.length === 1) {
      activeFlow.value.cakeMass = flavor.masses[0] as CakeMass
    }
    activeFlow.value.totalPrice = calcItemTotal(activeFlow.value)
  }

  function confirmItem() {
    if (!activeFlow.value) return
    const flow = { ...activeFlow.value }
    flow.totalPrice = calcItemTotal(flow)

    const item: OrderItem = {
      id: generateId(),
      flow,
      finalPrice: flow.totalPrice,
      summary: buildSummary(flow),
    }

    orderItems.value.push(item)
    cancelFlow()
  }

  function removeItem(id: string) {
    orderItems.value = orderItems.value.filter((item) => item.id !== id)
  }

  function cancelFlow() {
    activeFlow.value = null
    dialogOpen.value = false
  }

  function openCheckout() {
    checkoutOpen.value = true
  }

  function closeCheckout() {
    checkoutOpen.value = false
  }

  function clearOrder() {
    orderItems.value = []
    checkoutOpen.value = false
  }

  return {
    orderItems,
    activeFlow,
    dialogOpen,
    checkoutOpen,
    hasItems,
    totalItems,
    totalPrice,
    totalPriceRaw,
    startFlow,
    updateFlow,
    updateCakeFlavor,
    confirmItem,
    removeItem,
    cancelFlow,
    openCheckout,
    closeCheckout,
    clearOrder,
  }
})
