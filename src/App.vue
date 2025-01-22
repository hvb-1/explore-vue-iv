<script setup lang="ts">
import AppErrorPage from './components/AppError/AppErrorPage.vue'
import { supabase } from './lib/supabaseClient'
import { useAuthStore } from './stores/auth'

import { useErrorStore } from './stores/error'

const errorStore = useErrorStore()

onErrorCaptured((error) => {
  errorStore.setError({ error })
})

onMounted(() => {
  useAuthStore().trackAuthChanges()
})
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="errorStore.activeError" />

    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component">
        <Component :is="Component" :key="route.name" />
        <template #fallback>
          <span>Loading...</span>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
