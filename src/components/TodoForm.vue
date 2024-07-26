<template>
  <div>
    <h2>Add New Todo</h2>
    <form @submit.prevent="submitTodo">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="title" id="title" required />
      </div>
      <div>
        <label for="completed">Completed:</label>
        <input type="checkbox" v-model="completed" id="completed" />
        
      </div>
      <button type="submit">Submit</button>
    </form>

  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  userId: Number,
});

const title = ref('');
const completed = ref(false);
console.log("OBJECTDATA",props.userId);
const submitTodo = async () => {
  const newTodo = {
    title: title.value,
    completed: completed.value,
    userId: props.userId,
  };

  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });

  const result = await response.json();
  console.log('Created Todo:', result);
  title.value = '';
  completed.value = false;
};
</script>