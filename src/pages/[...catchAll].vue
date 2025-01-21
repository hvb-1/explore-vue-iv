<script setup lang="ts">
import { useErrorStore } from '@/stores/error'
import AppErrorPage from '../components/AppError/AppErrorPage.vue'

useErrorStore().setError({ error: 'Page not found...', customCode: 404 })
</script>

<template>
  <AppErrorPage />
</template>
