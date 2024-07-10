<script setup>
import { ref } from 'vue';
import GlobalLayout from '../components/structure/layout.vue';
import StepIndicator from '../components/common/step.vue';
import Title from '../components/common/title.vue';
import Subtitle from '../components/common/subtitle.vue';
import Divider from '../components/common/divider.vue';
import DocumentInfo from '../components/main/document-info.vue';

// Form Input Components
import InputText from '../components/form/input-text.vue';
import InputFile from '../components/form/input-file.vue';

const inputValue = ref('');
const selectedFiles = ref([]);
</script>

<template>
    <GlobalLayout>
        <section class="flex flex-col gap-8">
            <!-- Steps Indicator -->
            <div class="space-y-1">
                <StepIndicator step="1" />
                <Title title="Submit a Claim" />
                <Subtitle
                    subtitle="Let us know about your claim by entering your policy number and uploading all the required documents." />
            </div>

            <!-- Upload Documents -->
            <div class="flex flex-col gap-4">
                <!-- Policy Number Input -->
                <InputText v-model="inputValue" label="Policy number" placeholder="e.g. 123456789B" />

                <Divider />

                <!-- Title Header -->
                <div class="space-y-2">
                    <h2 class="text-gray-700 text-lg font-medium">Upload documents</h2>
                    <p class="flex items-center gap-1 text-blue-500">
                        <svg class="w-[20px] h-[20px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span class="cursor-pointer hover:underline popup-open" data-popup=".demo-popup">View
                            document checklist</span>
                    </p>
                </div>

                <f7-popup class="demo-popup" style="height: 60vh;">
                    <f7-navbar title="DOCUMENTS CHECKLIST">
                        <f7-nav-right>
                            <f7-link popup-close>Close</f7-link>
                        </f7-nav-right>
                    </f7-navbar>
                    <f7-block>
                        <p>
                            Here comes popup. You can put here anything, even independent view with its own
                            navigation. Also not, that by default popup looks a bit different on iPhone/iPod and
                            iPad, on iPhone it is fullscreen.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris
                            leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac
                            urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia
                            venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros.
                            Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra
                            pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero
                            mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor.
                            Suspendisse a faucibus lectus.
                        </p>
                        <p>
                            Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit nisl
                            ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel, feugiat sed
                            quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante. Sed molestie, est in
                            eleifend sagittis, leo tortor ullamcorper erat, at vulputate eros sapien nec libero.
                            Mauris dapibus laoreet nibh quis bibendum. Fusce dolor sem, suscipit in iaculis id,
                            pharetra at urna. Pellentesque tempor congue massa quis faucibus. Vestibulum nunc eros,
                            convallis blandit dui sit amet, gravida adipiscing libero.
                        </p>
                    </f7-block>
                </f7-popup>

                <!-- Click to Upload Action -->
                <div class="space-y-2">
                    <InputFile v-model="selectedFiles" />
                    <span class="text-gray-500">Supported files: doc, docx, pdf, jpg (max. 5MB)</span>
                </div>

                <!-- Documents List -->
                <div>
                    <DocumentInfo type="normal" />
                </div>

                <!-- Error Prompt -->
                <div class="bg-gray-100 px-4 py-8 rounded">
                    <p class="text-red-500 text-base mb-4">It appears that you are filing a claim for an accident.
                        The document(s) below will be removed as they are not required.
                    </p>

                    <!-- Error Documents List -->
                    <DocumentInfo type="error" />
                </div>

                <!-- Action Button -->
                <div class="bg-white my-3">
                    <f7-button fill round large>Validate</f7-button>
                </div>
            </div>
        </section>
    </GlobalLayout>
</template>