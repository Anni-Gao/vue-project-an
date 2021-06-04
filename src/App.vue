<template>
  <div id="app">
    <router-view id="router" :key="$route.path" />
    <alertdialog v-if="exception.length > 0" />
  </div>
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { mapState } from "vuex";
const alertdialog = defineAsyncComponent(
  () => import("@/components/AlertDialog.vue")
);
export default defineComponent({
  components: { alertdialog },
  computed: {
    ...mapState(["exception"]),
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
