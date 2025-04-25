<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const homeText = ref('Início')
    const blogText = ref('Blog')
    const aboutText = ref('Sobre')
    const plansText = ref('Planos')
    const featuresText = ref('Funcionalidades')
    const titleHome = ref('A revolução no\nmundo da beleza\ne estética!')
    const subTextHome = ref('Já imaginou um lugar onde a beleza ganha vida de verdade? A FireBeauty é mais do que um app, é a primeira rede social feita para conectar você aos melhores profissionais do mercado. Aqui, você descobre tendências, agenda serviços com facilidade e ainda constrói sua reputação no mundo da estética.')

    return {
      homeText,
      blogText,
      aboutText,
      plansText,
      featuresText,
      titleHome,
      subTextHome

    }
  }
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-black">
      <q-toolbar class="q-px-md" style="height: 100px;">

        <img src="/src/assets/Logo horizontal preta 4.png" alt="Logo da FireBeauty"
          style="width: 141px !important; height: 49px !important; margin: 0 0 20px 30px;">

        <div class="row q-gutter-sm q-ml-auto items-center buttons-header" style="margin-right: 30px;">
          <q-btn flat label="Início" to="/inicio" active-class="active-link" />
          <q-btn flat label="Blog" to="/blog" active-class="active-link" />
          <q-btn flat label="Sobre" to="/sobre" active-class="active-link" />
          <q-btn flat label="Planos" to="/planos" active-class="active-link" />
          <q-btn flat label="Funcionalidades" to="/funcionalidades" active-class="active-link" />

          <q-btn label="Baixar agora" unelevated class="btn-baixar" />

        </div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.active-link {
  border-bottom: 2px solid #AD9B8E;
  border-radius: 0;
  color: #AD9B8E !important;
}

.btn-baixar {
  background-color: #AD9B8E !important;
  color: black !important;
}

.buttons-header::after {
  text-decoration: underline #AD9B8E;

}
</style>
