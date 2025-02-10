import React from 'react';
// import { useOnboardingStore } from '../stores/onboardingStore';
import CompanyDetailsForm from '../components/onboarding/CompanyDetailsForm';
import PaymentSetup from '../components/onboarding/PaymentSetup';
import DomainEmailSetup from '../components/onboarding/DomainEmailSetup';
import EmailVerification from '../components/onboarding/EmailVerification';

export default function Onboarding() {
  // const { currentStep, steps, vendorDetails } = useOnboardingStore();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CompanyDetailsForm />;
      case 1:
        return <PaymentSetup />;
      case 2:
        return <DomainEmailSetup />;
      case 3:
        return <EmailVerification email={vendorDetails?.email || ''} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Welcome to Amzify</h1>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps?.length}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center">
              {steps?.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed
                        ? 'bg-primary-600'
                        : index === currentStep
                        ? 'bg-primary-200'
                        : 'bg-gray-200'
                    }`}>
                      <span className={`text-sm font-medium ${
                        step.completed || index === currentStep ? 'text-white' : 'text-gray-500'
                      }`}>
                        {index + 1}
                      </span>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">{step.title}</span>
                  </div>
                  {index < steps?.length - 1 && (
                    <div className="flex-1 h-0.5 mx-4 bg-gray-200" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}