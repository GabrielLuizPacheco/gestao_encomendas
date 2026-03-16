<template>
  <div class="q-pa-md">
    <div class="text-h6 text-weight-bold text-dark q-mb-md">Escolha o topper</div>

    <!-- Busca -->
    <q-input
      v-model="search"
      outlined
      dense
      placeholder="Buscar topper..."
      class="q-mb-md"
      clearable
    >
      <template #prepend><q-icon name="search" /></template>
    </q-input>

    <!-- Abas de gênero -->
    <q-tabs
      v-model="activeTab"
      dense
      active-color="primary"
      indicator-color="primary"
      align="justify"
      class="q-mb-md"
    >
      <q-tab name="feminino" label="Feminino" icon="female" />
      <q-tab name="masculino" label="Masculino" icon="male" />
      <q-tab name="neutro" label="Neutro" icon="people" />
    </q-tabs>

    <!-- Grid de toppers -->
    <div class="row q-col-gutter-sm q-mb-lg">
      <div
        v-for="topper in filteredToppers"
        :key="topper.id"
        class="col-6 col-sm-4"
      >
        <div
          class="topper-card q-pa-sm text-center"
          :class="{ selected: modelTopper?.id === topper.id }"
          @click="$emit('update:modelTopper', topper)"
        >
          <q-img :src="topper.image" :ratio="1" style="border-radius: 10px; margin-bottom: 6px">
            <template #error>
              <div class="absolute-full flex flex-center bg-orange-1">
                <q-icon name="celebration" size="32px" color="primary" />
              </div>
            </template>
          </q-img>
          <div style="font-size: 12px; font-weight: 600; color: #2C1A0E">{{ topper.name }}</div>
          <q-icon v-if="modelTopper?.id === topper.id" name="check_circle" color="primary" size="16px" class="q-mt-xs" />
        </div>
      </div>
      <div v-if="filteredToppers.length === 0" class="col-12 text-center q-py-lg">
        <q-icon name="search_off" size="36px" color="grey-4" />
        <div class="text-caption text-grey-5 q-mt-sm">Nenhum topper encontrado</div>
      </div>
    </div>

    <!-- Vela -->
    <q-toggle
      :model-value="modelCandle"
      label="Adicionar vela? (+R$ 15,00) 🕯️"
      color="primary"
      class="q-mb-sm"
      @update:model-value="$emit('update:modelCandle', $event)"
    />

    <q-input
      v-if="modelCandle"
      :model-value="modelCandleAge"
      type="number"
      outlined
      dense
      label="Qual a idade ou mês na vela?"
      class="q-mb-md animate__animated animate__fadeIn"
      style="max-width: 200px"
      @update:model-value="$emit('update:modelCandleAge', $event ? parseInt($event as string) : null)"
    />

    <!-- Mensagem para topper -->
    <q-input
      :model-value="modelMessage"
      outlined
      dense
      label="Nome e mensagem para o topper"
      placeholder="Ex.: Ana — Feliz aniversário!"
      hint="Opcional"
      class="q-mb-md"
      @update:model-value="$emit('update:modelMessage', $event as string)"
    />

    <!-- Fotos pessoais (apenas se showPhotos) -->
    <template v-if="showPhotos">
      <div class="text-weight-semibold q-mb-sm" style="color: #6B4C3B">
        Adicionar fotos para impressão (opcional)
      </div>
      <q-file
        :model-value="modelPhotos"
        multiple
        accept="image/*"
        outlined
        dense
        label="Selecionar fotos"
        class="q-mb-xs"
        @update:model-value="onPhotosChange"
      >
        <template #prepend><q-icon name="add_photo_alternate" color="primary" /></template>
      </q-file>
      <div class="text-caption text-orange q-mb-sm">Cada foto impressa custa R$ 8,00</div>

      <!-- Miniaturas -->
      <div class="row q-gutter-sm q-mb-md">
        <div
          v-for="(photo, idx) in modelPhotos"
          :key="idx"
          class="photo-thumb"
        >
          <img :src="photoUrls[idx]" alt="foto" />
          <div class="remove-btn" @click="removePhoto(idx)">✕</div>
        </div>
      </div>
    </template>

    <!-- Preview de valor total -->
    <PricePreview
      :label="`Total acumulado`"
      :value="totalPrice"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { toppers } from 'src/data/mockData'
import type { Topper, TopperGender } from 'src/types'
import PricePreview from 'src/components/PricePreview.vue'

const props = defineProps<{
  modelTopper: Topper | null
  modelCandle: boolean
  modelCandleAge: number | null
  modelMessage: string
  modelPhotos: File[]
  totalPrice: number
  showPhotos?: boolean
}>()

const emit = defineEmits<{
  'update:modelTopper': [v: Topper]
  'update:modelCandle': [v: boolean]
  'update:modelCandleAge': [v: number | null]
  'update:modelMessage': [v: string]
  'update:modelPhotos': [v: File[]]
}>()

const search = ref('')
const activeTab = ref<TopperGender>('feminino')

const filteredToppers = computed(() => {
  return toppers.filter((t) => {
    const matchGender = t.gender === activeTab.value
    const matchSearch = !search.value || t.name.toLowerCase().includes(search.value.toLowerCase())
    return matchGender && matchSearch
  })
})

// URLs das fotos para preview
const photoUrls = ref<string[]>([])
watch(
  () => props.modelPhotos,
  (files) => {
    photoUrls.value = files.map((f) => URL.createObjectURL(f))
  },
  { immediate: true }
)

function onPhotosChange(files: File[] | File | null) {
  const arr = Array.isArray(files) ? files : files ? [files] : []
  emit('update:modelPhotos', [...props.modelPhotos, ...arr])
}

function removePhoto(idx: number) {
  const updated = [...props.modelPhotos]
  updated.splice(idx, 1)
  emit('update:modelPhotos', updated)
}
</script>
