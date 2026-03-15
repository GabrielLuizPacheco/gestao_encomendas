<template>
  <div class="q-pa-md">
    <div class="text-h6 text-weight-bold text-dark q-mb-md">Descreva seu tema</div>

    <!-- Vela -->
    <q-toggle
      :model-value="modelCandle"
      label="Adicionar vela? (+R$ 5,00) 🕯️"
      color="primary"
      class="q-mb-md"
      @update:model-value="$emit('update:modelCandle', $event)"
    />

    <!-- Mensagem -->
    <q-input
      :model-value="modelMessage"
      outlined
      type="textarea"
      dense
      label="Nome e mensagem"
      placeholder="Ex.: Ana — Feliz aniversário!"
      hint="Opcional"
      rows="3"
      class="q-mb-md"
      @update:model-value="$emit('update:modelMessage', $event as string)"
    />

    <!-- Imagem de referência do tema -->
    <div class="text-weight-semibold q-mb-xs" style="color: #6B4C3B">
      Imagem de referência do tema (opcional)
    </div>
    <q-file
      :model-value="modelThemeImg"
      accept="image/*"
      outlined
      dense
      label="Enviar imagem"
      class="q-mb-xs"
      @update:model-value="onThemeImgChange"
    >
      <template #prepend><q-icon name="image" color="primary" /></template>
    </q-file>

    <!-- Miniatura do tema -->
    <div v-if="themeImgUrl" class="q-mb-md">
      <div class="photo-thumb" style="width: 100px; height: 100px">
        <img :src="themeImgUrl" alt="tema" />
        <div class="remove-btn" @click="removeThemeImg">✕</div>
      </div>
    </div>

    <!-- Fotos pessoais -->
    <div class="text-weight-semibold q-mb-xs" style="color: #6B4C3B">
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

    <!-- Preview de valor total -->
    <PricePreview :label="`Total acumulado`" :value="totalPrice" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PricePreview from 'src/components/PricePreview.vue'

const props = defineProps<{
  modelCandle: boolean
  modelMessage: string
  modelThemeImg: File | null
  modelPhotos: File[]
  totalPrice: number
}>()

const emit = defineEmits<{
  'update:modelCandle': [v: boolean]
  'update:modelMessage': [v: string]
  'update:modelThemeImg': [v: File | null]
  'update:modelPhotos': [v: File[]]
}>()

const themeImgUrl = ref<string | null>(null)
const photoUrls = ref<string[]>([])

watch(
  () => props.modelThemeImg,
  (f) => { themeImgUrl.value = f ? URL.createObjectURL(f) : null },
  { immediate: true }
)
watch(
  () => props.modelPhotos,
  (files) => { photoUrls.value = files.map((f) => URL.createObjectURL(f)) },
  { immediate: true }
)

function onThemeImgChange(file: File | File[] | null) {
  const f = Array.isArray(file) ? file[0] : file
  emit('update:modelThemeImg', f ?? null)
}

function removeThemeImg() {
  emit('update:modelThemeImg', null)
}

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
