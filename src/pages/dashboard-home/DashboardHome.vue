<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { buttonsIcons } from 'src/assets/icons/IconsButtons';
import CustomButton from 'src/components/CustomButton.vue';
import { QCard, QForm, QInput } from 'quasar';

export default defineComponent({
    components: { CustomButton, QCard, QForm, QInput },
    setup() {
        const titleHome = ref('A revolução no\nmundo da beleza\ne estética!');
        const subTextHome = ref('Já imaginou um lugar onde a beleza ganha vida de verdade? A FireBeauty é mais do que um app, é a primeira rede social feita para conectar você aos melhores profissionais do mercado. Aqui, você descobre tendências, agenda serviços com facilidade e ainda constrói sua reputação no mundo da estética.');
        const textCardForm = ref('Receba em primeira mão\num benefício exclusivo da\nFireBeauty!');
        const textRedeSocial = ref('REDE SOCIAL DA BELEZA');
        const subTextRedeSocial = ref('Mais do que um app, a FireBeauty é uma comunidade!\nProfissionais criam perfis, compartilham seus trabalhos e\nconquistam novos clientes, enquanto usuários encontram\ninspirações e avaliam serviços com base em experiências reais.');
        const containerFirstTitle = ref('Confiança e Qualidade');
        const containerFirstSubTitle = ref('Avaliações reais, recomendações personalizadas e transparência total. Você escolhe com segurança, sabendo que cada profissional tem seu trabalho validado pela comunidade.');
        const containerSecondTitle = ref('Transformamos a beleza!');
        const containerSecondSubTitle = ref('Chegamos para digitalizar e simplificar o mercado da estética, conectando clientes e profissionais de forma rápida, prática e confiável. Seja para encontrar o serviço ideal ou expandir sua carreira, este é o lugar certo!');
        const containerThirdTitle = ref('Agendamentos Simples e Rápidos');
        const containerThirdSubTitle = ref('Nada de mensagens intermináveis! Os clientes agendam serviços diretamente no perfil dos profissionais, com horários atualizados e confirmação instantânea.');
        const containerFourthTitle = ref('Oportunidade para Profissionais');
        const containerFourthSubTitle = ref('Se você trabalha com beleza, a FireBeauty é o seu palco! Construa sua reputação, ganhe visibilidade e atraia mais clientes sem depender apenas do boca a boca.');
        const beneficios = ref('Benefícios Exclusivos');

        const cardsData = ref([
            {
                id: 1,
                number: '01.',
                textoCard: 'Encontre os Melhores\nProfissionais da Beleza\nPerto de Você',
                subtexto: 'Encontre facilmente profissionais qualificados\ncom avaliações reais, garantindo a melhor\nescolha para seus serviços de beleza e estética.',
                imagem: '/src/assets/images/card-01.png',
                imageLeft: false
            },
            {
                id: 2,
                number: '02.',
                textoCard: 'Agende com\nFacilidade',
                subtexto: 'Marque seus serviços de beleza de forma\nrápida e prática, com agendamentos\nflexíveis e lembretes automáticos.',
                imagem: '/src/assets/images/card-02.png',
                imageLeft: true
            },
            {
                id: 3,
                number: '03.',
                textoCard: 'Atraia Mais\nClientes',
                subtexto: 'Profissionais podem aumentar sua visibilidade\ne conquistar mais clientes com avaliações\npositivas e fácil agendamento.',
                imagem: '/src/assets/images/card-03.png',
                imageLeft: false
            }
        ]);

        const inputForm = ref('');

        const cardsVisible = ref(Array(cardsData.value.length).fill(false));
        const mobileContainer = ref<HTMLElement | null>(null);

        const layoutDirection = ref<'row' | 'column'>('row');
        const cardFormLayoutDirection = ref<'row' | 'column'>('row');
        const featuresLayoutDirection = ref<'row' | 'column'>('row');

        const handleResize = () => {
            if (window.innerWidth < 768) {
                layoutDirection.value = 'column';
                cardFormLayoutDirection.value = 'column';
                featuresLayoutDirection.value = 'column';
            } else if (window.innerWidth < 1024) {
                layoutDirection.value = 'column';
                cardFormLayoutDirection.value = 'row';
                featuresLayoutDirection.value = 'column';
            } else {
                layoutDirection.value = 'row';
                cardFormLayoutDirection.value = 'row';
                featuresLayoutDirection.value = 'row';
            }
        };

        const setupAnimations = () => {
            const cardsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0');
                        cardsVisible.value[index] = true;
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.custom-card').forEach((card, index) => {
                card.setAttribute('data-index', index.toString());
                cardsObserver.observe(card);
            });

            const mobileObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const circulo = entry.target.querySelector('.circulo');
                        const mobileImg = entry.target.querySelector('.mobile-image');

                        circulo?.classList.add('animate-circulo');
                        mobileImg?.classList.add('animate-mobile');
                    }
                });
            }, { threshold: 0.5 });

            if (mobileContainer.value) {
                mobileObserver.observe(mobileContainer.value);
            }
        };

        onMounted(() => {
            handleResize();
            window.addEventListener('resize', handleResize);
            setupAnimations();
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', handleResize);
        });

        return {
            titleHome,
            subTextHome,
            textCardForm,
            textRedeSocial,
            subTextRedeSocial,
            containerFirstTitle,
            containerFirstSubTitle,
            containerSecondTitle,
            containerSecondSubTitle,
            containerThirdTitle,
            containerThirdSubTitle,
            containerFourthTitle,
            containerFourthSubTitle,
            beneficios,
            cardsData,
            inputForm,
            cardsVisible,
            mobileContainer,
            buttonsIcons,

            layoutDirection,
            cardFormLayoutDirection,
            featuresLayoutDirection
        };
    }
});
</script>

<template>
    <q-page class="page-container">
        <div class="main-content">
            <div class="main-container" :style="{ flexDirection: layoutDirection }">
                <div class="text-container">
                    <p class="title-home">{{ titleHome }}</p>
                    <p class="sub-text-home">{{ subTextHome }}</p>
                    <div class="buttons-container">
                        <CustomButton type="playstore" :icon="buttonsIcons.playStore" iconAlt="Play Store"
                            label="DOWNLOAD" />
                        <CustomButton type="apple" :icon="buttonsIcons.appleStore" iconAlt="Apple Store"
                            label="DOWNLOAD" />
                    </div>
                </div>
                <img src="src/assets/images/first-image.png" alt="Revolução na beleza e estética" class="main-image">
            </div>

            <q-form class="centered-form">
                <div class="card-form" :style="{ flexDirection: cardFormLayoutDirection }">
                    <p class="text-card-form">{{ textCardForm }}</p>
                    <q-input outlined dense v-model="inputForm" class="form-input" />
                    <CustomButton type="benefit" label="Quero meu benefício" />
                </div>
            </q-form>

            <div class="main-texts">
                <div class="social-section">
                    <p class="text-rede-social">{{ textRedeSocial }}</p>
                    <p class="sub-text-rede">{{ subTextRedeSocial }}</p>
                </div>

                <div class="features-container">
                    <div class="features-content" :style="{ flexDirection: featuresLayoutDirection }">
                        <div class="text-column left-column">
                            <div class="feature-text">
                                <p class="feature-title">{{ containerFirstTitle }}</p>
                                <p class="feature-description">{{ containerFirstSubTitle }}</p>
                            </div>
                            <div class="feature-text">
                                <p class="feature-title">{{ containerSecondTitle }}</p>
                                <p class="feature-description">{{ containerSecondSubTitle }}</p>
                            </div>
                        </div>

                        <div class="mobile-image-container" ref="mobileContainer">
                            <div class="circulo"></div>
                            <img src="/src/assets/images/mobile.png" alt="Aplicativo FireBeauty" class="mobile-image">
                        </div>

                        <div class="text-column right-column">
                            <div class="feature-text">
                                <p class="feature-title">{{ containerThirdTitle }}</p>
                                <p class="feature-description">{{ containerThirdSubTitle }}</p>
                            </div>
                            <div class="feature-text">
                                <p class="feature-title">{{ containerFourthTitle }}</p>
                                <p class="feature-description">{{ containerFourthSubTitle }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="beneficios-section">
                    <p class="section-title">{{ beneficios }}</p>
                </div>

                <div class="cards-container">
                    <q-card v-for="(card, index) in cardsData" :key="card.id" class="custom-card" :class="{
                        'reverse-layout': card.imageLeft,
                        'animate': cardsVisible[index]
                    }" :style="{ '--delay': index * 0.2 + 's' }" data-index="index">
                        <div class="card-content">
                            <div class="text-content">
                                <div class="card-header">
                                    <p class="card-number">{{ card.number }}</p>
                                    <p class="card-title">{{ card.textoCard }}</p>
                                </div>
                                <p class="card-subtext">{{ card.subtexto }}</p>
                            </div>
                            <img :src="card.imagem" :alt="card.textoCard" class="card-image">
                        </div>
                    </q-card>
                </div>
            </div>
        </div>
    </q-page>
</template>

<style lang="scss" scoped>
.page-container {
    display: flex;
    justify-content: center;
    width: 100%;
    background: $background-color;
}

.main-content {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
}

.main-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10%;
    gap: 40px;

    @media (max-width: 1023px) {
        margin-top: 5%;
    }
}

.text-container {
    flex: 1;
    max-width: 50%;

    @media (max-width: 1023px) {
        max-width: 100%;
        text-align: center;
    }
}

.title-home {
    font-family: IvyMode;
    font-weight: 400;
    line-height: 65.91px;
    text-transform: uppercase;
    margin-bottom: 30px;
    color: $middle-grey;
    font-size: 60.726px;

    @media (max-width: 767px) {
        margin-bottom: 20px;
        font-size: 35px;
    }
}

.sub-text-home {
    font-family: Poppins;
    font-weight: 400;
    line-height: 28px;
    margin-bottom: 30px;
    color: $middle-grey;
    font-size: 23px;

    @media (max-width: 767px) {
        margin-bottom: 20px;
        font-size: 14px;
    }
}

.buttons-container {
    display: flex;
    gap: 30px;
    padding: 75px 0 0 0;
    align-items: center;

    @media (max-width: 1023px) {
        justify-content: center;
        padding: 30px 0;

    }

    @media (max-width: 767px) {
        flex-direction: column;
        gap: 15px;
        padding: 20px 0;
    }
}

.main-image {
    max-width: 100%;
    height: auto;

    @media (max-width: 1023px) {
        max-width: 80%;
        margin-bottom: 30px;
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
    max-width: 1200px;
    min-height: 166px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;
    gap: 20px;
    background: $secondary;

    @media (max-width: 767px) {
        flex-direction: column;
        text-align: center;
        padding: 30px 20px;
    }
}

.text-card-form {
    font-family: Poppins;
    font-weight: 600;
    line-height: 28px;
    white-space: pre-line;
    color: $primary-dark;
    font-size: 24.601px;
    margin: 0;

    @media (max-width: 767px) {
        margin-bottom: 20px;
        font-size: 20px;
    }
}

.form-input {
    width: v-bind(inputWidth + 'px');
    height: v-bind(inputHeight + 'px');
    border-radius: 4.393px;
    background-color: white;
    border-radius: 4.393px;
    width: 499px;

    @media (max-width: 767px) {
        width: v-bind(inputWidth + 'px');
        height: v-bind(inputHeight + 'px');
        width: 100%;
        margin-bottom: 20px;
    }
}

.main-texts {
    width: 100%;
}

.social-section {
    margin: 50px 0;
    text-align: center;

    @media (max-width: 767px) {
        margin: 30px 0;
    }
}

.text-rede-social {
    font-family: IvyMode;
    font-weight: 600;
    line-height: 50.346px;
    margin-bottom: 20px;
    color: $middle-grey;
    font-size: 45px;

    @media (max-width: 767px) {
        font-size: 32px;
    }

}

.sub-text-rede {
    font-family: Poppins;
    font-weight: 500;
    line-height: 26px;
    white-space: pre-line;
    color: $middle-grey;
    font-size: 23px;

    @media (max-width: 767px) {
        white-space: normal;
        font-size: 14px;
    }
}

.features-container {
    width: 100%;
    margin: 80px 0;
    display: flex;
    justify-content: center;

    @media (max-width: 1023px) {
        margin: 60px 0;
    }

    @media (max-width: 767px) {
        margin: 40px 0;
    }
}

.features-content {
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 80px;

    @media (max-width: 1023px) {
        gap: 60px;
    }

    @media (max-width: 767px) {
        gap: 40px;
    }
}

.text-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 60px;

    @media (max-width: 1023px) {
        gap: 40px;
    }

    @media (max-width: 767px) {
        gap: 30px;
    }

    &.left-column {
        text-align: right;
        align-items: flex-end;

        @media (max-width: 1023px) {
            text-align: center;
            align-items: center;
        }
    }

    &.right-column {
        text-align: left;
        align-items: flex-start;

        @media (max-width: 1023px) {
            text-align: center;
            align-items: center;
        }
    }
}

.feature-text {
    max-width: 450px;

    @media (max-width: 1023px) {
        max-width: 600px;
    }
}

.feature-title {
    font-family: IvyMode;
    font-weight: 600;
    line-height: 1.3;
    color: $middle-grey;
    margin-bottom: 15px;
    font-size: 22px;
}

.feature-description {
    font-family: Poppins;
    font-weight: 400;
    line-height: 1.6;
    color: $middle-grey;
    font-size: 23px;

    @media (max-width: 767px) {
        font-size: 14px;
    }
}

.mobile-image-container {
    position: relative;
    flex-shrink: 0;
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;

    @media (max-width: 1023px) {
        order: -1;
        margin-bottom: 40px;
    }

    @media (max-width: 767px) {
        width: 250px;
    }
}

.circulo {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: $secondary;
    opacity: 0;
    transform: scale(0.5);
    transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    @media (max-width: 767px) {
        width: 250px;
        height: 250px;
    }

    &.animate-circulo {
        opacity: 1;
        transform: scale(1) rotate(0deg);
        animation: pulse 6s infinite alternate;
    }
}

.mobile-image {
    width: 300px;
    height: 757px;
    filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));
    transform-style: preserve-3d;
    opacity: 0;
    transform: translateY(30px) rotateY(30deg);
    transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-delay: 0.3s;

    @media (max-width: 767px) {
        width: 180px;
        height: auto;
    }

    &.animate-mobile {
        opacity: 1;
        transform: translateY(0) rotateY(0deg);
        animation: float 4s ease-in-out infinite;
    }
}

.beneficios-section {
    position: relative;
    overflow: hidden;
    margin-bottom: 60px;

    @media (max-width: 767px) {
        margin-bottom: 40px;
    }
}

.section-title {
    font-family: IvyMode;
    font-weight: 600;
    text-align: center;
    margin-bottom: 60px;
    color: $middle-grey;
    font-size: 45px;

    @media (max-width: 767px) {
        margin-bottom: 40px;
        font-size: 24px;
    }
}

.cards-container {
    display: flex;
    flex-direction: column;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    margin-bottom: 160px;

    @media (max-width: 1023px) {
        margin-bottom: 100px;
    }

    @media (max-width: 767px) {
        margin-bottom: 60px;
        gap: 30px;
    }
}

.custom-card {
    width: 1060px;
    height: 304px;
    border-radius: 12px !important;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transition-delay: var(--delay);

    @media (max-width: 1200px) {
        width: 100%;
    }

    @media (max-width: 767px) {
        height: auto;
        min-height: 300px;
    }

    &.animate {
        opacity: 1;
        transform: translateY(0);
    }

    &:nth-child(odd) {
        align-self: flex-start;
    }

    &:nth-child(even) {
        align-self: flex-end;
    }

    .card-content {
        display: flex;
        align-items: center;
        padding: 30px;
        height: 100%;

        @media (max-width: 767px) {
            flex-direction: column;
            padding: 20px;
        }
    }

    .text-content {
        flex: 1;
        padding: 20px;

        @media (max-width: 767px) {
            padding: 0 0 20px 0;
        }
    }

    .card-header {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }

    .card-number {
        font-size: 88px;
        font-weight: 500;
        margin: 0;
        line-height: 118.8px;
        color: $middle-brown;

        @media (max-width: 767px) {
            font-size: 64.767px;
            margin-right: 0;
            margin-bottom: 10px;
        }
    }

    .card-title {
        font-family: Poppins;
        font-weight: 600;
        line-height: 32.5px;
        margin: 0 0 0 25px;
        white-space: pre-line;
        color: $middle-grey;
        font-size: 33.943px;

        @media (max-width: 767px) {
            margin: 0;
            line-height: 32.5px;
            font-size: 22px;
            margin: 0 0 0 25px;
        }
    }

    .card-subtext {
        font-family: Poppins;
        line-height: 23px;
        font-style: normal;
        margin: 0;
        white-space: pre-line;
        color: $middle-grey;
        font-size: 23px;

        @media (max-width: 767px) {
            font-size: 14px;
            white-space: normal;
            line-height: 23px;
        }
    }

    .card-image {
        width: 393px;
        height: 100%;
        border-radius: 8px;
        object-fit: contain;
        object-position: center;
        transition: transform 0.5s ease;

        @media (max-width: 767px) {
            width: 100%;
            max-width: 300px;
            margin-top: 20px;
        }
    }

    &:hover .card-image {
        transform: scale(1.05);
    }

    &.reverse-layout .card-content {
        flex-direction: row-reverse;

        @media (max-width: 767px) {
            flex-direction: column;
        }

        .text-content {
            padding-right: 0;
            padding-left: 40px;

            @media (max-width: 767px) {
                padding-left: 0;
            }
        }
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 0.8;
    }

    50% {
        transform: scale(1.05);
        opacity: 1;
    }

    100% {
        transform: scale(1);
        opacity: 0.8;
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0) rotateY(0deg);
    }

    50% {
        transform: translateY(-15px) rotateY(5deg);
    }
}

@keyframes shine {
    0% {
        filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));
    }

    50% {
        filter: drop-shadow(0px 15px 30px rgba($primary, 0.2)) brightness(1.05);
    }

    100% {
        filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));
    }
}
</style>