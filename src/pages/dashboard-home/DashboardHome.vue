<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { buttonsIcons } from 'src/assets/icons/IconsButtons'
import CustomButton from 'src/components/CustomButton.vue';
import { QCard } from 'quasar';

export default defineComponent({
    components: { CustomButton, QCard },
    setup() {
        const titleHome = ref('A revolução no\nmundo da beleza\ne estética!')
        const subTextHome = ref('Já imaginou um lugar onde a beleza ganha vida de verdade? A FireBeauty é mais do que um app, é a primeira rede social feita para conectar você aos melhores profissionais do mercado. Aqui, você descobre tendências, agenda serviços com facilidade e ainda constrói sua reputação no mundo da estética.')
        const textCardForm = ref('Receba em primeira mão\num benefício exclusivo da\nFireBeauty!')
        const textRedeSocial = ('REDE SOCIAL DA  BELEZA')
        const subTextRedeSocial = ('Mais do que um app, a FireBeauty é uma comunidade!\nProfissionais criam perfis, compartilham seus trabalhos e\nconquistam novos clientes, enquanto usuários encontram\ninspirações e avaliam serviços com base em experiências reais.')
        const containerFirstTitle = ref(' Confiança e Qualidade')
        const containerFirstSubTitle = ref('Avaliações reais, recomendações personalizadas e transparência total. Você escolhe com segurança, sabendo que cada profissional tem seu trabalho validado pela comunidade.')
        const containerSecondTitle = ref('Transformamos a beleza!')
        const containerSecondSubTitle = ref('chegamos para digitalizar e simplificar o mercado da estética, conectando clientes e profissionais de forma rápida, prática e confiável. Seja para encontrar o serviço ideal ou expandir sua carreira, este é o lugar certo! ')
        const containerThirdTitle = ref('Agendamentos Simples e Rápidos')
        const containerThirdSubTitle = ref('Nada de mensagens intermináveis! Os clientes agendam serviços diretamente no perfil dos profissionais, com horários atualizados e confirmação instantânea.')
        const containerFourthTitle = ref('Oportunidade para Profissionais')
        const containerFourthSubTitle = ref('Se você trabalha com beleza, a FireBeauty é o seu palco! Construa sua reputação, ganhe visibilidade e atraia mais clientes sem depender apenas do boca a boca.')
        const beneficios = ref('Benefícios Exclusivos')

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

        const inputForm = ref('')

        const cardsVisible = ref(Array(cardsData.value.length).fill(false));


        onMounted(() => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0');
                        cardsVisible.value[index] = true;
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.custom-card').forEach((card, index) => {
                card.setAttribute('data-index', index.toString());
                observer.observe(card);
            });
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

            buttonsIcons
        }
    }

})
</script>

<template>
    <q-page class="page-container" style="display: flex; justify-content: center; width: 100%;">
        <div class="main-content"
            style="width: 100%; max-width: 1400px; margin: 0 auto; padding: 0 20px; box-sizing: border-box;">
            <div class="row main-container"
                style=" width: 100%; align-items: center; justify-content: space-between; margin-top: 10%;">
                <div class="column col first-container" style="max-width: 50%;">
                    <p class="title-home"
                        style="font-family: IvyMode; font-size: 60.726px; font-weight: 400; line-height: 65.91px; text-transform: uppercase; margin-bottom: 30px;">
                        {{ titleHome }}</p>
                    <p class="sub-text-home"
                        style="font-family: Poppins; font-size: 23px; font-weight: 400; line-height: 28px; margin-bottom: 30px;">
                        {{ subTextHome }}</p>
                    <div class="buttons-container" style="display: flex; gap: 30px; padding: 75px 0 0 0;">
                        <CustomButton type="playstore" :icon="buttonsIcons.playStore" iconAlt="Play Store"
                            label="DOWNLOAD" />
                        <CustomButton type="apple" :icon="buttonsIcons.appleStore" iconAlt="Apple Store"
                            label="DOWNLOAD" />
                    </div>
                </div>
                <img src="src/assets/images/first-image.png" alt="" class="main-image"
                    style=" max-width: 45%; height: auto;">
            </div>

            <q-form class="centered-form" style="display: flex; justify-content: center; width: 100%; margin: 86px 0;">
                <div class="card-form"
                    style=" width: 100%; max-width: 1200px; height: 166px; border-radius: 10px; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; box-sizing: border-box;">
                    <p class="text-card-form"
                        style="font-family: Poppins; font-size: 24.601px; font-weight: 600; line-height: 28px; white-space: pre-line;">
                        {{ textCardForm }}</p>
                    <q-input outlined dense v-model="inputForm" class="form-input"
                        style="width: 499px; height: 67px; border-radius: 4.393px;" />
                    <CustomButton type="benefit" label="Quero meu benefício" />
                </div>
            </q-form>

            <div class="main-texts">
                <div class="social-section" style="margin: 50px 0; text-align: center;">
                    <p class="text-rede-social"
                        style="font-family: IvyMode; font-size: 45px;font-weight: 600; line-height: 50.346px; margin-bottom: 20px; ">
                        {{ textRedeSocial }}</p>
                    <p class="sub-text-rede"
                        style="font-family: Poppins; font-size: 23px; font-weight: 500; line-height: 26px; white-space: pre-line;">
                        {{ subTextRedeSocial }}</p>
                </div>

                <div class="features-container"
                    style="width: 100%; margin: 80px 0; display: flex; justify-content: center;">
                    <div class="features-content"
                        style="width: 100%; max-width: 1200px; display: flex; justify-content: space-between; align-items: center; gap: 80px;">
                        <div class="text-column left-column">
                            <div class="feature-text">
                                <p class="feature-title">{{ containerFirstTitle }}</p>
                                <p class="feature-description">{{ containerFirstSubTitle }}</p>
                            </div>
                            <div class="feature-text" style="max-width: 450px;">
                                <p class="feature-title">
                                    {{ containerSecondTitle }}</p>
                                <p class="feature-description">{{
                                    containerSecondSubTitle }}</p>
                            </div>
                        </div>

                        <div class="mobile-image-container"
                            style="position: relative; flex-shrink: 0; width: 300px; display: flex; justify-content: center; align-items: center;">
                            <div class="circulo"
                                style="position: absolute; width: 400px; height: 400px; border-radius: 50%;">
                            </div>
                            <img src="/src/assets/images/mobile.png" alt="Aplicativo FireBeauty" class="mobile-image"
                                style="width: 300px; height: 757px; filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));">
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

                <div class="beneficios-section" style="position: relative; overflow: hidden;">
                    <p class="section-title"
                        style="font-family: IvyMode; font-size: 45px; font-weight: 600; text-align: center; margin-bottom: 60px;">
                        {{ beneficios }}
                    </p>
                </div>

                <div class="cards-container"
                    style="display: flex; flex-direction: column; gap: 40px; max-width: 1200px; margin: 0 auto; padding: 0 20px; margin-bottom: 160px;">
                    <q-card v-for="(card, index) in cardsData" :key="card.id" class="custom-card" :class="{
                        'reverse-layout': index % 2 !== 0,
                        'animate': cardsVisible[index],
                        'second-card': index === 1
                    }" :style="{ '--delay': index * 0.2 + 's' }"
                        style="width: 1060px; height: 304px; border-radius: 12px !important; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;">
                        <div class="card-content" style="display: flex; align-items: center; padding: 30px;">
                            <div class="column text-content" style="flex: 1; padding: 20px;">
                                <div class="row card-header" style="align-items: center; margin-bottom: 15px;">
                                    <p class="card-number"
                                        style="font-size: 88px; font-weight: 500; margin: 0; line-height: 118.8px;">
                                        {{ card.number }}
                                    </p>
                                    <p class="card-title"
                                        style="font-family: Poppins; font-size: 33.943px; font-weight: 600; line-height: 32.5px; margin: 0 0 0 25px; white-space: pre-line;">
                                        {{ card.textoCard }}</p>
                                </div>
                                <p class="card-subtext"
                                    style="font-family: Poppins; font-size: 23px; line-height: 23px; font-style: normal; margin: 0; white-space: pre-line;">
                                    {{ card.subtexto }}</p>
                            </div>
                            <img :src="card.imagem" :alt="card.textoCard" class="card-image"
                                style="width: 393px; height: 100%; border-radius: 8px; object-fit: contain; object-position: center; transition: transform 0.5s ease;">
                        </div>
                    </q-card>
                </div>


            </div>
        </div>
    </q-page>
</template>


<style lang="scss" setup>
.page-container {
    background: $background-color;

    .main-container {
        .first-container {
            .title-home {
                color: $middle-grey;
            }

            .sub-text-home {
                color: $middle-grey;
            }
        }
    }
}

.card-form {
    background: $secondary;

    .text-card-form {
        color: $primary-dark;
    }
}

.text-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 60px;

    &.left-column {
        text-align: right;
        align-items: flex-end;
    }

    &.right-column {
        text-align: left;
        align-items: flex-start;
    }
}

.feature-text {
    max-width: 450px;
}

.feature-title {
    font-family: IvyMode;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.3;
    color: $middle-grey;
    margin-bottom: 15px;
}

.feature-description {
    font-family: Poppins;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.6;
    color: $middle-grey;
}

.mobile-image-container {
    .circulo {
        background: $secondary;
    }
}

.custom-card {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transition-delay: var(--delay);

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

    .card-image {
        transition: transform 0.5s ease;
    }

    &:hover .card-image {
        transform: scale(1.05);
    }

    &.second-card {
        .text-content {
            margin-left: 85px;
        }
    }

    .card-content {
        @media (max-width: 768px) {
            flex-direction: column;
        }
    }

    .text-content {
        .card-number {
            color: $middle-brown;
        }

        .card-title {
            color: $middle-grey;
        }

        .card-subtext {
            color: $middle-grey;
        }
    }

    .card-image {

        @media (max-width: 768px) {
            width: 100%;
            margin-top: 20px;
        }
    }

    &.reverse-layout .card-content {
        flex-direction: row-reverse;

        @media (max-width: 768px) {
            flex-direction: column;
        }

        .text-content {
            padding-right: 0;
            padding-left: 40px;
        }

        &:hover .card-image {
            transform: scale(1.05);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

}



@media (max-width: 1024px) {
    .main-container {
        flex-direction: column;
        margin-top: 5%;

        .first-container {
            max-width: 100%;
            order: 2;
            text-align: center;

            .title-home {
                font-size: 40px;
                line-height: 45px;
            }

            .sub-text-home {
                font-size: 18px;
            }
        }

        .main-image {
            max-width: 80%;
            order: 1;
            margin-bottom: 30px;
        }
    }

    .buttons-container {
        justify-content: center;
        padding: 30px 0;
    }

    .card-form {
        flex-direction: column;
        height: auto;
        padding: 30px;

        .text-card-form {
            margin-bottom: 20px;
            text-align: center;
        }

        .form-input {
            width: 100%;
            margin-bottom: 20px;
        }
    }

    .features-content {
        flex-direction: column;
        gap: 60px;
    }

    .text-column {
        width: 100%;
        gap: 40px;

        &.left-column,
        &.right-column {
            text-align: center;
            align-items: center;
        }
    }

    .feature-text {
        max-width: 600px;
    }

    .mobile-image-container {
        order: -1;
        margin-bottom: 40px;
    }

    .custom-card {
        width: 100%;
        height: auto;
        min-height: 300px;

        .card-content {
            flex-direction: column;
            padding: 30px;

            .text-content {
                padding: 0 0 30px 0 !important;

                .card-subtext {
                    padding-left: 0;
                }
            }

            .card-image {
                width: 100%;
                max-width: 300px;
            }
        }

        &.reverse-layout .card-content {
            flex-direction: column;
        }
    }
}

@media (max-width: 768px) {
    .main-container {
        flex-direction: column;
        margin-top: 5%;

        .first-container {
            .title-home {
                font-size: 30px;
                line-height: 35px;
            }

            .sub-text-home {
                font-size: 16px;
            }

            .main-image {
                width: 80%;
            }
        }
    }

    .sub-text-rede {
        white-space: normal !important;
    }

    .feature-title {
        font-size: 20px;
    }

    .feature-description {
        font-size: 16px;
    }

    .mobile-image-container {
        width: 250px;

        .circulo {
            width: 250px;
            height: 250px;
        }

        .mobile-image {
            width: 180px;
        }
    }

    .custom-card {
        .card-content {
            .card-header {
                flex-direction: column;
                align-items: flex-start;
            }

            .card-number {
                font-size: 60px;
                margin-right: 0;
                margin-bottom: 10px;
            }

            .card-title {
                font-size: 28px;
            }

            .card-subtext {
                font-size: 18px;
            }
        }
    }
}
</style>
