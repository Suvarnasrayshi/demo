<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Email
        </th>
        <th class="text-left">
          Phone
        </th> 
        <th class="text-left">
          City
        </th>
        <th class="text-left">
          Website
        </th>
        <th class="text-left">
          More
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="users in user" :key="users">
        <td>{{users.name}}</td>
        <td>{{users.email}}</td>
        <td>{{users.phone}}</td>
        <td>{{users.address.city}}</td>
        <td>{{users.website}}</td>
        <td> <button rounded="xl" color="success" block variant="outlined" @click="gettodo(users.id) ">ToDo's</button></td>
      </tr>
    </tbody>
  </v-table>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent( {
  name:'User',
 mounted() {
this.$store.dispatch('fetchUsers');
},
computed: {
  user () :any{
      return this.$store.state.todo.users
    },
  },
  methods:{
    gettodo(userId:number){
  
    console.log(userId)
    this.$router.push({name:'userDetails',params:{userId}})
  }
}
})
</script> 