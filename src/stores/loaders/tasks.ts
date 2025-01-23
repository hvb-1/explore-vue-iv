import { taskQuery, tasksWithProjectQuery, updateTaskQuery } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'
import type { Task, TasksWithProject } from '@/utils/supaQueries'

export const useTasksStore = defineStore('tasks-store', () => {
    const tasks = ref<TasksWithProject | null>(null)
    const task = ref<Task | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const loadTasks = useMemoize(async (id: string) => await tasksWithProjectQuery)
    const loadTask = useMemoize(async (id: string) => await taskQuery(id))

    interface ValidateCacheParams {
        ref: typeof tasks | typeof task
        query: typeof tasksWithProjectQuery | typeof taskQuery
        key: string
        loaderFn: typeof loadTasks | typeof loadTask
    }
    const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
        const finalQuery = typeof query === 'function' ? query(key) : query
        if (ref.value) {
            finalQuery.then(({ data, error }) => {
                if (JSON.stringify(ref.value) === JSON.stringify(data)) {
                    return
                } else {
                    loaderFn.delete(key)
                    if (!error && data) ref.value = data
                }
            })
        }
    }

    const getTasks = async () => {
        tasks.value = null
        const { data, error, status } = await loadTasks('projects')

        if (error) useErrorStore().setError({ error, customCode: status })

        if (data) tasks.value = data

        validateCache({
            ref: tasks,
            query: tasksWithProjectQuery,
            key: 'tasks',
            loaderFn: loadTasks,
        })
    }

    const getTask = async (id: string) => {
        task.value = null
        const { data, error, status } = await loadTask(id)

        if (error) useErrorStore().setError({ error, customCode: status })

        if (data) task.value = data

        validateCache({
            ref: task,
            query: taskQuery,
            key: id,
            loaderFn: loadTask,
        })
    }

    const updateTask = async () => {
        if (!task.value) return
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { projects, id, ...taskProps } = task.value
        await updateTaskQuery(taskProps, task.value.id)
    }

    return {
        tasks,
        getTasks,
        getTask,
        task,
        updateTask,
    }
})
