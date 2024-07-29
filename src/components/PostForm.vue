<template>
  <div>
    <form @submit.prevent="submitPost">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="title" id="title" required />
      </div>
      <div>
        <label for="body">Body:</label>
        <textarea v-model="body" id="body" required></textarea>
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
      body: ''
    };
  },
  methods: {
    async submitPost() {
      const newPost = {
        title: this.title,
        body: this.body,
        userId: this.userId
      };
      console.log("userid " + this.userId);
      this.$store.dispatch('fetchPost',{newPost:newPost});
    

      this.title = '';
      this.body = '';
    }
  }
};
</script> 