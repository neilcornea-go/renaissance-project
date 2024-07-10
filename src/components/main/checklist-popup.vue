<script setup>
const checklistData = {
    "list": [
        {
            "index": 1,
            "title": "Accident claims",
            "items": ["Government ID", "Police/narration report", "Official receipts", "Hospital statement of account", "Certificate of employment / medical certificate"]
        },
        {
            "index": 2,
            "title": "Illness claims",
            "items": ["Government ID", "Hospital statement of account", "Medical certificate", "Histopath report", "Discharge summary"]
        },
        {
            "index": 3,
            "title": "Death claims",
            "items": ["Death certificate of the deceased", "Police/narration report", "Government ID of benefeciary", "Marriage certificate"]
        },
    ]
};
</script>

<template>
    <f7-popup class="checklist-popup">
        <f7-navbar>
            <f7-nav-left>
                <f7-link popup-close><svg class="w-[24px] h-[24px] text-gray-800" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="m15 19-7-7 7-7" />
                    </svg>
                </f7-link>
                <span class="text-gray-800 text-base font-medium">Back to submit claim</span>
            </f7-nav-left>
        </f7-navbar>
        <f7-block>
            <h3 class="text-gray-800 font-bold text-lg uppercase mb-6">Documents Checklist</h3>

            <div class="flex gap-4 mb-4 pb-4" v-for="(data, index) in checklistData.list" :key="data.index"
                :class="{ 'border-b': index !== checklistData.list.length - 1 }">
                <p
                    class="bg-gray-300 p-4 rounded-full flex-none grow-0 shrink-0 w-4 h-4 flex items-center justify-center font-medium text-gray-700">
                    {{ data.index }}
                </p>
                <p>
                    <span class="font-bold text-gray-700 text-base">{{ data.title }}</span>
                <ul class="ms-6 text-base text-gray-700">
                    <li class="list-disc" v-for="list in data.items" :key="list">{{ list }}</li>
                </ul>
                </p>
            </div>
        </f7-block>
    </f7-popup>
</template>