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

    //govt list of IDs
    const govtID = ref(["ph-passport", "drivers-license"]);
    const accident = ref([
        "ph-passport",
        "drivers-license",
        "police-narration-report",
        "hospital-statement",
    ])
    const illness = ref([
        "ph-passport",
        "drivers-license",
        "medical-certificate",
        "hospital-statement",
    ]);
    const death = ref([
        "ph-passport",
        "drivers-license",
        "death-certificate",
        "marriage-certificate",
    ]);

const randomMsg = ref([
    "We understand this process can be challenging.",
    "We are here to support you every step of the way.",
    "We appreciate your patience during this time.",
    "We know this can be a difficult period for you.",
    "We are committed to helping you through this.",
    "We empathize with your situation and are here to assist.",
    "We understand how important this claim is for you.",
    "We are dedicated to making this process as smooth as possible.",
    "We are with you through this process.",
    "We are sorry for any inconvenience this may cause.",
    "We value your trust in us during this time.",
    "We are here to answer any questions you may have.",
    "We know this situation can be stressful.",
    "We appreciate your understanding as we work through this.",
    "We are working hard to resolve your claim quickly.",
    "We understand the urgency of your situation.",
    "We are committed to providing the best support possible.",
    "We are here to help you navigate this process.",
    "We know this can be a frustrating experience.",
    "We are doing our best to expedite your claim.",
    "We understand the impact this may have on you.",
    "We are dedicated to resolving your claim efficiently.",
    "We are here to provide any assistance you need.",
    "We understand how critical this is for you.",
    "We appreciate your patience and cooperation.",
    "Our thoughts are with you during this process.",
    "Our team is here to support you.",
    "Our priority is to assist you as best as we can.",
    "Our goal is to make this process easier for you.",
    "Our commitment is to help you through every step.",
    "Our support is available whenever you need it.",
    "Our hearts go out to you during this time.",
    "Our promise is to handle your claim with care.",
    "Our team understands your concerns.",
    "Our aim is to resolve your claim swiftly.",
    "Our efforts are focused on your case.",
    "Our sympathy is with you as you navigate this.",
    "Our assistance is always here for you.",
    "Our goal is to reduce your stress.",
    "Our dedication is to your satisfaction.",
    "Our team is working diligently on your behalf.",
    "Our apologies for any delay you may experience.",
    "Our promise is to keep you informed.",
    "Our hope is to ease your burden.",
    "Our assurance is that we are here for you.",
    "Our team values your trust.",
    "Our priority is to address your needs.",
    "Our support will continue throughout this process.",
    "Our focus is on providing the best service.",
    "Our dedication to you is unwavering.",
])

const notificationBody = (body) => {
    switch (body) {
        case 'three':
            return "You submitted error documents in three consecutive uploads."
        case 'all':
            return "The documents you submitted are not readable, which has resulted in a low confidence rate."
    }
  }

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
        randomMsg,
        govtID,
        accident,
        illness,
        death,
        notificationBody
    };
}