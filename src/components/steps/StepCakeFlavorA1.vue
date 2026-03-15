<template>
  <div class="q-pa-md">
    <div class="text-h6 text-weight-bold text-dark q-mb-md">Qual o sabor do bolo?</div>

    <div class="row q-col-gutter-sm">
      <div
        v-for="flavor in cakeFlavors"
        :key="flavor.id"
        class="col-6 col-md-4"
      >
        <div
          class="selection-card q-pa-sm"
          :class="{ selected: modelValue?.id === flavor.id }"
          @click="$emit('update:modelValue', flavor)"
        >
          <q-img
            :src="flavor.image"
            :ratio="1"
            class="rounded-borders q-mb-xs"
            style="border-radius: 10px"
          >
            <template #error>
              <div class="absolute-full flex flex-center bg-orange-1">
                <q-icon name="cake" size="32px" color="primary" />
              </div>
            </template>
          </q-img>
          <div class="text-center text-weight-semibold text-dark" style="font-size: 13px">
            {{ flavor.name }}
          </div>
          <div v-if="modelValue?.id === flavor.id" class="flex flex-center q-mt-xs">
            <q-icon name="check_circle" color="primary" size="18px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cakeFlavors } from 'src/data/mockData'
import type { CakeFlavor } from 'src/types'

defineProps<{ modelValue: CakeFlavor | null }>()
defineEmits<{ 'update:modelValue': [flavor: CakeFlavor] }>()
</script>
