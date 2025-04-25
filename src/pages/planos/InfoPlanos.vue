<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const title = ref('Estamos\ncriando\nalgo incrível!')
        const mainText = ref('Estamos desenvolvendo um espaço feito para\n você, profissional da beleza! Nosso objetivo é\n criar planos que realmente façam a diferença no\n seu crescimento, trazendo mais visibilidade,\n agendamentos e oportunidades.')
        const secondPartText = ref('Ainda estamos ajustando cada detalhe para te\noferecer o melhor, então fique de olho – em\n breve, teremos novidades!')
        return {
            title,
            mainText,
            secondPartText
        }
    }
})
</script>

<template>
    <q-page class="page-container flex flex-center">
        <div class="content-wrapper row justify-between items-center"
            style="width: 100%; max-width: 1250px; gap: 40px; align-items: end;">
            <div class="title-section">
                <p
                    style="font-family: IvyMode; font-size: 101.972px; font-weight: 400; line-height: 90px; white-space: pre-line;">
                    {{ title }}
                </p>
            </div>
            <div class="column" style="gap: 16px;">
                <p class="main-text" style="">{{ mainText }}</p>
                <p class="main-text">{{ secondPartText }}</p>
            </div>

        </div>

    </q-page>
</template>

<style lang="scss" scoped>
.page-container {
    background: $background-color;

    .main-text {
        font-family: Poppins;
        font-size: 23px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px;
        white-space: pre-line;
        color: $middle-grey;
    }
}

@media (max-width: 768px) {
    .content-wrapper {
        flex-direction: column;
        gap: 30px;
        margin: 10%;
    }

    .title-text {
        font-size: 80px;
        line-height: 75px;
        text-align: left;
    }

    .main-text {
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        text-align: left;
    }
}

@media (max-width: 480px) {
    .title-text {
        font-size: 60px;
        line-height: 60px;
    }

    .main-text {
        font-size: 18px;
        line-height: 22px;
    }
}
</style>