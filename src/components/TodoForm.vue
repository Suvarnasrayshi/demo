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

<script>
export default {
  name: 'PostForm',
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      title: '',
      completed: false
    };
  },
  methods: {
    async submitTodo() {
      const newTodo = {
        title: this.title,
        competed:this.completed,
        userId: this.userId
      };
      this.$store.dispatch('fetchTodo',{newTodo:newTodo});

      this.title = '';
      this.body = '';
    }
  },
  mounted() {
  },
};
</script> 