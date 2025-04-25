<template>
    <q-btn class="custom-button" :class="buttonClass" :style="buttonStyle" unelevated @click="$emit('click')">
        <template v-if="icon">
            <img :src="icon" :alt="iconAlt || 'Button icon'" class="button-icon" />
        </template>
        {{ label }}
    </q-btn>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'CustomButton',
    props: {
        type: {
            type: String as () => 'playstore' | 'apple' | 'download' | 'benefit' | 'default',
            default: 'default',
            validator: (value: string) => ['playstore', 'apple', 'download', 'benefit', 'default'].includes(value),
        },
        label: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            default: '',
        },
        iconAlt: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const buttonClass = computed(() => {
            const baseClass = 'custom-button';
            if (props.type === 'benefit') return `${baseClass} button-benefit`;
            if (props.type === 'download') return `${baseClass} button-download`;
            if (props.type === 'playstore' || props.type === 'apple') return `${baseClass} button-icon`;
            return baseClass;
        });

        const buttonStyle = computed(() => {
            switch (props.type) {
                case 'download':
                    return { width: '182px', height: '50px' };
                case 'benefit':
                    return { width: '260px', height: '67px' };
                case 'playstore':
                case 'apple':
                    return { width: '260px', height: '66.773px' };
                default:
                    return {};
            }
        });

        return {
            buttonClass,
            buttonStyle,
        };
    },
});
</script>

<style lang="scss" scoped>
.custom-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: Poppins;
    font-weight: bold;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    border-radius: 5px;

    &.button-icon {
        background: $middle-brown;
        color: $primary-dark;
        padding-left: 15px;
        justify-content: flex-start;
        font-size: 24px;
        font-weight: 700;
        line-height: 0px;
    }

    &.button-download {
        background: $middle-brown;
        color: $primary-dark;
        border-radius: 5.952px;
        width: 182px;
        height: 50px;
    }

    &.button-benefit {
        background: $primary-dark;
        color: $white;
        border-radius: 4.393px;
        width: 260px;
        height: 67px;
    }

    .button-icon {
        width: 45px;
        height: 39.886px;
        margin-right: 15px;
    }
}
</style>