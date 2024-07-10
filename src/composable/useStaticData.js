import { ref } from 'vue';

// Define your static data
const typeInjuryOptions = ref([
    { id: '1', option: 'Contusion Injury' },
    { id: '2', option: 'Injury 2' },
    { id: '3', option: 'Injury 3' }
]);

const partBodyInjuredOptions = ref([
    { id: '1', option: 'Head' },
    { id: '2', option: 'Ear' },
    { id: '3', option: 'Eye' },
    { id: '4', option: 'Mouth' },
    { id: '5', option: 'Nose' }
]);

export function useStaticData() {
    return {
        typeInjuryOptions,
        partBodyInjuredOptions
    };
}