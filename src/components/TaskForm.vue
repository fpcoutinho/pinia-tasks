<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to..." v-model="newTask" />
    <button type="button">Add</button>
  </form>
</template>

<script>
import { useTaskStore } from '../stores/TaskStore'
import { ref } from 'vue'

export default {
  setup() {
    const taskStore = useTaskStore()
    const newTask = ref('')

    const handleSubmit = () => {
      if (newTask.value.length <= 0) return

      taskStore.addTask(newTask.value)
      newTask.value = ''
    }

    return {
      newTask,
      handleSubmit,
    }
  },
}
</script>
