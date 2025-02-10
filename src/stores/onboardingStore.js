import { create } from 'zustand';


export const useOnboardingStore = create((set) => ({
  currentStep: 0,
  steps: [
    {
      id: 'company-details',
      title: 'Company Details',
      description: 'Enter your company information',
      completed: false,
      required: true
    },
    {
      id: 'payment-setup',
      title: 'Payment Setup',
      description: 'Set up your payment method',
      completed: false,
      required: true
    },
    {
      id: 'domain-email',
      title: 'Domain & Email',
      description: 'Set up your business domain and email',
      completed: false,
      required: false
    },
    {
      id: 'email-verification',
      title: 'Account Setup',
      description: 'Verify email and create password',
      completed: false,
      required: true
    }
  ],
  vendorDetails: {},
  setCurrentStep: (step) => set({ currentStep: step }),
  updateVendorDetails: (details) => set((state) => ({
    vendorDetails: { ...state.vendorDetails, ...details }
  })),
  completeStep: (stepId) => set((state) => ({
    steps: state.steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    )
  }))
}));