import React, { useState, useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { validateForm } from "../utils/Validations";
import axios from "axios";

const UserDetails = () => {
  const { setDetails } = useContext(ProfileContext);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    avatar: null,
    avatarPreview: "", 
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    companySite: "",
    country: "",
    language: "",
    currency: "",
    timeZone: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

     if (name === "avatar" && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file); // Create preview URL
      setFormData((prevData) => ({
        ...prevData,
        avatar: file,
        avatarPreview: imageUrl,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form is being submitted!", formData);
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
   
    if (formData.language) {
      try {
        const translatedData = await translateFormData(formData, formData.language);
        
        setDetails(translatedData);
      } catch (error) {
        console.error("Translation error:", error);
      }
    } else {
      
      setDetails(formData);
    }
  
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });
  
    fetch("http://localhost:5555/api/profile", {
      method: "POST",
      body: data,
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to save profile");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message || "Profile saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving profile:", error);
        alert("Error saving profile. Please try again.");
      });
  };
  


  const translateFormData = async (formData, targetLanguage) => {
   
    const languageMap = {
      en: "en", 
      th: "th", 
      ko: "ko", 
      ja: "ja", 
      mr: "mr", 
      hi:"hi", 
      bn:"bn", 
      gu:"gu", 
      te: "te", 
      ta:"ta", 
      kn: "kn"
    };
  
   
    const targetLangCode = languageMap[targetLanguage] || "en";
  
    
    if (targetLangCode === "en") {
      return formData;
    }
  
    const translatedData = { ...formData };
    const keysToTranslate = [
      "firstName",
      "lastName",
      "company",
      "companySite",
      "country",
      "language",
      "currency",
    ];
  
    for (const key of keysToTranslate) {
      const text = formData[key];
  
      if (text) {
        try {
          const response = await axios.get(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLangCode}`
          );
  
          
          if (response.data && response.data.responseData) {
            translatedData[key] = response.data.responseData.translatedText;
            console.log(`Translated ${key}:`, translatedData[key]); 
          } else {
            console.warn(`Translation API returned an unexpected response for ${key}.`);
            translatedData[key] = text; 
          }
        } catch (error) {
          console.error(`Error translating ${key}:`, error);
          translatedData[key] = text; 
        }
      }
    }
  
    return translatedData;
  };
  
  return (
    <div className="max-w-3xl mt-2 mx-auto flex flex-col items-center justify-center h-min-screen profile-container p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
       
        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Avatar</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 rounded w-3/4"
          />
        </div>

        
        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Full Name *</label>
          <input
            type="text"
            name="firstName"
            className="border p-2 rounded w-1/3"
            value={formData.firstName}
            onChange={handleChange}
          />
           
          <input
            type="text"
            name="lastName"
            className="border p-2 rounded w-1/3"
            value={formData.lastName}
            onChange={handleChange}
          />
         
        </div>
        {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
        {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
       
        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Company *</label>
          <input
            type="text"
            name="company"
            className="border p-2 rounded w-3/4"
            value={formData.company}
            onChange={handleChange}
          />
        
        </div>
        {errors.company && <p className="text-red-500">{errors.company}</p>}
       
        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Contact Phone *</label>
          <input
            type="text"
            name="phone"
            className="border p-2 rounded w-3/4"
            value={formData.phone}
            onChange={handleChange}
          />
          
        </div>
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        
        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Company Site</label>
          <input
            type="text"
            name="companySite"
            className="border p-2 rounded w-3/4"
            value={formData.companySite}
            onChange={handleChange}
          />
            
        </div>
        {errors.companySite && <p className="text-red-500">{errors.companySite}</p>}
     
        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Country *</label>
          <select
            name="country"
            className="border p-2 rounded w-3/4"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select a Country...</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Antarctica">Antarctica</option>
            <option value="France">France</option>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
            <option value="Dubai">Dubai</option>
            <option value="Turkey">Turkey</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Srilanka">Sri Lanka</option>
          </select>
          
        </div>
        {errors.country && <p className="text-red-500">{errors.country}</p>}
        
        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Language *</label>
          <select
            name="language"
            className="border p-2 rounded w-3/4"
            value={formData.language}
            onChange={handleChange}
          >
            <option value="">Select a Language...</option>
            <option value="en">English</option>
            <option value="th">Thai</option>
            <option value="ko">Korean</option>
            <option value="ja">Japanese</option>
            <option value="mr">मराठी - Marathi</option>
            <option value="hi">हिन्दी - Hindi</option>
            <option value="bn">বাংলা - Bangla</option>
            <option value="gu">ગુજરાતી - Gujarati</option>
            <option value="te">తెలుగు - Telugu</option>
            <option value="ta">தமிழ் - Tamil</option>
            <option value="kn">ಕನ್ನಡ - Kannada</option>
          </select>
        </div>
        {errors.language && <p className="text-red-500">{errors.language}</p>}
 
        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Time Zone *</label>
          <select
            name="timeZone"
            className="border p-2 rounded w-3/4"
            value={formData.timeZone}
            onChange={handleChange}
          >
            <option value="">Select a Timezone...</option>
            <option value="Asia/Tokyo">(GMT+09:00) Tokyo</option>
            <option value="Asia/Seoul">(GMT+09:00) Seoul</option>
            <option value="Asia/Karachi">(GMT+05:00) Karachi</option>
            <option value="Asia/Tashkent">(GMT+05:00) Tashkent</option>
            <option value="Africa/Nairobi">(GMT+03:00) Nairobi</option>
            <option value="Asia/Baghdad">(GMT+03:00) Baghdad</option>
            <option value="Asia/Dubai">(GMT+04:00) Abu Dhabi</option>
            <option value="Asia/Kolkata">(GMT+05:30) Kolkata</option>
            <option value="Asia/Chennai">(GMT+05:30) Chennai</option>
            <option value="Asia/Mumbai">(GMT+05:30) Mumbai</option>
            <option value="Asia/Delhi">(GMT+05:30) New Delhi</option>
            <option value="Asia/Bangkok">(GMT+07:00) Bangkok</option>
            <option value="Asia/Singapore">(GMT+08:00) Singapore</option>

          </select>
        </div>
        {errors.timeZone && <p className="text-red-500">{errors.timeZone}</p>}
      
        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Currency *</label>
          <select
            name="currency"
            className="border p-2 rounded w-3/4"
            value={formData.currency}
            onChange={handleChange}
          >
            <option value="">Select a currency...</option>
            <option value="USD">USD - USA dollar</option>
            <option value="INR">INR - Indian Rupees</option>
            <option value="GBP">GBP - British pound</option>
            <option value="AUD">AUD - Australian dollar</option>
            <option value="JPY">JPY - Japanese yen</option>
            <option value="SEK">SEK - Swedish krona</option>
          </select>
        </div>
        {errors.currency && <p className="text-red-500">{errors.currency}</p>}
       
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserDetails;
