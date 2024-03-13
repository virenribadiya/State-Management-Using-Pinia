<template>
    <main>
        <!-- heading -->
        <header>
            <img src="./assets/pinia-logo.svg" alt="pinia logo">
            <h1>Pinia Tasks</h1>
            <!-- <h1>{{ TaskStore.name }}</h1> -->
        </header>

        <!-- new task form -->
        <div class="new-task-form">
            <TaskForm />
        </div>

        <!-- filter -->
        <nav class="filter">
            <button @click="filter = 'all'">All tasks</button>
            <button @click="filter = 'favs'">Fav tasks</button>
        </nav>

        <!-- loading -->
        <div class="loading" v-if="loading">
            Loading tasks ...
        </div>

        <!-- task list -->
        <div class="task-list" v-if="filter === 'all'">
            <p>you have {{ totalCount }} tasks left to do.</p>
            <div v-for="task in tasks">
                <TaskDetails :task="task" />
            </div>
        </div>

        <div class="task-list" v-if="filter === 'favs'">
            <p>you have {{ favCount }} favs left to do.</p>
            <div v-for="task in favs">
                <TaskDetails :task="task" />
            </div>
        </div>

        <button @click="TaskStore.$reset">reset state</button>

    </main>
</template>

<script>
import { useTaskStore } from './stores/TaskStore';
import TaskDetails from './components/TaskDetails.vue'
import { ref } from 'vue';
import TaskForm from './components/TaskForm.vue';
import { storeToRefs } from 'pinia';

export default {
    components: { TaskDetails, TaskForm },
    setup() {
        const TaskStore = useTaskStore();

        const { tasks, loading, totalCount, favs, favCount } = storeToRefs(TaskStore)

        // fetch tasks
        TaskStore.getTasks();


        const filter = ref('all')

        return { TaskStore, tasks, loading, totalCount, favs, favCount, filter };
    }
}
</script>