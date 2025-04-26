<script lang="ts">
import { ref, defineComponent } from 'vue'
import { buttonsIcons } from 'src/assets/icons/IconsButtons'
import CustomButton from 'src/components/CustomButton.vue';


export default defineComponent({
  components: { CustomButton },
  setup() {
    const homeText = ref('Início')
    const blogText = ref('Blog')
    const aboutText = ref('Sobre')
    const plansText = ref('Planos')
    const featuresText = ref('Funcionalidades')
    const textPolicy = ref('Politica de privacidade')
    const emailSupport = ref('support@firebeauty.com')
    const instagram = ref('Firebeautyoficial')
    const textRigths = ref('Todos os direitos reservados por FireBeauty')

    const rightDrawerOpen = ref(false)

    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value
    }

    return {
      homeText,
      blogText,
      aboutText,
      plansText,
      featuresText,
      textPolicy,
      emailSupport,
      instagram,
      textRigths,

      rightDrawerOpen,
      toggleRightDrawer,

      buttonsIcons


    }
  }
})
</script>

<template>
  <q-layout view="hhh Lpr fff">
    <q-header elevated class="bg-white text-black">
      <q-toolbar class="q-px-md" style="height: 100px; justify-content: space-between;">
        <img src="/src/assets/Logo horizontal preta 4.png" alt="Logo da FireBeauty"
          style="width: 141px !important; height: 49px !important; margin: 0 0 20px 30px;">

        <div class="row q-gutter-sm q-ml-auto items-center buttons-header desktop-menu" style="margin-right: 30px;">
          <q-btn flat label="Início" to="/inicio" active-class="active-link" />
          <q-btn flat label="Blog" to="/blog" active-class="active-link" />
          <q-btn flat label="Sobre" to="/sobre" active-class="active-link" />
          <q-btn flat label="Planos" to="/planos" active-class="active-link" />
          <q-btn flat label="Funcionalidades" to="/funcionalidades" active-class="active-link" />

          <q-btn label="Baixar agora" unelevated class="btn-baixar" />
        </div>

        <q-btn flat dense round icon="menu" aria-label="Menu" class="hamburger-menu" @click="toggleRightDrawer" style="display: none;
  margin-right: 15px;" />

      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" bordered side="right" behavior="mobile" class="bg-white">
      <q-list>
        <q-item clickable v-ripple to="/inicio" active-class="active-link">
          <q-item-section>{{ homeText }}</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/blog" active-class="active-link">
          <q-item-section>{{ blogText }}</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/sobre" active-class="active-link">
          <q-item-section>{{ aboutText }}</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/planos" active-class="active-link">
          <q-item-section>{{ plansText }}</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/funcionalidades" active-class="active-link">
          <q-item-section>{{ featuresText }}</q-item-section>
        </q-item>

        <q-item>
          <q-btn label="Baixar agora" unelevated class="btn-baixar full-width" />
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="footer" style="height: 355px; background-color: white; border-top:2px #ECECEC ;">
      <div class="row" style="justify-content: space-around; height: 255px; align-content: center;">
        <img src="/src/assets/images/logo-vertical-preta.png" alt="Logo FireBeauty"
          style="width: 117px; height: 191px;">
        <div class="column texts-footer" style="justify-content: end;">
          <p class="text-policy" style="font-family: Poppins; font-size: 22px; font-weight: 600; line-height: normal;">
            {{
              textPolicy }}</p>
          <p class="contatos">{{ emailSupport }}</p>
          <p class="contatos">{{ instagram }}</p>
        </div>
        <div class="buttons-container" style="display: flex; gap: 63px; padding: 75px 0 0 0;">
          <CustomButton type="playstore" :icon="buttonsIcons.playStore" iconAlt="Play Store" label="DOWNLOAD" />
          <CustomButton type="apple" :icon="buttonsIcons.appleStore" iconAlt="Apple Store" label="DOWNLOAD" />
        </div>
      </div>
      <hr>
      <div style="justify-content: center; display: flex; font-size: 16px; font-weight: 400; line-height: normal;">
        <p class="text-rigths">{{ textRigths }}</p>
      </div>

    </q-footer>
  </q-layout>
</template>


<style lang="scss" scoped>
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

.hamburger-menu {
  display: none;
}

@media (max-width: 790px) {
  .desktop-menu {
    display: none !important;
  }

  .hamburger-menu {
    display: block !important;
  }

  img {
    margin-left: 15px !important;
  }
}

/* Estilos para o drawer (menu lateral direito) */
.q-drawer {
  width: 250px !important;
}

.q-item {
  padding: 12px 16px;
}

.q-item__section {
  font-size: 16px;
}

.text-policy {
  color: $very-dark-brown;
}

.contatos {
  font-family: Poppins;
  font-size: 18px;
  font-weight: 400;
  line-height: normal;
  color: $dark-grey;
}

.text-rigths {
  color: $middle-brown;
}
</style>
