<template>
  <q-card class="cart-item-card q-mb-sm" flat>
    <q-card-section class="q-pa-md">
      <div class="row items-start no-wrap">
        <div class="col">
          <!-- Nome + categoria -->
          <div class="text-weight-bold" style="font-size: 15px; color: #2C1A0E">
            {{ item.flow.product.name }}
          </div>
          <!-- Resumo das escolhas -->
          <div class="text-caption q-mt-xs" style="color: #6B4C3B">
            {{ item.summary }}
          </div>
        </div>
        <!-- Valor -->
        <div class="q-ml-md text-right">
          <div class="text-weight-bold text-primary" style="font-size: 16px; white-space: nowrap">
            {{ formatCurrency(item.finalPrice) }}
          </div>
        </div>
      </div>

      <!-- Ações -->
      <div class="row q-gutter-x-sm q-mt-sm">
        <q-btn
          flat
          dense
          label="Ver detalhes"
          color="primary"
          icon="info_outline"
          size="sm"
          style="border-radius: 8px"
          @click="showDetails = true"
        />
        <q-btn
          flat
          dense
          icon="delete_outline"
          color="negative"
          size="sm"
          style="border-radius: 8px"
          @click="$emit('remove', item.id)"
        />
      </div>
    </q-card-section>
  </q-card>

  <!-- Dialog de detalhes -->
  <q-dialog v-model="showDetails">
    <q-card style="min-width: 300px; max-width: 480px; border-radius: 16px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">{{ item.flow.product.name }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-list dense>
          <q-item v-if="item.flow.cakeFlavor">
            <q-item-section>
              <q-item-label caption>Bolo</q-item-label>
              <q-item-label>
                {{ item.flow.cakeFlavor.name }} •
                {{ item.flow.cakeWeightKg }}kg •
                Massa {{ item.flow.cakeMass }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="item.flow.savoryQty > 0">
            <q-item-section>
              <q-item-label caption>Salgados</q-item-label>
              <q-item-label>{{ item.flow.savoryQty }} unidades</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="item.flow.sweetQty > 0">
            <q-item-section>
              <q-item-label caption>Docinhos</q-item-label>
              <q-item-label>{{ item.flow.sweetQty }} unidades</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="item.flow.themeType">
            <q-item-section>
              <q-item-label caption>Tema</q-item-label>
              <q-item-label>
                {{ item.flow.themeType === 'pronto' ? `Pronto — ${item.flow.topper?.name}` : 'Personalizado' }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="item.flow.hasCandle">
            <q-item-section>
              <q-item-label caption>Vela</q-item-label>
              <q-item-label>Sim</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="item.flow.topperMessage">
            <q-item-section>
              <q-item-label caption>Mensagem</q-item-label>
              <q-item-label>{{ item.flow.topperMessage }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="item.flow.personalPhotos.length > 0">
            <q-item-section>
              <q-item-label caption>Fotos pessoais</q-item-label>
              <q-item-label>{{ item.flow.personalPhotos.length }} foto(s)</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator class="q-my-md" />

        <div class="text-center">
          <div style="font-size: 22px; font-weight: 700; color: #FF6B2C">
            {{ formatCurrency(item.finalPrice) }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { OrderItem } from 'src/types'
import { formatCurrency } from 'src/utils/formatters'

defineProps<{ item: OrderItem }>()
defineEmits<{ remove: [id: string] }>()

const showDetails = ref(false)
</script>
