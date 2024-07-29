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
                <v-list-item>{{ item.title }}</v-list-item>
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
                <v-list-item><strong>{{ item.title }}</strong></v-list-item>
                <v-list-item-subtitle>{{ item.id }} {{ item.body }}</v-list-item-subtitle>
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

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from "vue-router";
import TodoForm from "./TodoForm.vue";
import PostForm from "./PostForm.vue";

export default defineComponent( {
  name: 'UserDetails',
  components: {
    TodoForm,
    PostForm
  },
  data() {
    return {
      userId:'',
      todos: [],
      posts: [],
      todoPage: 0,
      postPage: 0,
      itemsPerPage: 5,
      showForm: false,
      showFormtodo: false
    };
  },
  computed: {
    paginatedTodos():any{
      const start = this.todoPage * this.itemsPerPage;
      return this.todos.slice(start, start + this.itemsPerPage);
    },
    paginatedPosts():any {
      const start = this.postPage * this.itemsPerPage;
      return this.posts.slice(start, start + this.itemsPerPage);
    },
    hasMoreTodos():any {
      return (this.todoPage + 1) * this.itemsPerPage < this.todos.length;
    },
    hasMorePosts():any {
      return (this.postPage + 1) * this.itemsPerPage < this.posts.length;
    },
    gettodo():any{
    const todo= this.$store.state.todo.getTodo
      return todo
    }
   
  },
  methods: {
    async fetchData() {
      const responseTodos = await fetch(`https://jsonplaceholder.typicode.com/users/${this.userId}/todos`);
      this.todos = await responseTodos.json();
      this.$store.dispatch('getTodo',{userId:this.userId});
      console.log("todo:  ", this.todos);

      const responsePosts = await fetch(`https://jsonplaceholder.typicode.com/users/${this.userId}/posts`);
      this.posts = await responsePosts.json();
    },
    nextTodoPage():void {
      if (this.hasMoreTodos) {
        this.todoPage += 1;
      }
    },
    nextPostPage():void {
      if (this.hasMorePosts) {
        this.postPage += 1;
      }
    },
    funShow():void {
      this.showForm = !this.showForm;
    },
    funShowtodo():void {
      this.showFormtodo = !this.showFormtodo;
    }
  },
  mounted() {
    const route = useRoute();
    this.userId = route.params.userId;
    this.fetchData();


  }
});
</script>

