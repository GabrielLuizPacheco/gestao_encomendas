import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { products } from 'src/data/mockData'
import type { Product } from 'src/types'

export const useProductStore = defineStore('product', () => {
  const productList = ref<Product[]>(products)
  const searchQuery = ref('')

  const displayedProducts = computed(() => {
    if (!searchQuery.value.trim()) {
      return [...productList.value].sort((a, b) => b.popularity - a.popularity)
    }
    const q = searchQuery.value.toLowerCase()
    return productList.value.filter((p) =>
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    )
  })

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function clearSearch() {
    searchQuery.value = ''
  }

  return { productList, searchQuery, displayedProducts, setSearchQuery, clearSearch }
})
