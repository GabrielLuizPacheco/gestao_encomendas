<template>
  <q-dialog
    v-model="orderStore.dialogOpen"
    :maximized="$q.screen.lt.sm"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
    @before-hide="orderStore.cancelFlow"
  >
    <q-card
      class="column no-wrap"
      :style="$q.screen.gt.xs ? 'max-width: 600px; width: 100%; border-radius: 24px; max-height: 90vh' : 'height: 100vh; border-radius: 0'"
    >
      <!-- Barra superior -->
      <div class="stepper-header row items-center no-wrap">
        <q-btn
          flat
          round
          icon="close"
          color="grey-7"
          size="sm"
          @click="orderStore.cancelFlow"
        />
        <div class="col text-center text-weight-bold q-px-sm" style="font-size: 16px; color: #2C1A0E">
          {{ flow?.product.name }}
        </div>
        <StepIndicator :current="currentStepIndex + 1" :total="steps.length" />
      </div>

      <!-- Corpo com scroll -->
      <q-scroll-area class="col" style="min-height: 200px">
        <transition :name="transitionName">
          <component
            :is="currentStep.component"
            v-if="currentStep"
            v-bind="currentStep.props"
            v-on="currentStep.events"
          />
        </transition>
      </q-scroll-area>

      <!-- Barra inferior -->
      <div class="stepper-footer row q-gutter-x-sm justify-end">
        <!-- Cancelar na 1ª etapa, Voltar nas demais -->
        <q-btn
          v-if="currentStepIndex === 0"
          flat
          label="Cancelar"
          color="grey-7"
          @click="orderStore.cancelFlow"
        />
        <q-btn
          v-else
          outline
          label="Voltar"
          color="primary"
          icon="arrow_back"
          class="col-auto q-px-sm"
          @click="goBack"
        />

        <!-- Continuar / Adicionar ao pedido -->
        <q-btn
          :label="isFinalStep ? ($q.screen.xs ? 'Adicionar' : 'Adicionar ao pedido') : 'Continuar'"
          :icon-right="isFinalStep ? 'shopping_bag' : 'arrow_forward'"
          color="primary"
          unelevated
          :disable="!canContinue"
          style="border-radius: 12px; font-weight: 600; white-space: nowrap"
          class="col"
          @click="goNext"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useOrderStore } from 'src/stores/useOrderStore'
import StepIndicator from 'src/components/StepIndicator.vue'
import StepOrderTypeA0 from 'src/components/steps/StepOrderTypeA0.vue'
import StepCakeFlavorA1 from 'src/components/steps/StepCakeFlavorA1.vue'
import StepCakeSizeA2 from 'src/components/steps/StepCakeSizeA2.vue'
import StepSnackBase from 'src/components/steps/StepSnackBase.vue'
import StepThemeTypeA5 from 'src/components/steps/StepThemeTypeA5.vue'
import StepReadyThemeA6A from 'src/components/steps/StepReadyThemeA6A.vue'
import StepCustomThemeA6B from 'src/components/steps/StepCustomThemeA6B.vue'
import StepSummaryFinal from 'src/components/steps/StepSummaryFinal.vue'
import { savoryFlavors, sweetFlavors } from 'src/data/mockData'
import { calcSavoryPrice, calcSweetPrice, calcItemTotal } from 'src/utils/priceCalculator'
import type { OrderType, ThemeType, CakeFlavor, CakeMass, Topper, FlavorGroup } from 'src/types'

const $q = useQuasar()
const orderStore = useOrderStore()

const flow = computed(() => orderStore.activeFlow)
const currentStepIndex = ref(0)
const transitionName = ref('slide-left')

// ---- Step definitions ----
type StepDef = {
  key: string
  component: unknown
  props: Record<string, unknown>
  events: Record<string, unknown>
  canContinue: () => boolean
}

const steps = computed<StepDef[]>(() => {
  if (!flow.value) return []
  const f = flow.value
  const category = f.product.category
  const isParty = category === 'festa-na-caixa'
  const isCake = category === 'bolo'
  const isSavory = category === 'salgado'
  const totalPrice = computed(() => calcItemTotal(f))

  const allSteps: StepDef[] = []

  // A0 — apenas Festa na Caixa
  if (isParty) {
    allSteps.push({
      key: 'A0',
      component: StepOrderTypeA0,
      props: { modelValue: f.orderType },
      events: {
        'update:modelValue': (v: OrderType) => orderStore.updateFlow({ orderType: v }),
      },
      canContinue: () => !!f.orderType,
    })
  }

  // A1 — Sabor do bolo (se não é kit pronto e (party ou bolo))
  if ((isParty && f.orderType === 'personalizado') || isCake) {
    allSteps.push({
      key: 'A1',
      component: StepCakeFlavorA1,
      props: { modelValue: f.cakeFlavor },
      events: {
        'update:modelValue': (v: CakeFlavor) => orderStore.updateCakeFlavor(v),
      },
      canContinue: () => !!f.cakeFlavor,
    })

    // A2 — Tamanho e massa
    allSteps.push({
      key: 'A2',
      component: StepCakeSizeA2,
      props: {
        flavor: f.cakeFlavor,
        modelWeight: f.cakeWeightKg,
        modelMass: f.cakeMass,
      },
      events: {
        'update:modelWeight': (v: number) => orderStore.updateFlow({ cakeWeightKg: v }),
        'update:modelMass': (v: CakeMass) => orderStore.updateFlow({ cakeMass: v }),
      },
      canContinue: () => !!f.cakeWeightKg && !!f.cakeMass,
    })
  }

  // A3 — Salgados (Festa na Caixa: do zero)
  if (isParty && f.orderType === 'personalizado') {
    allSteps.push({
      key: 'A3',
      component: StepSnackBase,
      props: {
        title: 'Quantos salgados você quer?',
        label: 'Salgados',
        flavors: savoryFlavors,
        calcPrice: calcSavoryPrice,
        modelQty: f.savoryQty,
        modelGroups: f.savoryGroups,
      },
      events: {
        'update:modelQty': (v: number) => orderStore.updateFlow({ savoryQty: v }),
        'update:modelGroups': (v: FlavorGroup[]) => orderStore.updateFlow({ savoryGroups: v }),
      },
      canContinue: () =>
        f.savoryQty > 0 &&
        f.savoryGroups.every((g) => g.flavorId !== null),
    })

    // A4 — Docinhos
    allSteps.push({
      key: 'A4',
      component: StepSnackBase,
      props: {
        title: 'Quantos docinhos você quer?',
        label: 'Docinhos',
        flavors: sweetFlavors,
        calcPrice: calcSweetPrice,
        modelQty: f.sweetQty,
        modelGroups: f.sweetGroups,
      },
      events: {
        'update:modelQty': (v: number) => orderStore.updateFlow({ sweetQty: v }),
        'update:modelGroups': (v: FlavorGroup[]) => orderStore.updateFlow({ sweetGroups: v }),
      },
      canContinue: () =>
        f.sweetQty > 0 &&
        f.sweetGroups.every((g) => g.flavorId !== null),
    })
  }

  // A5 — Tipo de tema (Party ou Bolo)
  if (isParty || isCake) {
    allSteps.push({
      key: 'A5',
      component: StepThemeTypeA5,
      props: { modelValue: f.themeType },
      events: {
        'update:modelValue': (v: ThemeType) => orderStore.updateFlow({ themeType: v }),
      },
      canContinue: () => !!f.themeType,
    })

    // A6A ou A6B
    if (f.themeType === 'pronto' || !f.themeType) {
      allSteps.push({
        key: 'A6A',
        component: StepReadyThemeA6A,
        props: {
          modelTopper: f.topper,
          modelCandle: f.hasCandle,
          modelMessage: f.topperMessage,
          modelPhotos: f.personalPhotos,
          totalPrice: totalPrice.value,
          showPhotos: isParty,
        },
        events: {
          'update:modelTopper': (v: Topper) => orderStore.updateFlow({ topper: v }),
          'update:modelCandle': (v: boolean) => orderStore.updateFlow({ hasCandle: v }),
          'update:modelMessage': (v: string) => orderStore.updateFlow({ topperMessage: v }),
          'update:modelPhotos': (v: File[]) => orderStore.updateFlow({ personalPhotos: v }),
        },
        canContinue: () => !!f.topper,
      })
    } else {
      allSteps.push({
        key: 'A6B',
        component: StepCustomThemeA6B,
        props: {
          modelCandle: f.hasCandle,
          modelMessage: f.topperMessage,
          modelThemeImg: f.customThemeImg,
          modelPhotos: f.personalPhotos,
          totalPrice: totalPrice.value,
        },
        events: {
          'update:modelCandle': (v: boolean) => orderStore.updateFlow({ hasCandle: v }),
          'update:modelMessage': (v: string) => orderStore.updateFlow({ topperMessage: v }),
          'update:modelThemeImg': (v: File | null) => orderStore.updateFlow({ customThemeImg: v }),
          'update:modelPhotos': (v: File[]) => orderStore.updateFlow({ personalPhotos: v }),
        },
        canContinue: () => true, // todos campos opcionais
      })
    }
  }

  // Salgado avulso (Fluxo C)
  if (isSavory) {
    allSteps.push({
      key: 'C1',
      component: StepSnackBase,
      props: {
        title: 'Quantos salgados você quer?',
        label: 'Salgados',
        flavors: savoryFlavors,
        calcPrice: calcSavoryPrice,
        modelQty: f.savoryQty,
        modelGroups: f.savoryGroups,
      },
      events: {
        'update:modelQty': (v: number) => orderStore.updateFlow({ savoryQty: v }),
        'update:modelGroups': (v: FlavorGroup[]) => orderStore.updateFlow({ savoryGroups: v }),
      },
      canContinue: () =>
        f.savoryQty > 0 &&
        f.savoryGroups.every((g) => g.flavorId !== null),
    })
  }

  // Etapa Final — Resumo
  allSteps.push({
    key: 'FINAL',
    component: StepSummaryFinal,
    props: { flow: f },
    events: {},
    canContinue: () => true,
  })

  return allSteps
})

const currentStep = computed(() => steps.value[currentStepIndex.value])
const isFinalStep = computed(() => currentStepIndex.value === steps.value.length - 1)
const canContinue = computed(() => currentStep.value?.canContinue() ?? false)

// Resetar ao abrir dialog
watch(
  () => orderStore.dialogOpen,
  (open) => { if (open) currentStepIndex.value = 0 }
)

function goNext() {
  if (isFinalStep.value) {
    orderStore.confirmItem()
    $q.notify({
      type: 'positive',
      message: 'Item adicionado ao pedido! 🎉',
      position: 'top',
      timeout: 2500,
    })
    return
  }
  transitionName.value = 'slide-left'
  // Pular A6B se tema pronto selecionado e vice-versa
  const nextRaw = currentStepIndex.value + 1
  const nextStep = steps.value[nextRaw]
  if (
    (nextStep?.key === 'A6A' && flow.value?.themeType === 'personalizado') ||
    (nextStep?.key === 'A6B' && flow.value?.themeType === 'pronto')
  ) {
    currentStepIndex.value = nextRaw + 1
  } else {
    currentStepIndex.value = nextRaw
  }
}

function goBack() {
  transitionName.value = 'slide-right'
  currentStepIndex.value = Math.max(0, currentStepIndex.value - 1)
}
</script>
