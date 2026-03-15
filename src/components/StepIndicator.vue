<template>
  <div class="flex flex-center q-gutter-x-xs">
    <div
      v-for="i in total"
      :key="i"
      class="step-dot"
      :class="{
        active: i === current,
        completed: i < current,
      }"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  current: number
  total: number
}>()
</script>
