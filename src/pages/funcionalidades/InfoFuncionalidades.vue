<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, computed } from 'vue';
import CustomButton from 'src/components/CustomButton.vue';
import { buttonsIcons } from 'src/assets/icons/IconsButtons'

export default defineComponent({
    components: { CustomButton },
    setup() {
        const titleFuncionalidades = ref('Possibilidades em um clique')
        const subText = ref('Descubra todas as funcionalidades que nosso\naplicativo permite para você profissional da beleza e\nvocê cliente.')
        const professionalTitle = ref('Se você for profissional...')
        const clientTitle = ref('Se você for cliente...')
        const textCard = ref('Vem você fazer parte também,\nleve a beleza a outro nível!')

        const titleFontSize = ref(101.972);
        const titleLineHeight = ref(90);
        const subTextFontSize = ref(23);
        const subTextLineHeight = ref(26);
        const columnTitleFontSize = ref(45);
        const columnTitleLineHeight = ref(38.736);
        const itemFontSize = ref(23);
        const itemLineHeight = ref(26);
        const cardTextFontSize = ref(24.601);
        const cardTextLineHeight = ref(28);
        const layoutDirection = ref<'row' | 'column'>('row');
        const cardLayoutDirection = ref<'row' | 'column'>('row');

        const formattedProfessionalTitle = computed(() => {
            return professionalTitle.value.replace(
                'profissional...',
                '<span style="color: #AD9B8E">profissional...</span>'
            );
        });

        const formattedClientTitle = computed(() => {
            return clientTitle.value.replace(
                'cliente...',
                '<span style="color: #AD9B8E">cliente...</span>'
            );
        });


        const professionalItems = ref([
            {
                number: '1.',
                title: 'Criar perfil profissional ou autônomo',
                description: 'Você escolhe se trabalha sozinho ou com uma equipe.'
            },
            {
                number: '2.',
                title: 'Mostrar seus trabalhos',
                description: 'Coloque fotos e vídeos dos serviços que você já fez.'
            },
            {
                number: '3.',
                title: 'Listar seus serviços',
                description: 'Mostre o que você faz, com preço e detalhes.'
            },
            {
                number: '4.',
                title: 'interações com clientes',
                description: 'via comunidade.'
            },
            {
                number: '5.',
                title: 'Organizar sua equipe',
                description: 'Gerencie o trabalho e a agenda de cada pessoa.'
            },
            {
                number: '6.',
                title: 'Controlar sua agenda',
                description: 'Veja e organize seus horários disponíveis.'
            },
            {
                number: '7.',
                title: 'Ser marcado como favorito',
                description: 'Clientes podem te salvar para chamar de novo.'
            },
            {
                number: '8.',
                title: 'Receber agendamentos rápidos',
                description: 'Ative o “Agende Agora” para novos atendimentos na hora.'
            },
            {
                number: '9.',
                title: 'Receber avaliações',
                description: 'Clientes podem dar nota e comentar sobre seu trabalho.'
            },
            {
                number: '10.',
                title: 'Ganhar selos de destaque',
                description: [
                    'Embaixador fire: Os primeiros profissionais',
                    'Verificado fire: perfil confirmado',
                    'Top Fire: entre os mais buscados',
                    'Confiança: quando tem boas notas'
                ]
            },
            {
                number: '11.',
                title: 'Perfil bilíngue',
                description: 'Português ou inglês.'
            },
            {
                number: '12.',
                title: 'Mudar o visual do app',
                description: 'Escolha um tema claro, escuro ou colorido.'
            },
            {
                number: '13.',
                title: 'Serviços pagos',
                description: [
                    'Fire Ads: Anúncios na comunidade',
                    'FireExclusive: Outdoor digital premium',
                    'FireFlash: Destaque rápido',
                    'Fireprime: Pacote completo'
                ]
            }
        ]);

        const clientItems = ref([
            {
                number: '1.',
                title: 'Achar profissionais',
                description: 'Encontre quem faz o serviço que você quer, perto ou longe de você.'
            },
            {
                number: '2.',
                title: 'Ver ideias e dicas',
                description: 'Veja fotos, vídeos e novidades do mundo da beleza.'
            },
            {
                number: '3.',
                title: 'Falar o que achou',
                description: 'Depois do serviço, conte como foi e ajude outras pessoas.'
            },
            {
                number: '4.',
                title: 'Escolher onde quer ser atendido',
                description: 'No salão, em casa ou onde quiser.'
            },
            {
                number: '5.',
                title: 'Marcar horário fácil',
                description: 'Escolha o profissional, veja os horários e agende direto no app.'
            },
            {
                number: '5.',
                title: 'Marcar horário fácil',
                description: 'Escolha o profissional, veja os horários e agende direto no app.'
            },
            {
                number: '6.',
                title: 'Ver o que já fez',
                description: 'Acompanhe seus serviços anteriores no histórico.'
            },
            {
                number: '7.',
                title: 'Receber avisos',
                description: 'O app te avisa quando o horário estiver perto e manda novidades.'
            },
            {
                number: '8.',
                title: 'Salvar favoritos',
                description: 'Guarde seus profissionais preferidos para encontrar depois.'
            },
            {
                number: '9.',
                title: 'Participar da comunidade',
                description: 'Converse com outras pessoas, troque dicas e faça indicações.'
            },
            {
                number: '10.',
                title: 'Escolher o idioma',
                description: 'Use o app em português ou inglês.'
            },
            {
                number: '11.',
                title: 'Mudar o visual do app',
                description: 'Escolha um tema claro, escuro ou colorido.'
            }, {
                number: '12.',
                title: 'Ter um perfil personalizado',
            },
        ]);

        const handleResize = () => {
            if (window.innerWidth < 768) { // Mobile
                titleFontSize.value = 42;
                titleLineHeight.value = 45;
                subTextFontSize.value = 16;
                subTextLineHeight.value = 20;
                columnTitleFontSize.value = 28;
                columnTitleLineHeight.value = 30;
                itemFontSize.value = 16;
                itemLineHeight.value = 20;
                cardTextFontSize.value = 18;
                cardTextLineHeight.value = 22;
                layoutDirection.value = 'column';
                cardLayoutDirection.value = 'column';
            } else if (window.innerWidth < 1024) { // Tablet
                titleFontSize.value = 72;
                titleLineHeight.value = 70;
                subTextFontSize.value = 20;
                subTextLineHeight.value = 24;
                columnTitleFontSize.value = 36;
                columnTitleLineHeight.value = 34;
                itemFontSize.value = 19;
                itemLineHeight.value = 22;
                cardTextFontSize.value = 22;
                cardTextLineHeight.value = 26;
                layoutDirection.value = 'column';
                cardLayoutDirection.value = 'row';
            } else { // Desktop
                titleFontSize.value = 101.972;
                titleLineHeight.value = 90;
                subTextFontSize.value = 23;
                subTextLineHeight.value = 26;
                columnTitleFontSize.value = 45;
                columnTitleLineHeight.value = 38.736;
                itemFontSize.value = 23;
                itemLineHeight.value = 26;
                cardTextFontSize.value = 24.601;
                cardTextLineHeight.value = 28;
                layoutDirection.value = 'row';
                cardLayoutDirection.value = 'row';
            }
        };

        onMounted(() => {
            handleResize();
            window.addEventListener('resize', handleResize);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', handleResize);
        });

        return {
            titleFuncionalidades,
            subText,
            professionalItems,
            clientItems,
            professionalTitle,
            clientTitle,
            textCard,
            buttonsIcons,
            // Variáveis responsivas
            titleFontSize,
            titleLineHeight,
            subTextFontSize,
            subTextLineHeight,
            columnTitleFontSize,
            columnTitleLineHeight,
            itemFontSize,
            itemLineHeight,
            cardTextFontSize,
            cardTextLineHeight,
            layoutDirection,
            cardLayoutDirection,
            formattedProfessionalTitle,
            formattedClientTitle
        }
    }
})

</script>

<template>
    <q-page class="page-container">
        <div class="main-content">
            <div class="main-container" :style="{ flexDirection: layoutDirection }">
                <div class="image-container">
                    <img src="/src/assets/images/first-image-funcionalidades.png" alt="Funcionalidades do app"
                        class="main-image">
                </div>
                <div class="text-container">
                    <p class="title-text" :style="{
                        fontSize: `${titleFontSize}px`,
                        lineHeight: `${titleLineHeight}px`
                    }">{{ titleFuncionalidades }}</p>
                    <p class="sub-text" :style="{
                        fontSize: `${subTextFontSize}px`,
                        lineHeight: `${subTextLineHeight}px`
                    }">{{ subText }}</p>
                </div>
            </div>

            <div class="two-columns-section">
                <div class="column-section">
                    <h2 class="column-title" :style="{
                        fontSize: `${columnTitleFontSize}px`,
                        lineHeight: `${columnTitleLineHeight}px`
                    }" v-html="formattedProfessionalTitle"></h2>
                    <div class="items-list">
                        <div v-for="item in professionalItems" :key="item.number" class="item">
                            <div class="item-content">
                                <strong class="item-number" :style="{
                                    fontSize: `${itemFontSize}px`,
                                    lineHeight: `${itemLineHeight}px`
                                }">{{ item.number }}</strong>
                                <strong class="item-title" :style="{
                                    fontSize: `${itemFontSize}px`,
                                    lineHeight: `${itemLineHeight}px`
                                }">{{ item.title }}</strong>
                            </div>
                            <div class="item-description" :style="{
                                fontSize: `${itemFontSize}px`,
                                lineHeight: `${itemLineHeight}px`
                            }">
                                <template v-if="Array.isArray(item.description)">
                                    <ul class="subtopics-list">
                                        <li v-for="(subitem, index) in item.description" :key="index">
                                            {{ subitem }}
                                        </li>
                                    </ul>
                                </template>
                                <template v-else>
                                    {{ item.description }}
                                </template>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="column-section">
                    <h2 class="column-title" :style="{
                        fontSize: `${columnTitleFontSize}px`,
                        lineHeight: `${columnTitleLineHeight}px`
                    }" v-html="formattedClientTitle"></h2>
                    <div class="items-list">
                        <div v-for="item in clientItems" :key="item.number" class="item">
                            <div class="item-content">
                                <strong class="item-number" :style="{
                                    fontSize: `${itemFontSize}px`,
                                    lineHeight: `${itemLineHeight}px`
                                }">{{ item.number }}</strong>
                                <strong class="item-title" :style="{
                                    fontSize: `${itemFontSize}px`,
                                    lineHeight: `${itemLineHeight}px`
                                }">{{ item.title }}</strong>
                            </div>
                            <p class="item-description" v-if="item.description" :style="{
                                fontSize: `${itemFontSize}px`,
                                lineHeight: `${itemLineHeight}px`
                            }">{{ item.description }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <q-card class="centered-form">
                <div class="card-form" :style="{ flexDirection: cardLayoutDirection }">
                    <p class="text-card" :style="{
                        fontSize: `${cardTextFontSize}px`,
                        lineHeight: `${cardTextLineHeight}px`
                    }">{{ textCard }}</p>
                    <div class="buttons-card">
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
    display: flex;
    justify-content: center;
    width: 100%;
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

    @media (max-width: 1023px) {
        margin: 5% 0;
    }
}

.image-container {
    flex: 1;
    min-width: 300px;
    max-width: 100%;

    @media (max-width: 1023px) {
        max-width: 100%;
        margin-bottom: 30px;
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

    @media (max-width: 767px) {
        text-align: center;
    }
}

.sub-text {
    font-family: Poppins;
    font-weight: 400;
    white-space: pre-line;
    margin: 0;

    @media (max-width: 767px) {
        text-align: center;
    }
}

.two-columns-section {
    display: flex;
    margin: 80px 0;
    gap: 40px;

    @media (max-width: 1023px) {
        flex-direction: column;
        margin: 40px 0;
        gap: 60px;
    }
}

.column-section {
    flex: 1;
}

.column-title {
    font-family: IvyMode;
    font-weight: 600;
    margin: 0 0 30px 0;

    @media (max-width: 767px) {
        text-align: center;
        margin-bottom: 20px;
    }
}

.items-list {
    width: 100%;
}

.item {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.item-content {
    color: $middle-grey;
    font-family: Poppins;
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.item-number {
    font-weight: 700;
}

.item-title {
    font-weight: 600;
}

.item-description {
    color: $middle-grey;
    font-family: Poppins;
    font-weight: 400;
    margin: 0;
    padding-left: 28px;
}

.subtopics-list {
    margin: 0;
    padding-left: 0;
    list-style-type: none;
}

.subtopics-list li {
    position: relative;
    padding-left: 20px;
    margin-bottom: 8px;
}

.subtopics-list li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: $middle-brown;
    font-weight: bold;
}

.item:not(:has(.item-description)) .item-content {
    margin-bottom: 0;
}

.centered-form {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 60px 0;

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
    background: $secondary;

    @media (max-width: 767px) {
        flex-direction: column;
        text-align: center;
        padding: 30px 20px;
    }
}

.text-card {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    white-space: pre-line;
    margin: 0;
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