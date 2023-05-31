<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo" />
      <h1>{{ name }}</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <div class="filter">
      <button @click="filter = 'all'">All</button>
      <button @click="filter = 'favs'">Favs</button>
    </div>

    <!-- loading -->
    <div class="loading" v-if="loading">Loading tasks...</div>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <h4>You have {{ totalCount }} tasks left to do</h4>
      <div v-for="task in tasks">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <h4>You have {{ favCount }} favs left to do</h4>
      <div v-for="task in favs">
        <TaskDetails :task="task" />
      </div>
    </div>

    <button type="button" @click="taskStore.$reset">reset state</button>
  </main>
</template>

<script>
import { useTaskStore } from './stores/TaskStore'
import { ref } from 'vue'
import TaskDetails from './components/TaskDetails.vue'
import TaskForm from './components/TaskForm.vue'
import { storeToRefs } from 'pinia'

export default {
  name: 'Pinia Tasks',
  components: {
    TaskDetails,
    TaskForm,
  },
  setup() {
    const taskStore = useTaskStore()
    taskStore.getTasks()

    const filter = ref('all')

    const { tasks, loading, favs, totalCount, favCount, name } =
      storeToRefs(taskStore)

    return {
      taskStore,
      filter,
      tasks,
      loading,
      favs,
      totalCount,
      favCount,
      name,
    }
  },
}
</script>

<style></style>
