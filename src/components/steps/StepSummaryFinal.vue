<template>
  <div class="q-pa-md">
    <div class="text-h6 text-weight-bold text-dark q-mb-md">Resumo do pedido 🎉</div>

    <q-card class="summary-card q-mb-lg" flat>
      <q-card-section>
        <!-- Produto -->
        <div class="text-weight-bold text-primary q-mb-sm" style="font-size: 15px">
          {{ flow.product.name }}
        </div>

        <q-list dense class="q-pa-none">
          <!-- Bolo -->
          <q-item v-if="flow.cakeFlavor && flow.cakeWeightKg" class="q-pa-none q-mb-xs">
            <q-item-section avatar>
              <q-icon name="cake" color="primary" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Bolo</q-item-label>
              <q-item-label>
                {{ flow.cakeFlavor.name }} • {{ flow.cakeWeightKg }}kg •
                Massa {{ flow.cakeMass === 'branca' ? 'branca' : 'de chocolate' }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <span style="color: #FF6B2C; font-weight: 600">{{ formatCurrency(cakePrice) }}</span>
            </q-item-section>
          </q-item>

          <!-- Salgados -->
          <q-item v-if="flow.savoryQty > 0" class="q-pa-none q-mb-xs">
            <q-item-section avatar>
              <q-icon name="lunch_dining" color="primary" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Salgados</q-item-label>
              <q-item-label>{{ flow.savoryQty }} unidades</q-item-label>
            </q-item-section>
            <q-item-section side>
              <span style="color: #FF6B2C; font-weight: 600">{{ formatCurrency(savoryPrice) }}</span>
            </q-item-section>
          </q-item>

          <!-- Docinhos -->
          <q-item v-if="flow.sweetQty > 0" class="q-pa-none q-mb-xs">
            <q-item-section avatar>
              <q-icon name="icecream" color="primary" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Docinhos</q-item-label>
              <q-item-label>{{ flow.sweetQty }} unidades</q-item-label>
            </q-item-section>
            <q-item-section side>
              <span style="color: #FF6B2C; font-weight: 600">{{ formatCurrency(sweetPrice) }}</span>
            </q-item-section>
          </q-item>

          <!-- Tema -->
          <q-item v-if="flow.themeType" class="q-pa-none q-mb-xs">
            <q-item-section avatar>
              <q-icon name="celebration" color="primary" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Tema</q-item-label>
              <q-item-label>
                {{ flow.themeType === 'pronto' ? `Pronto — ${flow.topper?.name ?? ''}` : 'Personalizado' }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <!-- Vela -->
          <q-item class="q-pa-none q-mb-xs">
            <q-item-section avatar>
              <q-icon name="local_fire_department" color="primary" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Vela</q-item-label>
              <q-item-label>{{ flow.hasCandle ? 'Sim' : 'Não' }}</q-item-label>
            </q-item-section>
            <q-item-section v-if="flow.hasCandle" side>
              <span style="color: #FF6B2C; font-weight: 600">{{ formatCurrency(5) }}</span>
            </q-item-section>
          </q-item>

          <!-- Mensagem -->
          <q-item v-if="flow.topperMessage" class="q-pa-none q-mb-xs">
            <q-item-section avatar>
              <q-icon name="message" color="primary" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Mensagem</q-item-label>
              <q-item-label>{{ flow.topperMessage }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- Fotos -->
          <q-item v-if="flow.personalPhotos.length > 0" class="q-pa-none q-mb-xs">
            <q-item-section avatar>
              <q-icon name="photo_library" color="primary" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Fotos pessoais</q-item-label>
              <q-item-label>{{ flow.personalPhotos.length }} foto(s)</q-item-label>
            </q-item-section>
            <q-item-section side>
              <span style="color: #FF6B2C; font-weight: 600">{{ formatCurrency(photosPrice) }}</span>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator />

      <!-- Total -->
      <q-card-section class="text-center">
        <div class="text-caption text-grey-6 q-mb-xs">Total do pedido</div>
        <div style="font-size: 28px; font-weight: 800; color: #FF6B2C">
          {{ formatCurrency(total) }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FlowState } from 'src/types'
import { formatCurrency } from 'src/utils/formatters'
import {
  calcCakePrice,
  calcSavoryPrice,
  calcSweetPrice,
  calcPhotosPrice,
  calcItemTotal,
} from 'src/utils/priceCalculator'

const props = defineProps<{ flow: FlowState }>()

const cakePrice = computed(() =>
  props.flow.cakeFlavor && props.flow.cakeWeightKg
    ? calcCakePrice(props.flow.cakeFlavor.id, props.flow.cakeWeightKg)
    : 0
)
const savoryPrice = computed(() => calcSavoryPrice(props.flow.savoryQty))
const sweetPrice = computed(() => calcSweetPrice(props.flow.sweetQty))
const photosPrice = computed(() => calcPhotosPrice(props.flow.personalPhotos.length))
const total = computed(() => calcItemTotal(props.flow))
</script>
