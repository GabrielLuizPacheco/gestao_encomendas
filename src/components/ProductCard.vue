<template>
  <q-card class="product-card cursor-pointer full-width" flat @click="$emit('personalize', product)">
    <q-img
      :src="product.image"
      :ratio="4 / 3"
      class="product-card-img"
    >
      <template #error>
        <div
          class="absolute-full flex flex-center"
          :style="{ background: categoryColor }"
        >
          <q-icon :name="categoryIcon" size="48px" color="white" />
        </div>
      </template>
    </q-img>

    <q-card-section class="q-pb-xs q-pt-sm">
      <div class="text-weight-bold text-dark" style="font-size: 15px; line-height: 1.3">
        {{ product.name }}
      </div>
      <div class="text-caption q-mt-xs" style="color: #6B4C3B; line-height: 1.4">
        {{ product.description }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-xs q-pb-sm">
      <q-chip
        dense
        color="orange-1"
        text-color="primary"
        icon="sell"
        style="font-weight: 600; font-size: 12px"
      >
        A partir de {{ formatCurrency(product.basePrice) }}
      </q-chip>
    </q-card-section>

    <q-card-actions class="q-pt-none q-px-sm q-pb-sm">
      <q-btn
        outline
        color="primary"
        label="Personalizar"
        icon="auto_fix_high"
        class="full-width"
        style="border-radius: 10px; font-weight: 600"
        unelevated
        @click.stop="$emit('personalize', product)"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from 'src/types'
import { formatCurrency } from 'src/utils/formatters'

const props = defineProps<{ product: Product }>()
defineEmits<{ personalize: [product: Product] }>()

const categoryColor = computed(() => {
  switch (props.product.category) {
    case 'festa-na-caixa': return '#FF6B2C'
    case 'bolo':           return '#FF9A5C'
    case 'salgado':        return '#FFB870'
    default:               return '#FF6B2C'
  }
})

const categoryIcon = computed(() => {
  switch (props.product.category) {
    case 'festa-na-caixa': return 'celebration'
    case 'bolo':           return 'cake'
    case 'salgado':        return 'lunch_dining'
    default:               return 'restaurant'
  }
})
</script>
