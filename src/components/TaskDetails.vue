<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <button type="button" @click="taskStore.deleteTask(task.id)">
        <i class="material-icons">delete</i>
      </button>
      <button type="button" @click="taskStore.toggleFav(task.id)">
        <i class="material-icons" :class="{ active: task.isFav }">favorite</i>
      </button>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from '../stores/TaskStore'

export default {
  props: ['task'],
  setup() {
    const taskStore = useTaskStore()

    return {
      taskStore,
    }
  },
}
</script>
