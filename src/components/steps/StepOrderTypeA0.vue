<template>
  <div class="q-pa-md">
    <div class="text-center q-mb-lg">
      <div class="text-h6 text-weight-bold text-dark">Como você quer montar sua Festa na Caixa?</div>
    </div>

    <div class="row q-gutter-md justify-center">
      <!-- Kit pronto -->
      <div class="col-12 col-sm-5">
        <div
          class="type-card"
          :class="{ selected: selected === 'pronto' }"
          @click="select('pronto')"
        >
          <div class="type-icon">📦</div>
          <div class="text-weight-bold text-dark" style="font-size: 16px">Kits prontos</div>
          <div class="text-caption q-mt-xs" style="color: #6B4C3B">
            Escolha um kit já montado e personalize o tema
          </div>
          <q-icon
            v-if="selected === 'pronto'"
            name="check_circle"
            color="primary"
            size="28px"
            class="q-mt-sm"
          />
        </div>
      </div>

      <!-- Montar do zero -->
      <div class="col-12 col-sm-5">
        <div
          class="type-card"
          :class="{ selected: selected === 'personalizado' }"
          @click="select('personalizado')"
        >
          <div class="type-icon">⭐</div>
          <div class="text-weight-bold text-dark" style="font-size: 16px">Montar do zero</div>
          <div class="text-caption q-mt-xs" style="color: #6B4C3B">
            Escolha cada detalhe do seu jeito
          </div>
          <q-icon
            v-if="selected === 'personalizado'"
            name="check_circle"
            color="primary"
            size="28px"
            class="q-mt-sm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { OrderType } from 'src/types'

const props = defineProps<{ modelValue: OrderType | null }>()
const emit = defineEmits<{ 'update:modelValue': [v: OrderType] }>()

const selected = computed(() => props.modelValue)

function select(type: OrderType) {
  emit('update:modelValue', type)
}
</script>
