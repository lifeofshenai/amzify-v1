import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DomainSearch from "./DomainSearch";
import EmailSetup from "./EmailSetup";
import { Globe, Mail } from "lucide-react";
import { SetState } from "../../redux/slices/auth";

export default function DomainEmailSetup() {
  const dispatch = useDispatch();

  const [step, setStep] = useState("domain");

  const { domainStatus } = useSelector((state) => state.auth);

  const setCurrentStep = () => {};

  const setDomainStatus = () => {};

  const completeStep = () => {};

  const handleDomainSelect = async (domain, price) => {
    setDomainStatus({
      domain,
      available: true,
      price,
      isNewPurchase: true,
    });
    setStep("email");
  };

  const handleExistingDomain = (domain) => {
    setDomainStatus({
      domain,
      available: false,
      isNewPurchase: false,
    });
    setStep("email");
  };

  const handleEmailComplete = () => {
    // completeStep('domain-email');
    // setCurrentStep(3); // Move to email verification step
  };

  const onNextStepClick = (step) => {
    dispatch(
      SetState({
        field: "currentStep",
        value: step,
      })
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          {step === "domain" ? "Set Up Your Domain" : "Set Up Your Email"}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {step === "domain"
            ? "Choose a domain name for your business or connect an existing one"
            : "Set up your professional business email"}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center space-x-4">
        <div
          className={`flex items-center space-x-2 ${
            step === "domain" ? "text-primary-600" : "text-gray-400"
          }`}
        >
          <Globe className="w-5 h-5" />
          <span className="text-sm font-medium">Domain Setup</span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-200">
          <div
            className={`h-full bg-primary-600 transition-all duration-300 ${
              step === "email" ? "w-full" : "w-0"
            }`}
          />
        </div>
        <div
          className={`flex items-center space-x-2 ${
            step === "email" ? "text-primary-600" : "text-gray-400"
          }`}
        >
          <Mail className="w-5 h-5" />
          <span className="text-sm font-medium">Email Setup</span>
        </div>
      </div>

      {step === "domain" ? (
        <DomainSearch
          onDomainSelect={handleDomainSelect}
          onExistingDomain={handleExistingDomain}
        />
      ) : (
        <EmailSetup
          domain={domainStatus?.domain || ""}
          isNewDomain={domainStatus?.isNewPurchase || false}
          onComplete={handleEmailComplete}
        />
      )}

      <div className="pt-6 flex space-x-4">
        {step === "email" && (
          <button
            onClick={() => setStep("domain")}
            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
        )}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => onNextStepClick(3)}
          className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Test NEXT
        </button>
      </div>
    </div>
  );
}
