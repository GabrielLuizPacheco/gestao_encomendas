<template>
  <div class="q-pa-md">
    <div class="text-h6 text-weight-bold text-dark q-mb-lg">Tamanho e tipo de massa</div>

    <!-- Peso -->
    <div class="q-mb-lg">
      <div class="text-weight-semibold q-mb-sm" style="color: #6B4C3B">Peso do bolo</div>
      <div class="pill-group">
        <button
          v-for="w in weights"
          :key="w"
          class="pill-btn"
          :class="{ active: modelWeight === w }"
          @click="$emit('update:modelWeight', w)"
        >
          {{ w }}kg
        </button>
      </div>
    </div>

    <!-- Massa -->
    <div class="q-mb-lg">
      <div class="text-weight-semibold q-mb-sm" style="color: #6B4C3B">Tipo de massa</div>
      <q-banner
        v-if="availableMasses.length === 1"
        dense
        rounded
        class="q-mb-sm"
        style="background: rgba(255,107,44,0.08); color: #6B4C3B; font-size: 13px"
      >
        <q-icon name="info" color="primary" class="q-mr-xs" />
        Este sabor está disponível apenas em massa {{ massLabel(availableMasses[0]!) }}.
      </q-banner>
      <div class="pill-group">
        <button
          v-for="mass in availableMasses"
          :key="mass"
          class="pill-btn"
          :class="{ active: modelMass === mass }"
          :disabled="availableMasses.length === 1"
          @click="$emit('update:modelMass', mass)"
        >
          {{ massLabel(mass) }}
        </button>
      </div>
    </div>

    <!-- Preview -->
    <PricePreview
      v-if="modelWeight && modelMass && flavor"
      :label="`Bolo ${flavor.name} • ${modelWeight}kg • Massa ${massLabel(modelMass)}`"
      :value="price"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CakeFlavor, CakeMass } from 'src/types'
import { calcCakePrice } from 'src/utils/priceCalculator'
import PricePreview from 'src/components/PricePreview.vue'

const props = defineProps<{
  flavor: CakeFlavor | null
  modelWeight: number | null
  modelMass: CakeMass | null
}>()

defineEmits<{
  'update:modelWeight': [v: number]
  'update:modelMass': [v: CakeMass]
}>()

const weights = [1, 2, 3, 4, 5]

const availableMasses = computed((): CakeMass[] => {
  return props.flavor?.masses ?? (['branca'] as CakeMass[])
})

function massLabel(mass: CakeMass): string {
  return mass === 'branca' ? 'Massa branca' : 'Massa de chocolate'
}

const price = computed(() => {
  if (!props.flavor || !props.modelWeight) return 0
  return calcCakePrice(props.flavor.id, props.modelWeight)
})
</script>
