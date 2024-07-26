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
      <tr
      v-for="users in user" :key="users.id"
      >
        <td>{{ users.name}}</td>
        <td>{{  users.email }}</td>
        <td>{{   users.phone }}</td>
        <td>{{users.address.city}}</td>
        <td>{{users.website}}</td>
        <td> <button rounded="xl" color="success" block variant="outlined" @click="gettodo(users.id) ">ToDo's</button></td>
      </tr>
    </tbody>
  </v-table>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const user =ref([]);
onMounted(async()=>{
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  user.value = await response.json();
  console.log('object',user.value);
})

const gettodo =(userId)=>{
  console.log(userId);
router.push({name:'userDetails', params:{userId}})
}
</script>