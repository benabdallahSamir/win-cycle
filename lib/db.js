const SUBMISSIONS_KEY = "winCycleSubmissions";

/**
 * Utility for local data management.
 * Note: Primary database is now Google Sheets via Server Actions.
 * LocalStorage is used as a local backup and for offline support.
 */
export const db = {
  /**
   * Saves a new submission to LocalStorage (as backup)
   * @param {Object} formData 
   * @returns {Object} The saved submission
   */
  saveSubmission: (formData) => {
    if (typeof window === "undefined") return null;

    try {
      const saved = localStorage.getItem(SUBMISSIONS_KEY);
      const submissions = saved ? JSON.parse(saved) : [];
      
      const newSubmission = {
        id: Date.now(),
        ...formData,
        registeredAt: new Date().toISOString()
      };
      
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify([newSubmission, ...submissions]));
      return newSubmission;
    } catch (error) {
      console.error("Error saving to local backup:", error);
      return null;
    }
  },

  /**
   * Retrieves all local submissions (backups)
   * @returns {Array}
   */
  getSubmissions: () => {
    if (typeof window === "undefined") return [];
    
    try {
      const saved = localStorage.getItem(SUBMISSIONS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error reading from local backup:", error);
      return [];
    }
  }
};
