<script setup lang="ts">
import { useErrorStore } from '@/stores/error'
import { tasksWithProjectQuery, type TasksWithProject } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'Tasks'

const tasks = ref<TasksWithProject | null>(null)
const getTasks = async () => {
  console.log('Getting tasks...')
  const { data, error, status } = await tasksWithProjectQuery

  if (error) {
    useErrorStore().setError({ error, customCode: status })
  }
  tasks.value = data
}

await getTasks()
</script>
<template>
  <div>
    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
  </div>
</template>
