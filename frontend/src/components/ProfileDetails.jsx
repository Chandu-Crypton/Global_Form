import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ProfileDetails = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      company: "",
      phone: "",
      website: "",
      country: "",
      language: "",
      currency: "",
      timeZone: "",
      avatar: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      company: Yup.string().required("Company is required"),
      phone: Yup.string().required("Phone is required"),
      website: Yup.string().url("Invalid URL"),
      country: Yup.string().required("Country is required"),
      language: Yup.string().required("Language is required"),
      timeZone: Yup.string().required("Time zone is required"),
      currency: Yup.string().required("Currency is required"),
    }),
    onSubmit: async (values) => {
      console.log("🚀 Form is being submitted!");
      console.log("Formik Errors:", formik.errors);
      console.log("Form Values:", values);

      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      try {
        const response = await fetch("http://localhost:5555/api/profile", {
          method: "POST",
          body: formData,
        });

        console.log("Response:", response);

        if (response.ok) {
          console.log("✅ Data sent:", formData);
          alert("Profile updated successfully!");
        }
      } catch (error) {
        console.error("❌ Error submitting form", error);
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center h-min-screen profile-container p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>

      {/* Display Validation Errors if Any */}
      {Object.keys(formik.errors).length > 0 && (
        <div className="text-red-500 mb-4">
          ⚠️ Please fix validation errors before submitting.
        </div>
      )}

      <form
        onSubmit={() => {
          // event.preventDefault();
          console.log("📌 Submit button clicked");
          formik.handleSubmit();
        }}
        className="space-y-4"
      >
        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(event) =>
              formik.setFieldValue("avatar", event.currentTarget.files[0])
            }
            className="border p-2 rounded w-[150px] h-[150px]"
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Full Name *</label>
          <input
            type="text"
            name="firstName"
            className="border p-2 rounded w-1/3"
            {...formik.getFieldProps("firstName")}
          />
          <input
            type="text"
            name="lastName"
            className="border p-2 rounded w-1/3"
            {...formik.getFieldProps("lastName")}
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Company *</label>
          <input
            type="text"
            name="company"
            className="border p-2 rounded w-3/4"
            {...formik.getFieldProps("company")}
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Contact Phone *</label>
          <input
            type="text"
            name="phone"
            className="border p-2 rounded w-3/4"
            {...formik.getFieldProps("phone")}
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Company Site</label>
          <input
            type="text"
            name="website"
            className="border p-2 rounded w-3/4"
            {...formik.getFieldProps("website")}
          />
        </div>

        {/* Country Selection */}
        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Country *</label>
          <select
            className="border p-2 rounded w-3/4"
            {...formik.getFieldProps("country")}
          >
            <option value="">Select a Country...</option>
            <option value="AF">Afghanistan</option>
            <option value="AS">American Samoa</option>
            <option value="AQ">Antarctica</option>
          </select>
        </div>

        {/* Language Selection */}
        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Language *</label>
          <select
            className="border p-2 rounded w-3/4"
            {...formik.getFieldProps("language")}
          >
            <option value="">Select a Language...</option>
            <option value="th">Thai</option>
            <option value="ko">Korean</option>
            <option value="ja">Japanese</option>
          </select>
        </div>

        {/* Time Zone Selection */}
        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Time Zone *</label>
          <select
            className="border p-2 rounded w-3/4"
            {...formik.getFieldProps("timeZone")}
          >
            <option value="">Select a Timezone...</option>
            <option value="Asia/Tokyo">(GMT+09:00) Tokyo</option>
            <option value="Asia/Seoul">(GMT+09:00) Seoul</option>
          </select>
        </div>

        {/* Currency Selection */}
        <div className="flex items-center gap-6">
          <label className="text-gray-700 w-1/4">Currency *</label>
          <select
            className="border p-2 rounded w-3/4"
            {...formik.getFieldProps("currency")}
          >
            <option value="">Select a currency...</option>
            <option value="USD">USD - USA dollar</option>
            <option value="GBP">GBP - British pound</option>
          </select>
        </div>

        {/* Submit Button */}
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

export default ProfileDetails;
