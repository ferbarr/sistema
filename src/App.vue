<template>
  <v-app>
    <v-main>
      <NavBarComponent permanent/>
      <router-view />
      <BottomNavigation app/>
    </v-main>
  </v-app>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    NavBarComponent: defineAsyncComponent(() =>
      import("./components/NavBarComponent.vue")
    ),
    BottomNavigation: defineAsyncComponent(() =>
      import("./components/BottomNavigation.vue")
    ),
  },
  name: "App",
};
</script>
