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
  
   <script setup>
   import { ref, defineProps } from 'vue';
  
   const props = defineProps({
     userId: Number,
   });
  
  
   const title = ref('');
   const body = ref('');
   const submitPost = async () => {
     const newPost = {
       title: title.value,
       body: body.value,
       userId: props.userId,
      };
  console.log("userid"+props.userId);
  
     const response = await fetch('https:jsonplaceholder.typicode.com/posts', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(newPost), 
     });
  
     const result = await response.json();
     console.log('Created Post:', result);
  
  
  
     title.value = '';
     body.value = '';
   };
   </script>
