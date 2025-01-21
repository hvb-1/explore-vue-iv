<script setup lang="ts">
import { tasksWithProjectQuery, type TasksWithProject } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'Tasks'

const tasks = ref<TasksWithProject | null>(null)
const getTasks = async () => {
  console.log('Getting tasks...')
  const { data, error } = await tasksWithProjectQuery

  if (error) {
    console.error(error)
    return
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
