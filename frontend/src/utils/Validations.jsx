export const validateForm = (formData) => {
    const errors = {};
  
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
  
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
  
    if (!formData.company.trim()) {
      errors.company = "Company name is required";
    }
  
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      errors.phone = "Phone number must be between 10-15 digits";
    }
  
    if (!formData.companySite ) {
      errors.companySite = "CompanySite is required";
    }
  
    if (!formData.country) {
      errors.country = "Country is required";
    }
  
    if (!formData.language) {
      errors.language = "Language is required";
    }
  
    if (!formData.currency) {
      errors.currency = "Currency is required";
    }
  
    if (!formData.timeZone) {
      errors.timeZone = "Time zone is required";
    }
  
    return errors;
  };
  