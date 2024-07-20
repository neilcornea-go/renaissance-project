import { ref } from "vue";
import { defineStore } from "pinia";

export const useDocumentsStore = defineStore("documents", {
  state: () => {
    return {
        document: localStorage.getItem("use_document_store") || [],
    }
  },

    actions: {
      persistDocument(data) {
        localStorage.setItem("documents", JSON.stringify(this.document));
      },
    },

  getters: {
    getAnalyzedDocument(state) {
      return state.document;
    },
  },

  persist: true,
});
