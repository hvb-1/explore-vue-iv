<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '../../../database/types'
const tasks = ref<Tables<'tasks'>[] | null>(null)

;(async () => {
  console.log('Getting projects...')
  const { data, error } = await supabase.from('tasks').select()

  if (error) {
    console.error(error)
    return
  }
  tasks.value = data
})()
</script>
<template>
  <div>
    <h1>Tasks Page</h1>
    <RouterLink to="/">To Home</RouterLink>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <RouterLink :to="`/tasks/${task.id}`">{{ task.name }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
