import { f7 } from 'framework7-vue';

import {
    analyzeModelDocument,
    getExtractedDocument
} from "../../js/hooks/documentClassifierAnalysis.js";


// Composable
import { useStaticData } from '../../composable/useStaticData';
const { randomMsg } = useStaticData();

  export const segregateDocs = async (docs) => {   
        
    const govtID = ["ph-passport", "drivers-license"];
    
    const otherDocs = [
        "police-narration-report",
        "hospital-statement",
        "medical-certificate",
        "death-certificate",
        "marriage-certificate",
    ];

    var govt_id_doc = []
    var other_doc = []
    for(let i=0; i < docs.length; i++){
        console.log(docs[i].extracted_data.docType,'docsss')
        var extract_doctype = docs[i].extracted_data.docType 
        
        if (govtID.includes(extract_doctype)) {
            govt_id_doc.push(docs[i]);
        }

        if (otherDocs.includes(extract_doctype)) {
            other_doc.push(docs[i]);
        }
    }

            var result = {govt_id_doc, other_doc}
            return result;
            

  }

  export const scoreDocs = async (docs) => {
    
            console.log(docs);
            var combineDocs = docs.govt_id_doc.concat(docs.other_doc)          
    
            const accident = [
                "ph-passport",
                "drivers-license",
                "police-narration-report",
                "hospital-statement",
            ];
            const illness = [
                "ph-passport",
                "drivers-license",
                "medical-certificate",
                "hospital-statement",
            ];
            const death = [
                "ph-passport",
                "drivers-license",
                "death-certificate",
                "marriage-certificate",
            ];

            var scoring = [
                { name: "accident", score: 0 },
                { name: "illness", score: 0 },
                { name: "death", score: 0 },
            ];
            for(let i=0; i < combineDocs.length; i++){
                var extract_doctype = combineDocs[i].extracted_data.docType 
                
                if (accident.includes(extract_doctype)) {
                    scoring[0].score = scoring[0].score + 1;
                }

                if (illness.includes(extract_doctype)) {
                    scoring[1].score = scoring[1].score + 1;
                }

                if (death.includes(extract_doctype)) {
                    scoring[2].score = scoring[2].score + 1;
                }
            }
            scoring.sort((a, b) => b.score - a.score);
            const max = scoring[0].score;
            console.log(scoring, max, scoring[0].name);
            return scoring[0].name;
  }

  export const filterDocs = async (docs, claim) => {

    const accident = [
        "ph-passport",
        "drivers-license",
        "police-narration-report",
        "hospital-statement",
    ];
    const illness = [
        "ph-passport",
        "drivers-license",
        "medical-certificate",
        "hospital-statement",
    ];
    const death = [
        "ph-passport",
        "drivers-license",
        "death-certificate",
        "marriage-certificate",
    ];
    var final_other_docs = []
    var not_included = []
            for (let y = 0; y < docs.length; y++) {

                if (claim === 'accident') {
                    if (accident.includes(docs[y].document_type)) {
                        final_other_docs.push(docs[y]);
                    } else {
                        not_included.push(docs[y]);
                    }
                }
                if (claim === 'illness') {
                    if (illness.includes(docs[y].document_type)) {
                        final_other_docs.push(docs[y]);
                    } else {
                        not_included.push(docs[y]);
                    }
                }
                if (claim === 'death') {
                    if (death.includes(docs[y].document_type)) {
                        final_other_docs.push(docs[y]);
                    } else {
                        not_included.push(docs[y]);
                    }
                }
            }

            var result = {final_other_docs, not_included}

            return result
  }
  

  export const lackingDocs = async (govtID, otherDocs, claimType) => {

    console.log(otherDocs)

    var govtIDList = ["ph-passport", "drivers-license"];
    
    var accident = [
        "police-narration-report",
        "hospital-statement",
    ];
    var illness = [
        "medical-certificate",
        "hospital-statement",
    ];
    var death = [
        "death-certificate",
        "marriage-certificate",
    ];

    for(let x=0; x < govtID.length; x++){
        var res_govt = govtIDList.filter(name => name !== govtID[x].document_type)
        govtIDList = res_govt
        
    }


    for(let y=0; y < otherDocs.length; y++){
        if(claimType === 'accident'){
            const i = accident.indexOf(otherDocs[y].document_type)
            if(i > -1){
                accident.splice(i, 1)
            }
            
        }
    }
    
    var result = {govtIDList, accident}
    return result
  }

  export const checkDocs = async (docs) => {

    console.log(docs);

    const docs_location_verify = [];
    for (let x = 0; x < docs.length; x++) {
        const res = await analyzeModelDocument(
            {
                _overload: "analyzeDocument",
                "api-version": "2024-02-29-preview",
            },
            {
                base64Source: docs[x].base64URL,
            },
            {
                modelID: docs[x].document_type,
            }
        );

        if (res.ok) {
            // delete docs[x].base64URL;
            var verified_doc = {
                ...docs[x],
                operation_location_verify: res.data.headers["operation-location"],
            };
            docs_location_verify.push(verified_doc);
        }
    }
    return docs_location_verify;

  }

  
  export const contentCheckDocs = async (docs) => {

    const docs_extracted = [];
    for (let i = 0; i < docs.length; i++) {
        var x = docs[i];
        const res = await getExtractedDocument(x.operation_location_verify);
        console.log(res);
        if (res.ok) {
            var extracted = res.data.data.analyzeResult.documents[0].fields
            if(x.document_type === 'ph-passport') var fullname = cleanString(extracted.fname.content)+' '+ cleanString(extracted.lname.content)
            if(x.document_type === 'hospital-statement') var fullname = cleanString(extracted.hs_fname.content)+' '+ cleanString(extracted.hs_lname.content)
            if(x.document_type === 'police-narration-report') var fullname = cleanString(extracted.pr_fname.content)+' '+ cleanString(extracted.pr_lname.content)

            var claimant = JSON.parse(localStorage.getItem("claimant"));
            if(fullname.toLowerCase() !== claimant.account_name.toLowerCase()){ var error = true; var errorMsg = 'Document information is not for policy holder.'}
            else{ var error = false; var errorMsg = ''}
            x.extracted_data = res.data
            docs_extracted.push({...docs[i], extracted_data: res.data, error, errorMsg})
        }
    }
    return docs_extracted;

  }

    
  export const checkErrorDocs = async (docs) => {

    var safe_docs = docs.filter(obj => obj.error === false)
    var error_docs = docs.filter(obj => obj.error === true)
    
    return {safe_docs, error_docs};

  }
  export const removeDocuments = async (docs, documents) => { 
    for(let i=0; i < docs.length; i++){
        var er = documents
        var x = er.filter(obj => obj.file.name !== docs[i].file.name)
        er = x
    }
    return er
  }

  export const openPreloader = (progress) => {

        if(progress) {
            var dialog = f7.dialog.progress();
            dialog.setText(getRandomMsg(JSON.parse(JSON.stringify(randomMsg.value))))
        }

        else {
            f7.dialog.close();
        }

  }

  export const cleanString = (str) => {
    str = str.trim()
    str = str.replace(/[^a-zA-Z0-9\s-]/g, '');

    return str
  }

  export const getRandomMsg = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex]
  }
  
  