<template>
  <div class="q-pa-md">
    <div class="text-h6 text-weight-bold text-dark q-mb-md q-text-center">Qual tema você prefere?</div>

    <div class="row q-gutter-md justify-center">
      <!-- Tema pronto -->
      <div class="col-12 col-sm-5">
        <div
          class="type-card"
          :class="{ selected: modelValue === 'pronto' }"
          @click="$emit('update:modelValue', 'pronto')"
        >
          <div class="type-icon">⭐</div>
          <div class="text-weight-bold text-dark" style="font-size: 16px">Tema pronto</div>
          <div class="text-caption q-mt-xs" style="color: #6B4C3B">
            Escolha entre nossos toppers disponíveis
          </div>
          <q-icon v-if="modelValue === 'pronto'" name="check_circle" color="primary" size="28px" class="q-mt-sm" />
        </div>
      </div>

      <!-- Tema personalizado -->
      <div class="col-12 col-sm-5">
        <div
          class="type-card"
          :class="{ selected: modelValue === 'personalizado' }"
          @click="$emit('update:modelValue', 'personalizado')"
        >
          <div class="type-icon">🎨</div>
          <div class="text-weight-bold text-dark" style="font-size: 16px">Tema personalizado</div>
          <div class="text-caption q-mt-xs" style="color: #6B4C3B">
            Crie um tema do seu jeito com imagem própria
          </div>
          <q-icon v-if="modelValue === 'personalizado'" name="check_circle" color="primary" size="28px" class="q-mt-sm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ThemeType } from 'src/types'
defineProps<{ modelValue: ThemeType | null }>()
defineEmits<{ 'update:modelValue': [v: ThemeType] }>()
</script>
