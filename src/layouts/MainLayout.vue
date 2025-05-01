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

    <q-footer class="footer bg-white q-pt-lg">
  <div class="row justify-around items-center q-py-lg">
    <div class="col-auto">
      <img src="/src/assets/images/logo-vertical-preta.png" alt="Logo FireBeauty" style="width: 117px; height: auto;">
    </div>
    
    <div class="column col-auto q-gutter-y-md">
      <router-link to="/privacidade" class="text-policy">
        {{ textPolicy }}
      </router-link>
      <div class="row items-center text-info">
        <q-icon name="mdi-email-outline" size="22px" class="q-mr-sm" />
        <span>{{ emailSupport }}</span>
      </div>
      <div class="row items-center text-info">
        <q-icon name="mdi-instagram" size="22px" class="q-mr-sm" />
        <span>{{ instagram }}</span>
      </div>
    </div>
    
    <div class="col-auto row q-gutter-x-lg buttons-container">
      <CustomButton type="playstore" :icon="buttonsIcons.playStore" iconAlt="Play Store" label="DOWNLOAD" />
      <CustomButton type="apple" :icon="buttonsIcons.appleStore" iconAlt="Apple Store" label="DOWNLOAD" />
    </div>
  </div>
  
  <q-separator color="grey-4" />
  
  <div class="row justify-center q-py-md">
    <p class="text-rigths text-center">{{ textRigths }}</p>
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

  .footer {
    background-color: $background-color !important;
    border-top: 1px solid #f9f9f9 !important;
  }

  .buttons-container {
    justify-content: center;
    gap: 16px;
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
  text-decoration: none;
  /* Remove sublinhado padrão */
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: $primary-dark;
    /* Cor quando hover */
    text-decoration: underline;
    /* Adiciona sublinhado no hover se desejar */
  }
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

.footer {
  border-top: 1px solid #ECECEC;
  
  .text-policy {
    font-family: Poppins;
    font-size: 22px;
    font-weight: 600;
    color: $very-dark-brown;
    text-decoration: none;
    
    &:hover {
      color: $primary-dark;
      text-decoration: underline;
    }
  }
  .text-info {
    color: $middle-grey !important;
  }
  
  .contatos {
    font-family: Poppins;
    font-size: 18px;
    font-weight: 400;
    color: $dark-grey;
  }
  
  .text-rigths {
    font-size: 16px;
    font-weight: 400;
    color: $middle-brown;
    margin: 0;
  }
}

@media (max-width: 1024px) {
  .footer {
    .row.justify-around {
      flex-direction: column;
      gap: 2rem;
      align-items: center;
      text-align: center;
    }
    
    .buttons-container {
      flex-direction: column;
      gap: 1rem !important;
      padding: 1rem 0 !important;
    }
    
    .text-policy {
      font-size: 18px;
    }
  }
}
</style>
