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

const typeOfAccountOptions = ref([
    { id: '1', option: 'Current account' },
    { id: '2', option: 'Current account2' },
    { id: '3', option: 'Current account3' },

]);

const bankNameOptions = ref([
    { id: '1', option: 'Public Bank' },
    { id: '2', option: 'Public Bank2' },
    { id: '3', option: 'Public Bank3' },

]);

const mainCheckboxOptions = ref([
    { id: '1', option: 'Yes' },
    { id: '2', option: 'No' },
]);

const natureDeathOptions = ref([
    { id: '1', option: 'Illness' },
    { id: '2', option: 'Accident' },
]);

const relationshipOptions = ref([
    { id: '1', option: 'Spouse' },
    { id: '2', option: 'Relative' },
    { id: '3', option: 'Mother' },
]);

const genderOptions = ref([
    { id: '1', option: 'Male' },
    { id: '2', option: 'Female' },
]);

export function useStaticData() {
    return {
        bankNameOptions,
        typeOfAccountOptions,
        typeInjuryOptions,
        partBodyInjuredOptions,
        mainCheckboxOptions,
        natureDeathOptions,
        relationshipOptions,
        genderOptions
    };
}