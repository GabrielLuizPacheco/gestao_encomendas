<template>
  <div class="price-preview">
    <div class="price-label q-mb-xs">{{ label }}</div>
    <div class="price-value">{{ formattedValue }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatCurrency } from 'src/utils/formatters'

const props = defineProps<{
  label: string
  value: number
}>()

const formattedValue = computed(() => formatCurrency(props.value))
</script>
