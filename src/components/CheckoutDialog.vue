<template>
  <q-dialog
    v-model="orderStore.checkoutOpen"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card style="min-width: 320px; max-width: 480px; width: 100%; border-radius: 20px">
      <!-- Cabeçalho -->
      <q-card-section class="row items-center q-pb-none">
        <div class="flex items-center q-gutter-x-sm">
          <span style="font-size: 28px">💬</span>
          <div>
            <div class="text-h6 text-weight-bold text-dark">Confirmar pedido</div>
            <div class="text-caption" style="color: #6B4C3B">Jacque Festas</div>
          </div>
        </div>
        <q-space />
        <q-btn flat round icon="close" color="grey-7" dense @click="orderStore.closeCheckout" />
      </q-card-section>

      <!-- Itens do carrinho -->
      <q-scroll-area style="max-height: 440px">
        <q-card-section>
          <div v-for="(item, idx) in orderStore.orderItems" :key="item.id">
            <div class="row justify-between items-start q-mb-sm">
              <div class="col">
                <div class="text-weight-bold text-primary" style="font-size: 15px">
                  {{ idx + 1 }}. {{ item.flow.product.name }}
                </div>
                <!-- Detalhes Literais Completos -->
                <ItemDetails :flow="item.flow" />
              </div>
              <div class="text-weight-bold text-primary q-ml-md" style="white-space: nowrap; font-size: 15px">
                {{ formatCurrency(item.finalPrice) }}
              </div>
            </div>
            <q-separator v-if="idx < orderStore.orderItems.length - 1" class="q-my-md" />
          </div>

          <!-- Total geral -->
          <q-separator class="q-my-md" />
          <div class="row justify-between items-center">
            <div class="text-weight-bold text-dark" style="font-size: 15px">TOTAL GERAL</div>
            <div style="font-size: 24px; font-weight: 800; color: #FF6B2C">
              {{ orderStore.totalPrice }}
            </div>
          </div>
        </q-card-section>
      </q-scroll-area>

      <!-- Observações -->
      <q-card-section class="q-pt-none">
        <q-input
          v-model="observations"
          outlined
          type="textarea"
          dense
          label="Observações adicionais"
          placeholder="Alergias, preferências, data de entrega desejada..."
          rows="3"
          style="border-radius: 12px"
        />
      </q-card-section>

      <!-- Botões -->
      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat label="Cancelar" color="grey-7" @click="orderStore.closeCheckout" />
        <q-btn
          label="Enviar pelo WhatsApp"
          icon="chat"
          class="btn-whatsapp"
          unelevated
          style="border-radius: 12px; font-weight: 600"
          @click="sendWhatsApp"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useOrderStore } from 'src/stores/useOrderStore'
import { formatCurrency } from 'src/utils/formatters'
import { buildMessage, buildWhatsAppUrl } from 'src/utils/whatsappMessage'
import { TOPPER_PRICE } from 'src/data/mockData'

const $q = useQuasar()
const orderStore = useOrderStore()
const observations = ref('')

// Sub-componente interno para os detalhes literais
const ItemDetails = {
  props: ['flow'],
  setup() {
    return { formatCurrency, TOPPER_PRICE }
  },
  template: `
    <div class="item-details-list q-mt-xs">
      <div v-if="flow.selectedReadyKit" class="detail-row">
        <b>Kit:</b> {{ flow.selectedReadyKit.name }}
      </div>
      <div v-if="flow.cakeFlavor" class="detail-row">
        <b>Bolo:</b> {{ flow.cakeFlavor.name }} • {{ flow.cakeWeightKg }}kg • Massa {{ flow.cakeMass }}
      </div>
      <div v-if="flow.savoryQty > 0" class="detail-row">
        <b>Salgados:</b> {{ flow.savoryQty }} unid.
        <div class="q-ml-sm text-grey-8" v-for="g in flow.savoryGroups" :key="g.id">
          - 25 {{ g.flavor.name }}
        </div>
      </div>
      <div v-if="flow.sweetQty > 0" class="detail-row">
        <b>Docinhos:</b> {{ flow.sweetQty }} unid.
        <div class="q-ml-sm text-grey-8" v-for="g in flow.sweetGroups" :key="g.id">
          - 25 {{ g.flavor.name }}
        </div>
      </div>
      <div v-if="flow.themeType" class="detail-row">
        <b>Tema:</b> {{ flow.themeType === 'pronto' ? 'Pronto (' + (flow.topper?.name || '') + ')' : 'Personalizado' }}
      </div>
      <div v-if="flow.hasCandle" class="detail-row">
        <b>Vela:</b> Sim ({{ flow.candleAge }} anos)
      </div>
      <div v-if="flow.topperMessage" class="detail-row">
        <b>Mensagem:</b> {{ flow.topperMessage }}
      </div>
      <div v-if="flow.personalPhotos.length > 0" class="detail-row text-orange text-weight-bold">
        📍 {{ flow.personalPhotos.length }} foto(s) anexada(s)
      </div>
      <div v-if="flow.customThemeImg" class="detail-row text-orange text-weight-bold">
        📍 Imagem de referência anexada
      </div>
    </div>
  `
}

function sendWhatsApp() {
  const message = buildMessage(orderStore.orderItems, observations.value)
  const url = buildWhatsAppUrl(message)
  window.open(url, '_blank')

  orderStore.clearOrder()
  observations.value = ''

  $q.notify({
    type: 'positive',
    message: 'Pedido enviado com sucesso! 🎉',
    position: 'top',
    timeout: 3000,
  })
}
</script>

<style scoped>
.item-details-list {
  font-size: 13px;
  line-height: 1.4;
  color: #2C1A0E;
}
.detail-row {
  margin-bottom: 2px;
}
</style>
