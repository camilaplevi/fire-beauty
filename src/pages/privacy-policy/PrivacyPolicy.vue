<script lang="ts">
import { defineComponent, ref } from 'vue';
import { privacyPolicyText } from 'assets/texts/privacyPolicy';

export default defineComponent({
    setup() {
        const policyTitle = ref('Políticas de privacidade');
        const fontSize = ref(101.972); // Tamanho inicial para desktop
        const lineHeight = ref(90);
        const contentFontSize = ref(23);
        const contentLineHeight = ref(26);

        return {
            privacyPolicyText,
            policyTitle,
            fontSize,
            lineHeight,
            contentFontSize,
            contentLineHeight
        };
    }
});
</script>

<template>
    <q-page class="main-content">
        <div class="privacy-policy">
            <p class="policy-title">{{ policyTitle }}</p>
            <div class="policy-content">
                <pre>{{ privacyPolicyText }}</pre>
            </div>
        </div>
    </q-page>
</template>

<style lang="scss" scoped>
.main-content {
    max-width: 1200px;
    margin: 0 auto;
}

.privacy-policy {
    padding: 5%;

    @media (max-width: 767px) {
        padding: 20px;
    }
}

.policy-title {
    font-family: IvyMode;
    font-style: normal;
    font-weight: 400;
    margin-bottom: 40px;
    font-size: 101.972px;
    line-height: 90px;

    @media (max-width: 767px) {
        margin-bottom: 20px;
        font-size: 30px;
        line-height: 90px;
    }
}

.policy-content {
    pre {
        white-space: pre-wrap;
        font-family: inherit;
        color: $middle-grey;
        font-family: Poppins;
        font-style: normal;
        font-weight: 400;
        font-size: v-bind(contentFontSize + 'px');
        line-height: v-bind(contentLineHeight + 'px');
    }
}
</style>