<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
       
        <v-card class="mb-4">
          <v-card-title>
            <h2>Todo</h2>
          </v-card-title>
          <v-card-text>
            <button @click="funShowtodo" color="primary" class="mb-4">
              Add New Todo
            </button>
            
              <v-card v-if="showFormtodo" class="mb-4">
                <TodoForm :userId="userId" />
              </v-card>
            <br>
            <v-list>
              <v-list-item v-for="item in paginatedTodos" :key="item.id">
             
                  <v-list-item>
                     {{ item.title }}
                  </v-list-item>
                  <v-list-item-subtitle :style="{ color: item.completed ? '#28a745' : '#dc3545' }">
                   <strong>{{ item.completed ? 'Completed' : 'Pending' }}</strong> 
                  </v-list-item-subtitle>
                
              </v-list-item>
            </v-list>
            <v-btn @click="nextTodoPage" :disabled="!hasMoreTodos" color="primary" class="mb-4">
              More Todos
            </v-btn>
          </v-card-text>
        </v-card>

       
        <v-card class="mb-4">
          <v-card-title>
            <h2>Post</h2>
          </v-card-title>
          <v-card-text>
            <button @click="funShow" color="primary" class="mb-4">
              Add New Post
            </button>
            <br>
              <v-card v-if="showForm" class="mb-4">
                <PostForm :userId="userId" />
              </v-card>
            
            <v-list>
              <v-list-item v-for="item in paginatedPosts" :key="item.id">
                <v-list-item>
                
                    <strong>{{ item.title }}</strong>
                  </v-list-item>
                  <v-list-item-subtitle>
                    {{ item.id }} {{ item.body }}
                  </v-list-item-subtitle>
                </v-list-item>
             
            </v-list>
            <v-btn @click="nextPostPage" :disabled="!hasMorePosts" color="primary" class="mb-4">
              More Posts
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import TodoForm from "./TodoForm.vue";
import PostForm from "./PostForm.vue";

const route = useRoute();
const userId = route.params.userId;

const todos = ref([]);
const posts = ref([]);

const todoPage = ref(0);
const postPage = ref(0);
const itemsPerPage = 5

const showForm = ref(false);
const showFormtodo = ref(false);

onMounted(async () => {
  const responseTodos = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
  todos.value = await responseTodos.json();
console.log("todo:  ",todos.value);
  const responsePosts = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
  posts.value = await responsePosts.json();
});

const paginatedTodos = computed(() => {
  const start = todoPage.value * itemsPerPage;
  return todos.value.slice(start, start + itemsPerPage);
});

const paginatedPosts = computed(() => {
  const start = postPage.value * itemsPerPage;
  return posts.value.slice(start, start + itemsPerPage);
});

const hasMoreTodos = computed(() => {
  return (todoPage.value + 1) * itemsPerPage < todos.value.length;
});

const hasMorePosts = computed(() => {
  return (postPage.value + 1) * itemsPerPage < posts.value.length;
});

const nextTodoPage = () => {
  if (hasMoreTodos.value) {
    todoPage.value += 1;
  }
};

const nextPostPage = () => {
  if (hasMorePosts.value) {
    postPage.value += 1;
  }
};

const funShow = () => {
  console.log(!showForm.value)
  showForm.value = !showForm.value;
};

const funShowtodo =()=>{
  showFormtodo.value = !showFormtodo.value;

}
</script>


