<script setup>
import { computed } from 'vue';
import { useStaticData } from '../../composable/useStaticData';
const { notificationBody } = useStaticData();


const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'success'
    },
    notifTitle: {
        type: String,
        default: ''
    },
    notifBody: {
        type: String,
        defualt: ''
    }

});

const emit = defineEmits(['update:isOpen', 'btnClose']);

const notifOpen = computed({
    get() {
        return props.isOpen;
    },
    set(value) {
        emit('update:isOpen', value);
    }
});

const bodyNotif = computed({
    get() {
        return notificationBody(props.notifBody)
    }
})

const closeBtn = () => {
    emit('btnClose', false);
}


</script>

<template>
    <f7-popup v-model:opened="notifOpen" :close-by-backdrop-click="false" :close-on-escape="false" class="claims-popup">

            <img class="mx-auto pt-4" src="https://img.icons8.com/?size=100&id=fYgQxDaH069W&format=png&color=000000" alt="cancel">

        <f7-block>
            <div class="flex justify-between -my-[20px]">
                <span class=" text-gray-700 font-bold uppercase text-base">{{notifTitle}}</span>

            </div>
        </f7-block>

        <f7-block class="mt-1">
            <p>{{bodyNotif}} Kindly send clear and updated documents via email to ensure your claim is handled promptly; include your Policy Number in the subject line for quicker processing.</p>
            <p class="py-4"><strong>Email:</strong> claims@yourcompany.com</p>
            <p>Please know we are committed to ensuring that it is carefully reviewed and processed in a timely manner.</p>
            <p class="pt-4">Thank you.</p>
        </f7-block>

        <f7-block>
            <f7-button popup-close @click="closeBtn()">OK</f7-button>
        </f7-block>

    </f7-popup>
</template>