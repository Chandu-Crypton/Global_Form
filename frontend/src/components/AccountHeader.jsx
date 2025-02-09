import { useContext, useState, useEffect } from "react";
import { ProfileContext } from "../context/ProfileContext";
import PricingPlan from "./PricingSection"; 
import moment from "moment-timezone";
import blankAvatar from "../assets/blank.svg";

const AccountHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { details, setDetails } = useContext(ProfileContext);
  const [regionTime, setRegionTime] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null); 
  const [select, setSelect] = useState(false)


  useEffect(() => {
    if (details.timeZone) {
      const regionTimeMoment = moment.tz(new Date(), details.timeZone);
      setRegionTime(regionTimeMoment.format("MM DD YYYY HH:mm:ss"));
    }
  }, [details.timeZone]);

  const handleUpgrade = (plan) => {
    if (plan) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        selectedPlan: plan,
      }));
      setIsModalOpen(false); 
    }
  };

  const handleClick = () => {
    setSelect(!select)
   
  }

  return (
    <>
      <div className="max-w-3xl flex items-center mx-auto mt-auto profile-container space-y-2 p-6 bg-white shadow-lg rounded-lg">

        <div className="w-30 h-30  flex items-center justify-center">
          {details.avatarPreview ? (
            <img src={details.avatarPreview} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <img src={blankAvatar} alt="Profile Pic" className="w-50 h-[200px]"/>
          )}
        </div>


        
        <div className="flex flex-col w-full ml-4">
          <div className="flex justify-end space-x-4 w-full">
            {select ?  <button onClick={handleClick}  className="text-md text-black p-2 bg-white cursor-pointer border border-gray-300 rounded-lg">
              Following
            </button> :  <button onClick={handleClick} className="text-md text-black p-2 bg-white cursor-pointer border border-gray-300 rounded-lg">
              Follow
            </button>}
           
            <button
              className="text-md text-white p-2 bg-green-500 border cursor-pointer border-black rounded-lg"
              onClick={() => setIsModalOpen(true)}
            >
              Pricing Plan
            </button>
          </div>
          <div className="flex space-x-2">
            <h2 className="text-xl font-semibold">{details.firstName}</h2>
            <h2 className="text-xl font-semibold">{details.lastName}</h2>
          </div>
          <p className="text-gray-500">{details.company}</p>
          <p className="text-gray-500">{details.companySite}</p>
          <p>{details.phone}</p>
          <p>{details.country}</p>
          {regionTime && <p>{regionTime}</p>}
          <p>
           Selected Plan:{" "}
             {details.selectedPlan
             ? `${details.selectedPlan.title} - ${details.selectedPlan.price} (${details.selectedPlan.billingCycle})`
             : "No plan selected"}
          </p>

        </div>
      </div>

     
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg relative">
          
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 text-xl hover:text-gray-700"
            >
              ✖
            </button>

            <PricingPlan onClose={() => setIsModalOpen(false)} onUpgrade={handleUpgrade} />

          </div>
        </div>
      )}
    </>
  );
};

export default AccountHeader;

