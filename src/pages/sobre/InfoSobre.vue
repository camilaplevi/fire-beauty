<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, computed } from 'vue';
import CustomButton from 'src/components/CustomButton.vue';
import { buttonsIcons } from 'src/assets/icons/IconsButtons';
import { imagesSite } from 'src/assets/images/Images';

export default defineComponent({
  components: { CustomButton },
  setup() {
    const titleSobre = ref('A FireBeauty\nnasceu de\num sonho');
    const subText = ref(
      'Conectar profissionais e amantes da beleza em\num só lugar. Mais do que um app, somos uma\nrede social feita para quem vive e ama o\nuniverso da beleza e estética.',
    );
    const professionalTitle = ref('Se você é profissional...');
    const professionalSubTitle = ref(
      'aqui é o seu espaço para mostrar seu talento,\nconquistar clientes e crescer sem depender de\nalgoritmos injustos.',
    );
    const professionalSubTitleCont = ref(
      'Crie seu perfil, compartilhe seus trabalhos,\n receba avaliações e construa sua reputação\n de forma orgânica, sem complicação.',
    );
    const clientTitle = ref('Se você é cliente...');
    const clientSubTitle = ref(
      'a FireBeauty te ajuda a encontrar profissionais\nincríveis, ver inspirações reais e agendar seu\natendimento com confiança.',
    );
    const clientSubTitleCont = ref(
      'Nada de cilada – só beleza de verdade, feita\npor quem entende do assunto.',
    );
    const textOverImage = ref('COMPARTILHE\nCONECTE-SE\nINTERAJA\nCRESÇA!');
    const textUnderImage = ref(
      'A FireBeauty é mais do que um app. É uma comunidade onde cada curtida fortalece um profissional, cada avaliação gera confiança e cada agendamento transforma a autoestima de alguém.',
    );
    const textCard = ref('Vem você fazer parte também,\nleve a beleza a outro nível!');

    const layoutDirection = ref<'row' | 'column'>('row');
    const cardLayoutDirection = ref<'row' | 'column'>('row');

    const starsVisible = ref(0);
    const middleContainer = ref<HTMLElement | null>(null);

    const formattedTitleSobre = computed(() => {
      return titleSobre.value
        .replace('um sonho', '<span style="color: #AD9B8E">um sonho</span>')
        .replace(/\n/g, '<br>');
    });

    const formattedProfessionalTitle = computed(() => {
      return professionalTitle.value.replace(
        'profissional...',
        '<span style="color: #AD9B8E">profissional...</span>',
      );
    });

    const formattedClientTitle = computed(() => {
      return clientTitle.value.replace(
        'cliente...',
        '<span style="color: #AD9B8E">cliente...</span>',
      );
    });

    const professionalSection = ref<HTMLElement | null>(null);
    const clientSection = ref<HTMLElement | null>(null);
    const professionalInView = ref(false);
    const clientInView = ref(false);

    const setupScrollAnimations = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === professionalSection.value) {
              professionalInView.value = entry.isIntersecting;
            } else if (entry.target === clientSection.value) {
              clientInView.value = entry.isIntersecting;
            }
          });
        },
        { threshold: 0.5 },
      );

      if (professionalSection.value) observer.observe(professionalSection.value);
      if (clientSection.value) observer.observe(clientSection.value);
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        layoutDirection.value = 'column';
        cardLayoutDirection.value = 'column';
      } else if (window.innerWidth < 1024) {
        layoutDirection.value = 'column';
        cardLayoutDirection.value = 'row';
      } else {
        layoutDirection.value = 'row';
        cardLayoutDirection.value = 'row';
      }
    };

    const setupStarAnimation = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              for (let i = 1; i <= 5; i++) {
                setTimeout(() => {
                  starsVisible.value = i;
                }, i * 300);
              }
              observer.disconnect();
            }
          });
        },
        { threshold: 0.5 },
      );

      if (middleContainer.value) {
        observer.observe(middleContainer.value);
      }
    };

    onMounted(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
      setupStarAnimation();
      setupScrollAnimations();
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    return {
      titleSobre,
      subText,
      professionalTitle,
      professionalSubTitle,
      professionalSubTitleCont,
      clientTitle,
      clientSubTitle,
      clientSubTitleCont,
      textOverImage,
      textUnderImage,
      textCard,
      starsVisible,
      middleContainer,
      formattedTitleSobre,
      formattedProfessionalTitle,
      formattedClientTitle,
      buttonsIcons,

      professionalInView,
      clientInView,
      professionalSection,
      clientSection,

      layoutDirection,
      cardLayoutDirection,
      imagesSite,
    };
  },
});
</script>

<template>
  <q-page class="page-container">
    <div class="main-content">
      <div class="main-container" :style="{ flexDirection: layoutDirection }">
        <div class="image-container">
          <img :src="imagesSite.imageSobre" alt="Sobre a FireBeauty" class="main-image" />
        </div>
        <div class="text-container">
          <p class="title-text" v-html="formattedTitleSobre"></p>
          <p class="sub-text">{{ subText }}</p>
        </div>
      </div>

      <div class="sections-container" :style="{ flexDirection: layoutDirection }">
        <div class="section">
          <p class="section-title" v-html="formattedProfessionalTitle"></p>
          <p class="section-text">{{ professionalSubTitle }}</p>
          <p class="section-text">{{ professionalSubTitleCont }}</p>
        </div>
        <div class="section">
          <p class="section-title" v-html="formattedClientTitle"></p>
          <p class="section-text">{{ clientSubTitle }}</p>
          <p class="section-text">{{ clientSubTitleCont }}</p>
        </div>
      </div>

      <div class="middle-container" ref="middleContainer">
        <img
          :src="imagesSite.secondImageSobre"
          alt="Comunidade FireBeauty"
          class="full-width-image"
        />
        <div class="overlay-content">
          <div class="overlay-text-container">
            <p class="overlay-text">{{ textOverImage }}</p>
            <div class="stars-container">
              <q-icon
                v-for="i in 5"
                :key="i"
                name="mdi-star"
                class="star"
                :class="{ visible: starsVisible >= i }"
              ></q-icon>
            </div>
          </div>
        </div>
      </div>

      <p class="under-image-text">{{ textUnderImage }}</p>

      <q-card class="centered-form">
        <div class="card-form" :style="{ flexDirection: cardLayoutDirection }">
          <p class="card-text">{{ textCard }}</p>
          <div class="buttons-card">
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
      </q-card>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.page-container {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: $background-color;
}

.main-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.main-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10% 0;
  gap: 40px;
}

.image-container {
  flex: 1;
  min-width: 300px;
  max-width: 100%;

  @media (max-width: 1023px) {
    max-width: 100%;
  }
}

.main-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

.text-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 100%;

  @media (max-width: 1023px) {
    gap: 20px;
  }
}

.title-text {
  font-family: IvyMode;
  font-weight: 400;
  white-space: pre-line;
  margin: 0;
  font-size: 101.972px;
  line-height: 90px;

  @media (max-width: 767px) {
    text-align: center;
    font-size: 35px;
    line-height: 49.122px;
    white-space: revert;
    text-align: left;
  }
}

.sub-text {
  font-family: Poppins;
  font-weight: 400;
  white-space: pre-line;
  margin: 0;
  font-size: 23px;
  line-height: 26px;

  @media (max-width: 767px) {
    text-align: center;
    font-size: 14px;
    line-height: 26px;
  }
}

.sections-container {
  display: flex;
  width: 100%;
  margin: 100px 0;
  gap: 60px;

  @media (max-width: 1023px) {
    flex-direction: column;
    margin: 60px 0;
    gap: 40px;
  }

  @media (max-width: 767px) {
    margin: 40px 0;
    gap: 30px;
  }
}

.section {
  flex: 1;
  min-width: 300px;
}

.section-title {
  font-family: IvyMode;
  font-weight: 600;
  margin: 0 0 20px 0;
  font-size: 45px;
  line-height: 38.736px;

  @media (max-width: 767px) {
    text-align: center;
    font-size: 24px;
    line-height: 38.736px;
  }
}

.section-text {
  font-family: Poppins;
  font-weight: 400;
  white-space: pre-line;
  margin: 0 0 20px 0;
  font-size: 23px;
  line-height: 26px;

  @media (max-width: 767px) {
    text-align: center;
    font-size: 14px;
    line-height: 26px;
  }
}

.middle-container {
  position: relative;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  margin: 100px 0;
  overflow: hidden;

  @media (max-width: 1023px) {
    margin: 80px 0;
  }

  @media (max-width: 767px) {
    margin: 60px 0;
  }
}

.full-width-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  min-height: 500px;

  @media (max-width: 767px) {
    min-height: 400px;
  }
}

.overlay-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10%;

  @media (max-width: 767px) {
    padding-left: 20px;
  }
}

.overlay-text-container {
  width: 580px;
  height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 1023px) {
    width: 500px;
    height: 300px;
  }

  @media (max-width: 767px) {
    width: 100%;
    max-width: 350px;
    height: auto;
    padding: 20px;
  }
}

.overlay-text {
  font-family: IvyMode;
  font-weight: 400;
  white-space: pre-line;
  margin-bottom: 30px;
  text-align: left;
  color: $white;
  font-size: 88.406px;
  line-height: 85px;

  @media (max-width: 767px) {
    margin-bottom: 20px;
    font-size: 50px;
    line-height: 45px;
  }
}

.stars-container {
  display: flex;
  gap: 15px;
}

.star {
  color: $secondary;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &.visible {
    opacity: 1;
    transform: scale(1);
  }
}

.under-image-text {
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  color: $middle-grey;
  margin: 40px 0;
  font-size: 23px;
  line-height: 26px;

  @media (max-width: 767px) {
    text-align: center;
    margin: 30px 0;
    font-size: 14px;
    line-height: 26px;
  }
}

.centered-form {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 86px 0;

  @media (max-width: 1023px) {
    margin: 60px 0;
  }

  @media (max-width: 767px) {
    margin: 40px 0;
  }
}

.card-form {
  width: 100%;
  min-height: 166px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  gap: 20px;
  background-color: $secondary;

  @media (max-width: 767px) {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
  }
}

.card-text {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  white-space: pre-line;
  margin: 0;
  color: $button-dark;
  font-size: 24.601px;
  line-height: 28px;

  @media (max-width: 767px) {
    font-size: 20px;
    line-height: 23px;
  }
}

.buttons-card {
  display: flex;
  gap: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
    gap: 15px;
    align-items: center;
  }
}
</style>
