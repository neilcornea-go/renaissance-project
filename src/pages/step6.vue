<script setup>
import { f7 } from 'framework7-vue';
import { ref, onMounted } from "vue";
import GlobalLayout from "../components/structure/layout.vue";
import ArticleCard from "../components/common/articleCard.vue";
import Title from "../components/common/title.vue";
import Divider from "../components/common/divider.vue";


const claimsNumber = ref('')
const isPreload = ref(false);
// const claimsReference = ref(getCookieValue('claims_no'));

// const claimsGenerated = () => {
//     const claimsReference = getCookieValue('claims_no');
//     claimsNumber.value = claimsReference;
// }

const goTo = (route) => {
    f7.views.main.router.navigate(route, {
        animate: false
    });
};

const NextPage = () => {
    isPreload.value = true;
    setTimeout(() => {
        isPreload.value = false;
        goTo('/');
    }, 1000);
    
    localStorage.removeItem('claimant')
    localStorage.removeItem('claims-reference')
};

const newClaim = () => {
    localStorage.removeItem('claimant')
    localStorage.removeItem('claims-reference')
}

onMounted(() => {
    // setTimeout(() => {
    //     claimsGenerated();
    // }, 1000);

});

const getCookieValue = (cookieName) => {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}
</script>


<template>
    <GlobalLayout fullWidth>
        <section class="flex flex-col gap-8 py-6 px-6 max-w-screen-lg mx-auto">
            <div class="space-y-2">
                <f7-block class="text-center">
                    <svg class="w-20 h-20 mx-auto" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                        <linearGradient id="I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#21ad64"></stop><stop offset="1" stop-color="#088242"></stop></linearGradient><path fill="url(#I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z" opacity=".05"></path><path d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z" opacity=".07"></path><path fill="#fff" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
                        </svg>

                    <Title title="You've Submitted Your Claims" class="pt-4" />
                    <p class="pt-2">
                        If your claim is approved, we'll credit to your nominated payout
                        details.
                    </p>
                    
                </f7-block>

                <f7-card class="bg-[#f1f1f1] py-4 md:w-9/12 mx-auto group">
                    <f7-card-content>
                        <a href="#" class="flex justify-center">
                            <p>Claim reference number(s)</p>  
                        </a>
                        <h3 class="flex justify-center text-xl font-medium">{{ getCookieValue('claims_no') }}</h3>
                        <Divider />

                        <p class="flex justify-center mx-auto">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white pr-1" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1.4" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>Keep the original receipts for the next 120 days in case we need
                            to verify your claim.
                        </p>
                    </f7-card-content>
                </f7-card>

                <div class="py-4">
                    <f7-button @click="NextPage()" preloader :loading="isPreload" :disabled="isPreload" fill large class="md:w-9/12 mx-auto">DONE</f7-button>
                </div>

                <div class="text-center pb-4">
                    <f7-link class="" href="/" external @click="newClaim()">
                        <h2 class="text-base underline text-blue-700 font-light">
                            Submit a new claim
                        </h2>
                    </f7-link>
                </div>


            </div>
        </section>

        <section class="bg-[#f1f1f1] ">
            <div class="py-6 px-6 max-w-screen-lg mx-auto">
                <Title title="Featured Reads" />

                <ArticleCard title="Article Title"
                    content="Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse" category="Accident"
                    url="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" />
                <ArticleCard title="Article Title"
                    content="Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse" category="Accident"
                    url="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" />
                <ArticleCard title="Article Title"
                    content="Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse" category="Accident"
                    url="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" />
            </div>
        </section>


    </GlobalLayout>
</template>
