<template>
  <div class="q-pa-md animate__animated animate__fadeIn">
    <div class="text-h6 q-mb-md text-weight-bold" style="color: #2C1A0E">
      Escolha seu Kit Pronto
    </div>
    <p class="text-grey-7 q-mb-lg">
      Selecionamos as melhores combinações para facilitar sua festa.
    </p>

    <div class="row q-col-gutter-md">
      <div v-for="kit in readyKits" :key="kit.id" class="col-12">
        <q-card
          flat
          bordered
          class="ready-kit-card"
          :class="{ 'ready-kit-selected': modelValue?.id === kit.id }"
          @click="$emit('update:modelValue', kit)"
        >
          <div class="row no-wrap">
            <q-img
              :src="kit.image"
              class="col-4"
              style="border-radius: 12px 0 0 12px; background-color: #FFF0E8;"
            >
              <template v-slot:error>
                <div class="absolute-full flex flex-center column">
                  <q-icon name="celebration" size="32px" color="orange-4" />
                  <div class="text-caption text-orange-4 q-mt-xs">Jacque Festas</div>
                </div>
              </template>
            </q-img>
            <q-card-section class="col-8 q-pa-md">
              <div class="row justify-between items-start no-wrap">
                <div class="text-subtitle1 text-weight-bold" style="color: #2C1A0E; line-height: 1.2">
                  {{ kit.name }}
                </div>
                <div class="text-primary text-weight-bold" style="font-size: 16px">
                  {{ formatCurrency(kit.price) }}
                </div>
              </div>
              <div class="text-caption text-grey-7 q-mb-sm line-clamp-2">
                {{ kit.description }}
              </div>

              <div class="kit-details q-mt-sm">
                <div class="detail-item row items-center q-gutter-x-xs q-mb-xs">
                  <q-icon name="cake" size="14px" color="primary" />
                  <span class="text-caption">Bolo {{ kit.items.cake.flavor }} ({{ kit.items.cake.weight }})</span>
                </div>
                <div class="detail-item row items-center q-gutter-x-xs q-mb-xs">
                  <q-icon name="restaurant" size="14px" color="primary" />
                  <span class="text-caption">{{ kit.items.savories.qty }} salgados ({{ kit.items.savories.flavors }})</span>
                </div>
                <div class="detail-item row items-center q-gutter-x-xs">
                  <q-icon name="icecream" size="14px" color="primary" />
                  <span class="text-caption">{{ kit.items.sweets.qty }} docinhos ({{ kit.items.sweets.flavors }})</span>
                </div>
              </div>
            </q-card-section>
          </div>
          
          <!-- Checkmark indicate selection -->
          <div v-if="modelValue?.id === kit.id" class="selection-badge">
            <q-icon name="check" color="white" size="16px" />
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { readyKits } from 'src/data/mockData'
import { formatCurrency } from 'src/utils/formatters'
import type { ReadyKit } from 'src/types'

defineProps<{
  modelValue: ReadyKit | null
}>()

defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.ready-kit-card {
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
}

.ready-kit-selected {
  border-color: var(--q-primary);
  background-color: #FFF8F5;
  
  .text-subtitle1 {
    color: var(--q-primary) !important;
  }
}

.selection-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--q-primary);
  width: 32px;
  height: 32px;
  border-radius: 0 0 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>
