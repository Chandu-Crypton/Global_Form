import { createContext, useState } from "react";

// Create the Context
const ProfileContext = createContext(null);

const ProfileProvider = ({ children }) => {
    // State to hold form data
    const [details, setDetails] = useState({
        avatar: null,
        avatarPreview: "",
        firstName: "",
        lastName: "",
        company: "",
        phone: "",
        website: "",
        country: "",
        language: "",
        currency: "",
        timeZone: "",
        selectedPlan: null, 
    });

    return (
        <ProfileContext.Provider value={{ details, setDetails }}>
            {children}
        </ProfileContext.Provider>
    );
};

export { ProfileContext, ProfileProvider };
