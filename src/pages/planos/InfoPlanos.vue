<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
    setup() {
        const title = ref('Estamos\ncriando\nalgo incrível!');
        const mainText = ref('Estamos desenvolvendo um espaço feito para\nvocê, profissional da beleza! Nosso objetivo é\ncriar planos que realmente façam a diferença no\nseu crescimento, trazendo mais visibilidade,\nagendamentos e oportunidades.');
        const secondPartText = ref('Ainda estamos ajustando cada detalhe para te\nofercer o melhor, então fique de olho – em\nbreve, teremos novidades!');

        const titleFontSize = ref(101.972);
        const titleLineHeight = ref(90);
        const textFontSize = ref(23);
        const textLineHeight = ref(26);
        const layoutDirection = ref<'row' | 'column'>('row');
        const contentPadding = ref('0');

        const handleResize = () => {
            if (window.innerWidth < 480) {
                titleFontSize.value = 42;
                titleLineHeight.value = 45;
                textFontSize.value = 16;
                textLineHeight.value = 20;
                layoutDirection.value = 'column';
                contentPadding.value = '20px';
            } else if (window.innerWidth < 768) {
                titleFontSize.value = 60;
                titleLineHeight.value = 60;
                textFontSize.value = 18;
                textLineHeight.value = 22;
                layoutDirection.value = 'column';
                contentPadding.value = '30px';
            } else if (window.innerWidth < 1024) {
                titleLineHeight.value = 75;
                textFontSize.value = 20;
                textLineHeight.value = 24;
                layoutDirection.value = 'column';
                contentPadding.value = '40px';
            } else {
                titleFontSize.value = 101.972;
                titleLineHeight.value = 90;
                textFontSize.value = 23;
                textLineHeight.value = 26;
                layoutDirection.value = 'row';
                contentPadding.value = '0';
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
            title,
            mainText,
            secondPartText,
            titleFontSize,
            titleLineHeight,
            textFontSize,
            textLineHeight,
            layoutDirection,
            contentPadding
        };
    }
});
</script>

<template>
    <q-page class="page-container flex flex-center">
        <div class="content-wrapper" :style="{
            flexDirection: layoutDirection,
            padding: contentPadding
        }">
            <div class="title-section">
                <p class="title-text" :style="{
                    fontSize: `${titleFontSize}px`,
                    lineHeight: `${titleLineHeight}px`
                }">
                    {{ title }}
                </p>
            </div>
            <div class="text-content">
                <p class="main-text" :style="{
                    fontSize: `${textFontSize}px`,
                    lineHeight: `${textLineHeight}px`
                }">
                    {{ mainText }}
                </p>
                <p class="main-text" :style="{
                    fontSize: `${textFontSize}px`,
                    lineHeight: `${textLineHeight}px`
                }">
                    {{ secondPartText }}
                </p>
            </div>
        </div>
    </q-page>
</template>

<style lang="scss" scoped>
.page-container {
    background: $background-color;
    min-height: 100vh;

    .content-wrapper {
        width: 100%;
        max-width: 1250px;
        display: flex;
        gap: 40px;
        align-items: flex-end;

        @media (max-width: 1024px) {
            align-items: center;
            gap: 30px;
        }

        .title-section {
            flex: 1;
            min-width: 50%;

            .title-text {
                font-family: IvyMode;
                font-weight: 400;
                white-space: pre-line;
                color: $middle-grey;
                margin: 0;
            }
        }

        .text-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 16px;

            .main-text {
                font-family: Poppins;
                font-weight: 400;
                white-space: pre-line;
                color: $middle-grey;
                margin: 0;
            }
        }
    }
}

@media (max-width: 768px) {
    .page-container {
        .content-wrapper {
            flex-direction: column;
            align-items: flex-start;
            padding: 0 20px;

            .title-section,
            .text-content {
                width: 100%;
            }
        }
    }
}

@media (max-width: 480px) {
    .page-container {
        .content-wrapper {
            gap: 20px;
            padding: 0 15px;
        }
    }
}
</style>