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


const bankNameOptions = ref([
    { id: '1', option: 'Public Bank' },
    { id: '2', option: 'Public Bank2' },
    { id: '3', option: 'Public Bank3' },
    { id: '4', option: 'BPI' },

]);

const typeOfAccountOptions = ref([
    { id: '1', option: 'Savings' },
    { id: '2', option: 'Current' },


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

const claimsChecklist = ref([
    {
        id: '1',
        claim: 'Accident',
        key: 'accident',
        documents: [
            'govt_id',
            'police_narration_report',
            'hospital_statement'
        ]
    },
    {
        id: '2',
        claim: 'Death',
        key: 'death',
        documents: [
            'govt_id',
            'death_certificate',
            'marriage_certificate'
        ]
    },
    {
        id: '3',
        claim: 'Illness',
        key: 'illness',
        documents: [
            'govt_id',
            'hospital_statement',
            'medical_certificate'
        ]
    },
]);

const bankDetails = ref([
    {
        id: '1',
        policyNumber: '123456',
        bank_name: 'BPI',
        account_name: 'Test 1',
        account_number: '1234567890',
        type_of_account: 'Savings',
    },
    {
        id: '2',
        policyNumber: '1234567890',
        bank_name: 'BPI',
        account_name: 'Hector Neil Cornea',
        account_number: '2345678901',
        type_of_account: 'Savings',
    },

    {
        id: '3',
        policyNumber: '1234567899',
        bank_name: 'Public Bank',
        account_name: 'Lawrence Layola',
        account_number: '3456789012',
        type_of_account: 'Current',
    },

    {
        id: '4',
        policyNumber: '357890',
        bank_name: 'BPI',
        account_name: 'Test 4',
        account_number: '4567890123',
        type_of_account: 'Current',
    },

    {
        id: '5',
        policyNumber: '987654',
        bank_name: 'BPI',
        account_name: 'Test 5',
        account_number: '5678901234',
        type_of_account: 'Current',
    },
]);

const randomMsg = ref([
    "We are sorry you're going through this. We here for you.",
    "Thinking of you and hoping for a smooth claims process.",
    "Wishing you strength and patience during this difficult time.",
    "We understand this is stressful. Please let us know if you need anything.",
    "Sending you positive thoughts as you navigate this situation.",
    "We hope everything gets resolved quickly and fairly for you.",
    "You're in our thoughts as you deal with this challenging process.",
    "We are sorry for the inconvenience and frustration. Hang in there.",
    "Wishing you peace and clarity as you manage your claims.",
    "We hope things get easier for you soon. Take care of yourself."
])

export function useStaticData() {
    return {
        bankDetails,
        bankNameOptions,
        typeOfAccountOptions,
        typeInjuryOptions,
        partBodyInjuredOptions,
        mainCheckboxOptions,
        natureDeathOptions,
        relationshipOptions,
        genderOptions,
        claimsChecklist,
        randomMsg

    };
}