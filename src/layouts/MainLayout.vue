<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { buttonsIcons } from 'src/assets/icons/IconsButtons';
import CustomButton from 'src/components/CustomButton.vue';
import { imagesSite } from 'src/assets/images/Images';

export default defineComponent({
  components: { CustomButton },
  setup() {
    const route = useRoute();

    const menuItems = [
      { id: 1, path: '/inicio', label: 'Início' },
      { id: 2, path: '/blog', label: 'Blog' },
      { id: 3, path: '/sobre', label: 'Sobre' },
      { id: 4, path: '/planos', label: 'Planos' },
      { id: 5, path: '/funcionalidades', label: 'Funcionalidades' },
    ];

    const textPolicy = ref('Politica de privacidade');
    const emailSupport = ref('support@firebeauty.com');
    const instagram = ref('Firebeautyoficial');
    const textRigths = ref('Todos os direitos reservados por FireBeauty');
    const textSuporteMenuMobile = ref('Suporte');

    const rightDrawerOpen = ref(false);

    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value;
    };

    return {
      menuItems,
      route,
      textPolicy,
      emailSupport,
      instagram,
      textRigths,
      textSuporteMenuMobile,
      rightDrawerOpen,
      toggleRightDrawer,
      buttonsIcons,
      imagesSite,
    };
  },
});
</script>

<template>
  <q-layout view="hHh Lpr fff">
    <q-header elevated class="bg-white text-black">
      <q-toolbar class="q-px-md" style="height: 100px; justify-content: space-between">
        <img
          :src="imagesSite.imageLogoHeader"
          alt="Logo da FireBeauty"
          style="width: 141px !important; height: 49px !important; margin: 0 0 20px 30px"
        />

        <div class="desktop-menu row items-center" style="margin-right: 30px">
          <ul class="menu-list">
            <li v-for="item in menuItems" :key="item.id" class="menu-item">
              <router-link
                :to="item.path"
                :class="{ 'active-route': route.path === item.path }"
                class="menu-link"
              >
                {{ item.label }}
              </router-link>
            </li>
          </ul>
          <q-btn label="Baixar agora" unelevated class="btn-baixar q-ml-md" />
        </div>

        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          class="hamburger-menu"
          @click="toggleRightDrawer"
          style="display: none; margin-right: 15px"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" bordered side="right" behavior="mobile" class="bg-white">
      <img :src="imagesSite.imageLogoMenuMobile" alt="Logo FireBeauty" class="logo-mobile" />
      <hr style="width: 90%" />
      <q-list>
        <q-item
          v-for="item in menuItems"
          :key="item.id"
          clickable
          v-ripple
          :to="item.path"
          :class="{ active: route.path === item.path }"
          class="mobile-menu-item"
        >
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>

        <q-item>
          <q-btn label="Baixar agora" unelevated class="btn-baixar full-width" />
        </q-item>
        <hr style="width: 90%" />
        <router-link to="/privacidade" class="texts-menu-mobile" style="text-decoration: none">
          {{ textPolicy }}
        </router-link>
        <p class="texts-menu-mobile">{{ textSuporteMenuMobile }}</p>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="footer bg-white q-pt-lg">
      <div class="row justify-around items-center q-py-lg">
        <div class="col-auto">
          <img
            :src="imagesSite.imageLogoFooter"
            alt="Logo FireBeauty"
            style="width: 117px; height: auto"
          />
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
          <CustomButton
            type="playstore"
            :icon="buttonsIcons.playStore"
            iconAlt="Play Store"
            label="DOWNLOAD"
          />
          <CustomButton
            type="apple"
            :icon="buttonsIcons.appleStore"
            iconAlt="Apple Store"
            label="DOWNLOAD"
          />
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
.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}

.menu-item {
  margin-right: 20px;
  position: relative;
}

.menu-link {
  text-decoration: none;
  color: #333;
  font-family: Poppins;
  font-size: 17.161px;
  font-weight: 400;
  line-height: normal;
  padding: 5px 0;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: #ad9b8e;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: #ad9b8e;
      border-radius: 2px;
    }
  }

  &.active-route {
    color: #ad9b8e;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: #ad9b8e;
      border-radius: 2px;
    }
  }
}

.mobile-menu-item {
  font-family: Poppins;
  font-size: 16px;

  &.active {
    color: #ad9b8e;
    font-weight: 500;

    .q-item__section {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: #ad9b8e;
        border-radius: 2px;
      }
    }
  }
}

.logo-mobile {
  margin-top: 20px;
  margin-left: 10px !important;
}

.texts-menu-mobile {
  font-family: Poppins;
  font-size: 15px;
  font-weight: 400;
  line-height: 26px;
  margin-left: 18px;
  color: $middle-brown;
}

.btn-baixar {
  font-family: Poppins;
  background-color: #ad9b8e !important;
  color: black !important;
  text-transform: none;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: $primary-dark;
    text-decoration: underline;
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
  border-top: 1px solid #ececec;

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
    font-family: Poppins;
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
