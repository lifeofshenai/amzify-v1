import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoUpload from "./LogoUpload";
import NameGenerator from "./NameGenerator";
import { AlertCircle, Wand2 } from "lucide-react";
import toast from "react-hot-toast";
import { SetState } from "../../redux/slices/auth";

export default function CompanyDetailsForm() {
  const dispatch = useDispatch();

  const { vendorDetails, steps } = useSelector((state) => state.auth);

  const [isIncorporated, setIsIncorporated] = useState();
  const [showNameGenerator, setShowNameGenerator] = useState(false);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    const newVendorDetails = { ...vendorDetails, [name]: value };
    dispatch(
      SetState({
        field: "vendorDetails",
        value: newVendorDetails,
      })
    );
  };

  const onSelectChange = (name, value) => {
    const newVendorDetails = {
      ...vendorDetails,
      [name]: value,
      ein: "",
      companyNumber: "",
      taxNumber: "",
      vatNumber: "",
    };
    dispatch(
      SetState({
        field: "vendorDetails",
        value: newVendorDetails,
      })
    );
  };

  const onNextStepClick = (step) => {
    dispatch(
      SetState({
        field: "currentStep",
        value: step,
      })
    );
  };

  const completeStep = (stepId) => {
    const allSteps = steps.map((step) =>
      step.id === stepId ? { ...step, completed: true } : step
    );
    dispatch(
      SetState({
        field: "steps",
        value: allSteps,
      })
    );
  };

  const handleSubmit = async (e) => {
    try {
      const {
        firstName,
        lastName,
        companyName,
        countryOfIncorporation,
        ein,
        companyNumber,
      } = vendorDetails;
      // Validate required fields
      if (!firstName || !lastName || !companyName) {
        toast.error("Please fill in all required fields");
        return;
      }

      // If incorporated, validate country-specific fields
      if (isIncorporated) {
        if (!countryOfIncorporation) {
          toast.error("Please select your country of incorporation");
          return;
        }

        if (countryOfIncorporation === "US") {
          if (!ein) {
            toast.error("EIN is required for US companies");
            return;
          }
          // Basic EIN validation (9 digits)
          const einRegex = /^\d{9}$/;
          if (!einRegex.test(ein?.replace(/-/g, ""))) {
            toast.error("Please enter a valid EIN (9 digits)");
            return;
          }
        } else if (countryOfIncorporation === "ZA") {
          if (!companyNumber) {
            toast.error(
              "Company registration number is required for South African companies"
            );
            return;
          }
          // Basic company number validation
          if (companyNumber.length < 5) {
            toast.error("Please enter a valid company registration number");
            return;
          }
        }
      }

      const newVendorDetails = {
        ...vendorDetails,
        currency: countryOfIncorporation === "US" ? "USD" : "ZAR",
      };
      dispatch(
        SetState({
          field: "vendorDetails",
          value: newVendorDetails,
        })
      );
      completeStep("company-details");
      onNextStepClick(1); // Move to payment setup
      toast.success("Company details saved successfully");
    } catch (error) {
      toast.error("Failed to save company details");
    }
  };

  const handleNameSelect = (name) => {
    // updateVendorDetails({ companyName: name });
    // setShowNameGenerator(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Company Details</h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter your personal and company information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={vendorDetails.firstName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={vendorDetails.lastName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <button
              type="button"
              // onClick={() => setShowNameGenerator(!showNameGenerator)} //disable for now
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center cursor-not-allowed"
            >
              <Wand2 className="w-4 h-4 mr-1" />
              {showNameGenerator
                ? "Hide Name Generator"
                : "Need help with a name?"}
            </button>
          </div>
          {showNameGenerator ? (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg">
              <NameGenerator onSelect={handleNameSelect} />
            </div>
          ) : (
            <input
              type="text"
              name="companyName"
              value={vendorDetails.companyName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Is your company incorporated?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setIsIncorporated(true)}
              className={`p-4 text-left border rounded-lg transition-colors ${
                isIncorporated === true
                  ? "border-primary-200 bg-primary-50"
                  : "border-gray-200 hover:border-primary-200 hover:bg-primary-50"
              }`}
            >
              <h3 className="font-medium text-gray-900">Yes</h3>
              <p className="text-sm text-gray-500">
                My company is registered and has the required documentation
              </p>
            </button>

            <button
              type="button"
              onClick={() => setIsIncorporated(false)}
              className={`p-4 text-left border rounded-lg transition-colors ${
                isIncorporated === false
                  ? "border-primary-200 bg-primary-50"
                  : "border-gray-200 hover:border-primary-200 hover:bg-primary-50"
              }`}
            >
              <h3 className="font-medium text-gray-900">No</h3>
              <p className="text-sm text-gray-500">
                I haven't registered my company yet
              </p>
            </button>
          </div>
        </div>

        {isIncorporated && (
          <>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Country of Incorporation
              </label>
              <select
                name="countryOfIncorporation"
                value={vendorDetails.countryOfIncorporation}
                onChange={(e) =>
                  onSelectChange("countryOfIncorporation", e.target.value)
                }
                className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select country</option>
                <option value="US">United States</option>
                <option value="ZA">South Africa</option>
              </select>
            </div>

            {vendorDetails.countryOfIncorporation === "US" && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  EIN (Employer Identification Number)
                </label>
                <input
                  type="text"
                  name="ein"
                  value={vendorDetails.ein}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="XX-XXXXXXX"
                  required
                />
              </div>
            )}

            {vendorDetails.countryOfIncorporation === "ZA" && (
              <>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Company Registration Number
                  </label>
                  <input
                    type="text"
                    name="companyNumber"
                    value={vendorDetails.companyNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tax Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="taxNumber"
                    value={vendorDetails.taxNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    VAT Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="vatNumber"
                    value={vendorDetails.vatNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </>
            )}
          </>
        )}

        <div className="md:col-span-2">
          <LogoUpload
            initialLogo={vendorDetails.logo}
            // onLogoChange={(logoData) => updateVendorDetails({ logo: logoData })}
          />
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
}
