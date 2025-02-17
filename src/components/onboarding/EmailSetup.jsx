import React, { useState } from "react";
import { Mail, Globe, AlertCircle, Loader2, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

// import { GoogleWorkspaceService } from '../../services/onboarding/googleWorkspaceService';
// import { useOnboardingStore } from '../../stores/onboardingStore';
import { useVendorStore } from "../../stores/vendorStore";
import toast from "react-hot-toast";

export default function EmailSetup({ domain, onComplete }) {
  const { domainStatus, isSendEmailLoading } = useSelector(
    (state) => state.auth
  );

  const [isSettingUp, setIsSettingUp] = useState(false);
  const [emailOption, setEmailOption] = useState(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [existingEmail, setExistingEmail] = useState("");
  const [setupStep, setSetupStep] = useState("initial");
  // const { vendorDetails } = useOnboardingStore();
  // const workspaceService = new GoogleWorkspaceService();

  const handleSetupWorkspace = async () => {
    // if (!adminEmail) {
    //   toast.error('Please enter an admin email');
    //   return;
    // }
    // setIsSettingUp(true);
    // try {
    //   // Step 1: Initialize workspace setup
    //   const setup = await workspaceService.setupWorkspace(domain, adminEmail);
    //   setSetupStep('verification');
    //   // Step 2: Configure DNS records
    //   await workspaceService.configureMX(domain);
    //   // Step 3: Verify domain
    //   await workspaceService.verifyDomain(domain);
    //   // Step 4: Create admin user
    //   const user = await workspaceService.createUser(
    //     adminEmail,
    //     vendorDetails?.firstName || '',
    //     vendorDetails?.lastName || ''
    //   );
    //   setSetupStep('complete');
    //   toast.success('Google Workspace setup completed!');
    //   // Show temporary password to user
    //   toast((t) => (
    //     <div>
    //       <p className="font-medium">Temporary Password</p>
    //       <p className="text-sm mt-1">{user.temporaryPassword}</p>
    //       <div className="mt-2">
    //         <button
    //           onClick={() => {
    //             navigator.clipboard.writeText(user.temporaryPassword);
    //             toast.success('Password copied!');
    //           }}
    //           className="text-primary-600 text-sm hover:text-primary-700"
    //         >
    //           Copy Password
    //         </button>
    //       </div>
    //     </div>
    //   ), { duration: 10000 });
    //   onComplete();
    // } catch (error) {
    //   toast.error('Failed to setup Google Workspace');
    //   setSetupStep('initial');
    // } finally {
    //   setIsSettingUp(false);
    // }
  };

  const handleExistingEmail = () => {
    if (!existingEmail) {
      toast.error("Please enter your email address");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(existingEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate email domain matches
    const emailDomain = existingEmail.split("@")[1];
    if (emailDomain !== domain) {
      toast.error(`Email must be from the domain ${domain}`);
      return;
    }

    onComplete(existingEmail);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Setup Business Email
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {domainStatus?.isNewPurchase
            ? "Set up professional email for your new domain"
            : "Connect your existing email or set up a new one"}
        </p>
      </div>

      {setupStep === "initial" && (
        <div className="space-y-4">
          {!emailOption && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                // onClick={() => setEmailOption("workspace")}
                // className="p-6 text-left border border-gray-200 rounded-lg hover:border-primary-200 hover:bg-primary-50 transition-colors"
                className="p-6 text-left border border-gray-300 rounded-lg text-gray-600 opacity-50 transition-colors cursor-not-allowed"
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {domainStatus?.isNewPurchase
                    ? "Setup Google Workspace"
                    : "Create New Email"}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Professional email, calendar, and collaboration tools
                </p>
              </button>

              {!domainStatus?.isNewPurchase && (
                <button
                  onClick={() => setEmailOption("existing")}
                  className="p-6 text-left border border-gray-200 rounded-lg hover:border-primary-200 hover:bg-primary-50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    Use Existing Email
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Connect your existing email address from this domain
                  </p>
                </button>
              )}
            </div>
          )}

          {emailOption === "workspace" && (
            <div className="space-y-4">
              <button
                onClick={() => setEmailOption(null)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                ← Back to options
              </button>

              <div className="p-6 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-white rounded-lg">
                    <Globe className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Google Workspace
                    </h3>
                    <p className="text-sm text-gray-500">
                      Professional email, calendar, and collaboration tools
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Admin Email Address
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      value={adminEmail.split("@")[0]}
                      onChange={(e) =>
                        setAdminEmail(`${e.target.value}@${domain}`)
                      }
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="admin"
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      @{domain}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {emailOption === "existing" && (
            <div className="space-y-4">
              <button
                onClick={() => setEmailOption(null)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                ← Back to options
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    value={existingEmail}
                    onChange={(e) => setExistingEmail(e.target.value)}
                    placeholder={`example@${domain}`}
                    className="block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent px-4 py-2"
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p>
                    Make sure to enter an email address from your domain{" "}
                    {domain}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {setupStep === "verification" && (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">Setting up Google Workspace</p>
              <p className="mt-1">
                We're configuring your domain for Google Workspace. This may
                take a few minutes.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">
                Initializing workspace setup
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">
                Configuring DNS records
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
              <span className="text-sm text-gray-700">
                Verifying domain ownership
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="pt-6 flex space-x-4">
        {/* <button
          onClick={onComplete}
          className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Skip for now
        </button> */}
        {emailOption === "workspace" && setupStep === "initial" && (
          <button
            onClick={handleSetupWorkspace}
            disabled={!adminEmail || isSettingUp}
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSettingUp ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Setting up...
              </>
            ) : (
              "Continue"
            )}
          </button>
        )}
        {emailOption === "existing" && (
          <button
            onClick={handleExistingEmail}
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center justify-center"
          >
            {isSendEmailLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Sending OTP...
              </>
            ) : (
              "Continue"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
