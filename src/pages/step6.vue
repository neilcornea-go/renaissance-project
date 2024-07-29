<script setup>
import { f7 } from 'framework7-vue';
import { ref, onMounted } from "vue";
import GlobalLayout from "../components/structure/layout.vue";
import ArticleCard from "../components/common/articleCard.vue";
import Title from "../components/common/title.vue";
import Divider from "../components/common/divider.vue";

const claimsNumber = ref('')
const isPreload = ref(false);

const claimsGenerated = () => {
    const claimsReference = getCookieValue('claims_no');
    claimsNumber.value = claimsReference;
}

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
    setTimeout(() => {
        claimsGenerated();
    }, 1000);
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
                    <svg class="w-20 h-20 text-gray-800 dark:text-white mx-auto" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4"
                            d="m13.46 8.291 3.849-3.849a1.5 1.5 0 0 1 2.122 0l.127.127a1.5 1.5 0 0 1 0 2.122l-3.84 3.838a4 4 0 0 0-2.258-2.238Zm0 0a4 4 0 0 1 2.263 2.238l3.662-3.662a8.961 8.961 0 0 1 0 10.27l-3.676-3.676m-2.25-5.17 3.678-3.676a8.961 8.961 0 0 0-10.27 0l3.662 3.662a4 4 0 0 0-2.238 2.258L4.615 6.863a8.96 8.96 0 0 0 0 10.27l3.662-3.662a4 4 0 0 0 2.258 2.238l-3.672 3.676a8.96 8.96 0 0 0 10.27 0l-3.662-3.662a4.001 4.001 0 0 0 2.238-2.262m0 0 3.849 3.848a1.5 1.5 0 0 1 0 2.122l-.127.126a1.499 1.499 0 0 1-2.122 0l-3.838-3.838a4 4 0 0 0 2.238-2.258Zm.29-1.461a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-7.718 1.471-3.84 3.838a1.5 1.5 0 0 0 0 2.122l.128.126a1.5 1.5 0 0 0 2.122 0l3.848-3.848a4 4 0 0 1-2.258-2.238Zm2.248-5.19L6.69 4.442a1.5 1.5 0 0 0-2.122 0l-.127.127a1.5 1.5 0 0 0 0 2.122l3.849 3.848a4 4 0 0 1 2.238-2.258Z" />
                    </svg>
                    <Title title="You've Submitted Your Claims" class="pt-4" />
                    <p class="pt-2">
                        If your claim is approved, we'll credit to your nominated payout
                        details.
                    </p>
                </f7-block>

                <f7-card class="bg-[#f1f1f1] py-4 md:w-9/12 mx-auto group">
                    <f7-card-content>
                        <a href="#" class="flex justify-between">
                            <p>Claim reference number(s)</p>
                            <svg class="w-6 h-6 text-gray-800 dark:text-white opacity-0 absolute right-5 transition-opacity duration-300 group-hover:opacity-100"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m9 5 7 7-7 7" />
                            </svg>
                        </a>
                        <h3 class="text-xl font-medium">{{ claimsNumber ? claimsNumber : 'Loading...' }}</h3>
                        <Divider />

                        <p class="flex mx-auto">
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
                        <h2 class="uppercase text-base underline text-blue-700 font-light">
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
