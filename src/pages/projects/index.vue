<script setup lang="ts">
import { useCollabs } from '@/composables/collabs'
import { columns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects'

const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()

const { getGroupedCollabs, groupedCollabs } = useCollabs()
getGroupedCollabs(projects.value)
//const test = await getProfilesByIds(projects.value[0].collaborators)

//console.log('TEST :: ', test)
const columnsWithCollabs = columns(groupedCollabs)
// getGroupedCollabs(projects.value)
</script>

<template>
    <DataTable v-if="projects" :columns="columnsWithCollabs" :data="projects" />
</template>
