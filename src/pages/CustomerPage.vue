<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader />

    <q-page-container>
      <q-page class="q-pa-sm q-pa-md-xl">
        <!-- SEÇÃO 1 — BUSCA -->
        <section class="q-mb-lg">
          <div class="section-title q-mb-sm">O que você deseja pedir? 🎂</div>
          <q-input
            v-model="searchInput"
            outlined
            rounded
            placeholder="Pesquise bolos, salgados, kits..."
            class="jf-search-input"
            clearable
            @update:model-value="onSearch"
          >
            <template #prepend>
              <q-icon name="search" color="primary" />
            </template>
          </q-input>
        </section>

        <!-- SEÇÃO 2 — PRODUTOS -->
        <section class="q-mb-xl">
          <div class="section-title q-mb-md">
            <template v-if="searchInput">
              Resultados para: "<span class="text-primary">{{ searchInput }}</span>"
            </template>
            <template v-else>Mais pedidos ✨</template>
          </div>

          <!-- Grid de produtos -->
          <div v-if="productStore.displayedProducts.length > 0" class="row q-col-gutter-md">
            <div
              v-for="product in productStore.displayedProducts"
              :key="product.id"
              class="col-12 col-sm-6 col-md-4"
            >
              <ProductCard :product="product" @personalize="openFlow" />
            </div>
          </div>

          <!-- Estado vazio -->
          <div v-else class="text-center q-py-xl">
            <q-icon name="search_off" size="64px" color="grey-3" />
            <div class="text-h6 text-grey-5 q-mt-md">
              Nenhum produto encontrado para "{{ searchInput }}"
            </div>
          </div>
        </section>

        <!-- SEÇÃO 3 — CARRINHO -->
        <section v-if="orderStore.hasItems" class="q-mb-xl cart-section q-pa-lg">
          <div class="row items-center q-mb-md">
            <q-icon name="shopping_bag" color="primary" size="24px" class="q-mr-sm" />
            <div class="section-title">Meu pedido</div>
            <q-badge
              color="primary"
              :label="orderStore.totalItems"
              class="q-ml-sm"
              style="font-size: 12px; padding: 4px 8px"
            />
          </div>

          <OrderItemCard
            v-for="item in orderStore.orderItems"
            :key="item.id"
            :item="item"
            @remove="orderStore.removeItem"
          />

          <!-- Total do carrinho -->
          <q-separator class="q-my-md" />
          <div class="row justify-between items-center">
            <span class="text-weight-semibold" style="color: #6B4C3B">Total</span>
            <span style="font-size: 22px; font-weight: 800; color: #FF6B2C">
              {{ orderStore.totalPrice }}
            </span>
          </div>
        </section>
      </q-page>
    </q-page-container>

    <!-- RODAPÉ FIXO — aparece só quando há itens -->
    <q-footer v-if="orderStore.hasItems" class="jf-footer">
      <div class="row items-center q-gutter-x-md">
        <div class="col">
          <div class="text-caption" style="color: #6B4C3B">
            {{ orderStore.totalItems }} {{ orderStore.totalItems === 1 ? 'item' : 'itens' }}
          </div>
          <div class="text-weight-bold text-primary" style="font-size: 18px">
            {{ orderStore.totalPrice }}
          </div>
        </div>
        <q-btn
          label="Finalizar Pedido"
          icon="check_circle"
          color="positive"
          unelevated
          size="md"
          style="border-radius: 12px; font-weight: 700; padding: 10px 24px"
          @click="orderStore.openCheckout"
        />
      </div>
    </q-footer>

    <!-- Dialogs -->
    <PersonalizationDialog />
    <CheckoutDialog />
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useProductStore } from 'src/stores/useProductStore'
import { useOrderStore } from 'src/stores/useOrderStore'
import AppHeader from 'src/components/AppHeader.vue'
import ProductCard from 'src/components/ProductCard.vue'
import OrderItemCard from 'src/components/OrderItemCard.vue'
import PersonalizationDialog from 'src/components/PersonalizationDialog.vue'
import CheckoutDialog from 'src/components/CheckoutDialog.vue'
import type { Product } from 'src/types'

const productStore = useProductStore()
const orderStore = useOrderStore()

const searchInput = ref('')
let searchTimeout: ReturnType<typeof setTimeout> | null = null

function onSearch(val: string | number | null) {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    productStore.setSearchQuery(String(val ?? ''))
  }, 300)
}

function openFlow(product: Product) {
  orderStore.startFlow(product)
}
</script>
