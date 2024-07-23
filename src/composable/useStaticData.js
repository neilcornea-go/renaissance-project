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
    { id: '1', option: 'Current Account1' },
    { id: '2', option: 'Current Account2' },
    { id: '3', option: 'Current Account3' },
    { id: '4', option: 'Current Account4' },
    { id: '5', option: 'Current Account5' },

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
            account_number: '899991',
            type_of_account: 'Current Account1',
        },
        {
            id: '2',
            policyNumber: '246810',
            bank_name: 'BPI',
            account_name: 'Test 2',
            account_number: '899992',
            type_of_account: 'Current Account2',
        },

        {
            id: '3',
            policyNumber: '135790',
            bank_name: 'Public Bank',
            account_name: 'Test 3',
            account_number: '899993',
            type_of_account: 'Current Account3',
        },

        {
            id: '4',
            policyNumber: '357890',
            bank_name: 'BPI',
            account_name: 'Test 4',
            account_number: '899994',
            type_of_account: 'Current Account4',
        },

        {
            id: '5',
            policyNumber: '987654',
            bank_name: 'BPI',
            account_name: 'Test 5',
            account_number: '899995',
            type_of_account: 'Current Account5',
        },
    
]);

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
        claimsChecklist
        
    };
}