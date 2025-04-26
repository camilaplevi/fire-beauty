<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import CustomButton from 'src/components/CustomButton.vue';
import { buttonsIcons } from 'src/assets/icons/IconsButtons'

export default defineComponent({
    components: { CustomButton },
    setup() {
        const titleSobre = ref('A FireBeauty\nnasceu de\num sonho')
        const subText = ref('Conectar profissionais e amantes da beleza em\num só lugar. Mais do que um app, somos uma\nrede social feita para quem vive e ama o\nuniverso da beleza e estética.')
        const professionalTitle = ref('Se você é profissional...')
        const professionalSubTitle = ref('aqui é o seu espaço para mostrar seu talento,\nconquistar clientes e crescer sem depender de\nalgoritmos injustos.')
        const professionalSubTitleCont = ref('Crie seu perfil, compartilhe seus trabalhos,\n receba avaliações e construa sua reputação\n de forma orgânica, sem complicação.')
        const clientTitle = ref('Se você é cliente...')
        const clientSubTitle = ref('a FireBeauty te ajuda a encontrar profissionais\nincríveis, ver inspirações reais e agendar seu\natendimento com confiança.')
        const clientSubTitleCont = ref('Nada de cilada – só beleza de verdade, feita\npor quem entende do assunto.')
        const textOverImage = ref('COMPARTILHE\nCONECTE-SE\nINTERAJA\nCRESÇA!')
        const textUnderImage = ref('A FireBeauty é mais do que um app. É uma comunidade onde cada curtida fortalece um profissional, cada avaliação gera confiança e cada agendamento transforma a autoestima de alguém.')
        const textCard = ref('Vem você fazer parte também,\nleve a beleza a outro nível!')

        const starsVisible = ref(0);
        const middleContainer = ref<HTMLElement | null>(null);

        onMounted(() => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        for (let i = 1; i <= 5; i++) {
                            setTimeout(() => {
                                starsVisible.value = i;
                            }, i * 300);
                        }
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.5 });

            if (middleContainer.value) {
                observer.observe(middleContainer.value);
            }
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

            buttonsIcons
        }
    }
})

</script>

<template>
    <q-page class="page-container" style="display: flex; justify-content: center; width: 100%;">
        <div class="main-content"
            style="width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 20px; box-sizing: border-box;">
            <div class="row main-container"
                style="width: 100%; align-items: center; justify-content: space-between; margin: 10% 0;">
                <div style="flex: 1; min-width: 300px; max-width: 45%;">
                    <img src="/src/assets/images/first-image-page-sobre.png" alt=""
                        style="width: 100%; height: auto; border-radius: 12px;">
                </div>
                <div class="column" style="flex: 1; padding-left: 2%; max-width: 50%;">
                    <p
                        style="font-family: IvyMode; font-size: 101.972px; font-weight: 400; line-height: 90px; white-space: pre-line;">
                        {{
                            titleSobre }}</p>
                    <p
                        style="font-family: Poppins; font-size: 23px; font-weight: 400; line-height: 26px; white-space: pre-line;">
                        {{ subText }}
                    </p>
                </div>
            </div>
            <div class="row" style="width: 100%; margin: 100px 0; gap: 60px;">
                <div class="column" style="flex: 1; min-width: 300px;">
                    <p class="title">{{ professionalTitle }}</p>
                    <p class="sub-text">{{ professionalSubTitle }}</p>
                    <p class="sub-text">{{ professionalSubTitleCont }}</p>
                </div>
                <div class="column" style="flex: 1; min-width: 300px;">
                    <p class="title">{{ clientTitle }}</p>
                    <p class="sub-text">{{ clientSubTitle }}</p>
                    <p class="sub-text">{{ clientSubTitleCont }}</p>
                </div>
            </div>

            <div class="middle-container" ref="middleContainer"
                style=" position: relative; width: 100vw; left: 50%; transform: translateX(-50%); margin: 100px 0; overflow: hidden;">
                <img src="/src/assets/images/second-image-page-sobre.png" alt="FireBeauty" class="full-width-image"
                    style=" width: 100%; height: auto; display: block; object-fit: cover; min-height: 500px;">
                <div class="overlay-content"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: flex-start; align-items: center; padding-left: 10%; ">
                    <div class="text-container"
                        style=" width: 580px; height: 340px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start;">
                        <p class="text-over-image"
                            style="font-family: IvyMode; font-size: 88.406px; font-weight: 400; line-height: 85px; white-space: pre-line; margin-bottom: 30px; text-align: left;">
                            {{ textOverImage }}</p>
                        <div class="stars-container" style="display: flex; gap: 15px;">
                            <q-icon v-for="i in 5" :key="i" name="mdi-star" class="star"
                                :class="{ 'visible': starsVisible >= i }"></q-icon>
                        </div>
                    </div>
                </div>
            </div>
            <p class="text-under-image"
                style="font-family: Poppins; font-size: 23px; font-style: normal; font-weight: 400; line-height: 26px; ">
                {{ textUnderImage }}</p>

            <q-card class="centered-form" style="display: flex; justify-content: center; width: 100%; margin: 86px 0;">
                <div class="card-form"
                    style=" width: 100%; height: 166px; border-radius: 10px; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; box-sizing: border-box;">
                    <p class="text-card"
                        style="font-family: Poppins; font-size: 24.601px; font-style: normal; font-weight: 600; line-height: 28px; white-space: pre-line;">
                        {{ textCard }}</p>
                    <div class="buttons-card" style="display: flex; gap: 38.42px;">
                        <CustomButton type="playstore" :icon="buttonsIcons.playStore" iconAlt="Play Store"
                            label="DOWNLOAD" />
                        <CustomButton type="apple" :icon="buttonsIcons.appleStore" iconAlt="Apple Store"
                            label="DOWNLOAD" />
                    </div>
                </div>
            </q-card>

        </div>
    </q-page>
</template>

<style lang="scss" scoped>
.page-container {
    background-color: $background-color;
}

.title {
    font-family: IvyMode;
    font-size: 45px;
    font-weight: 600;
    line-height: 38.736px;
}

.sub-text {
    font-family: Poppins;
    font-size: 23px;
    font-weight: 400;
    line-height: 26px;
    white-space: pre-line;
}

.text-over-image {
    color: $white;
}

.star {
    font-size: 48px;
    color: $secondary;
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    &.visible {
        opacity: 1;
        transform: scale(1);
    }
}

.card-form {
    background-color: $secondary;
}

.text-under-image {
    color: $middle-grey;
}

.text-card {
    color: $button-dark;
}

@media (max-width: 1024px) {
    .middle-container {
        .overlay-content {
            padding-left: 5%;
        }

        .text-container {
            width: 500px;
            height: 300px;
        }

        .text-over-image {
            font-size: 60px;
        }

        .star {
            font-size: 40px;
        }
    }
}

@media (max-width: 768px) {
    .middle-container {
        .text-container {
            width: 400px;
            height: 250px;
        }

        .text-over-image {
            font-size: 48px;
            margin-bottom: 20px;
        }

        .star {
            font-size: 32px;
        }
    }
}

@media (max-width: 580px) {
    .middle-container {
        .overlay-content {
            padding-left: 20px;
            justify-content: center;
        }

        .text-container {
            width: 100%;
            max-width: 350px;
            height: auto;
            padding: 20px;
        }

        .text-over-image {
            font-size: 36px;
        }

        .star {
            font-size: 28px;
        }
    }
}
</style>