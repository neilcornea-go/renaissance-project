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
    <f7-popup v-model:opened="notifOpen" class="claims-popup">

        <svg class="mx-auto pt-4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <linearGradient id="wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f44f5a"></stop><stop offset=".443" stop-color="#ee3d4a"></stop><stop offset="1" stop-color="#e52030"></stop></linearGradient><path fill="url(#wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path d="M33.192,28.95L28.243,24l4.95-4.95c0.781-0.781,0.781-2.047,0-2.828l-1.414-1.414	c-0.781-0.781-2.047-0.781-2.828,0L24,19.757l-4.95-4.95c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l4.95,4.95l-4.95,4.95c-0.781,0.781-0.781,2.047,0,2.828l1.414,1.414	c0.781,0.781,2.047,0.781,2.828,0l4.95-4.95l4.95,4.95c0.781,0.781,2.047,0.781,2.828,0l1.414-1.414	C33.973,30.997,33.973,29.731,33.192,28.95z" opacity=".05"></path><path d="M32.839,29.303L27.536,24l5.303-5.303c0.586-0.586,0.586-1.536,0-2.121l-1.414-1.414	c-0.586-0.586-1.536-0.586-2.121,0L24,20.464l-5.303-5.303c-0.586-0.586-1.536-0.586-2.121,0l-1.414,1.414	c-0.586,0.586-0.586,1.536,0,2.121L20.464,24l-5.303,5.303c-0.586,0.586-0.586,1.536,0,2.121l1.414,1.414	c0.586,0.586,1.536,0.586,2.121,0L24,27.536l5.303,5.303c0.586,0.586,1.536,0.586,2.121,0l1.414-1.414	C33.425,30.839,33.425,29.889,32.839,29.303z" opacity=".07"></path><path fill="#fff" d="M31.071,15.515l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414L18.343,32.485	c-0.391,0.391-1.024,0.391-1.414,0l-1.414-1.414c-0.391-0.391-0.391-1.024,0-1.414l14.142-14.142	C30.047,15.124,30.681,15.124,31.071,15.515z"></path><path fill="#fff" d="M32.485,31.071l-1.414,1.414c-0.391,0.391-1.024,0.391-1.414,0L15.515,18.343	c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0l14.142,14.142	C32.876,30.047,32.876,30.681,32.485,31.071z"></path>
            </svg>


        <f7-block>
            <div class="flex justify-between -my-[20px]">
                <span class=" text-gray-700 font-bold uppercase text-base">{{notifTitle}}</span>

            </div>
        </f7-block>

        <f7-block class="mt-1">
            <p>{{bodyNotif}} Please send the correct documents to our
                email to ensure your claim is handled promptly, please send the necessary documents to our email
                address:</p>
            <p class="py-4"><strong>Email:</strong> claims@yourcompany.com</p>
            <p>Include your policy number in the subject line for quicker processing.</p>
            <p class="pt-4">Thank you for your cooperation!</p>
        </f7-block>

        <f7-block>
            <f7-button popup-close @click="closeBtn()">OK</f7-button>
        </f7-block>

    </f7-popup>
</template>