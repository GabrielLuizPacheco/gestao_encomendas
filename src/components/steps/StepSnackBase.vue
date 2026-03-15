<template>
  <div class="q-pa-md">
    <div class="text-h6 text-weight-bold text-dark q-mb-lg">{{ title }}</div>

    <!-- Quantidade -->
    <div class="q-mb-lg">
      <div class="text-weight-semibold q-mb-sm" style="color: #6B4C3B">Quantidade</div>
      <div class="pill-group">
        <button
          v-for="qty in standardQtys"
          :key="qty"
          class="pill-btn"
          :class="{ active: !isCustom && quantity === qty }"
          @click="selectStandard(qty)"
        >
          {{ qty }}
        </button>
        <button
          class="pill-btn"
          :class="{ active: isCustom }"
          @click="isCustom = true"
        >
          Personalizado
        </button>
      </div>

      <!-- Input customizado -->
      <q-input
        v-if="isCustom"
        v-model.number="customQty"
        type="number"
        outlined
        dense
        :label="`Quantidade (mínimo 25, múltiplos de 25)`"
        :rules="[
          (v) => v >= 25 || 'Mínimo 25 unidades',
          (v) => v % 25 === 0 || 'Deve ser múltiplo de 25',
        ]"
        class="q-mt-sm"
        style="max-width: 240px"
        @update:model-value="onCustomInput"
      />
    </div>

    <!-- Seleção de sabores por grupo -->
    <div v-if="quantity > 0" class="q-mb-lg">
      <div class="text-weight-semibold q-mb-sm" style="color: #6B4C3B">Sabores por grupo</div>
      <div v-for="(group, idx) in groups" :key="idx" class="q-mb-sm">
        <q-select
          v-model="groups[idx]!.flavorId"
          :options="flavorOptions"
          :label="`Sabor do grupo ${idx + 1} (25 unidades)`"
          option-value="id"
          option-label="name"
          emit-value
          map-options
          outlined
          dense
          style="border-radius: 12px"
          @update:model-value="emitGroups"
        />
      </div>
    </div>

    <!-- Preview -->
    <PricePreview
      v-if="quantity > 0"
      :label="`${label}: ${quantity} unidades`"
      :value="price"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { SnackFlavor, FlavorGroup } from 'src/types'
import PricePreview from 'src/components/PricePreview.vue'

const props = defineProps<{
  title: string
  label: string
  flavors: SnackFlavor[]
  calcPrice: (qty: number) => number
  modelQty: number
  modelGroups: FlavorGroup[]
}>()

const emit = defineEmits<{
  'update:modelQty': [v: number]
  'update:modelGroups': [groups: FlavorGroup[]]
}>()

const standardQtys = [25, 50, 75, 100]
const isCustom = ref(false)
const customQty = ref(25)
const groups = ref<FlavorGroup[]>([...props.modelGroups])

const quantity = computed(() => props.modelQty)

const flavorOptions = computed(() =>
  props.flavors.map((f) => ({ id: f.id, name: f.name }))
)

const price = computed(() => props.calcPrice(quantity.value))

function selectStandard(qty: number) {
  isCustom.value = false
  emit('update:modelQty', qty)
  updateGroups(qty)
}

function onCustomInput(val: number | string | null) {
  const v = Number(val)
  if (v >= 25 && v % 25 === 0) {
    emit('update:modelQty', v)
    updateGroups(v)
  }
}

function updateGroups(qty: number) {
  const numGroups = Math.floor(qty / 25)
  const current = [...groups.value]
  // Adicionar grupos faltantes
  while (current.length < numGroups) {
    current.push({ groupIndex: current.length, flavorId: null })
  }
  // Remover grupos excedentes
  groups.value = current.slice(0, numGroups)
  emitGroups()
}

function emitGroups() {
  emit('update:modelGroups', [...groups.value])
}

// Sincronizar quando quantidade muda externamente
watch(
  () => props.modelQty,
  (qty) => { if (qty > 0) updateGroups(qty) },
  { immediate: true }
)
</script>
