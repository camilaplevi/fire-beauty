<script lang="ts">
import { ref, defineComponent } from 'vue';
import HeaderComponent from 'src/components/HeaderComponent.vue';

export default defineComponent({
  components: { HeaderComponent },
  setup() {
    const titleDashboard = ref('TITULO')

    return {
      titleDashboard
    }
  }
})

/*const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}*/
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderComponent></HeaderComponent>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
