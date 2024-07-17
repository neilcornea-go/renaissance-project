import Helpers from "../../../src/js/helpers";

const { api } = Helpers();

export const analyzeDocument = async (param, data) => {
    console.log(param, data)
    const res = await api({
        // module: "azure", //default is no type or type is null
        method: "POST",
        url: `https://go-document-ai.cognitiveservices.azure.com/documentintelligence/documentClassifiers/document-classification:analyze`,
        param, data //data here is the base64 of file
    });
  
    if (res.ok) {
    }
    return res;
  };

export const getDocumentAnalysis = async (url) => {
    const res = await api({
      method: "GET",
      url
    });
  
    if (res.ok) {
    }
    return res;
  };
  
