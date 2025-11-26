import React from "react";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-white text-gray-800 p-8 max-w-3xl mx-auto">
    <h1 className="text-3xl font-bold mb-6 text-navy">Privacy Policy</h1>

    <p className="mb-4">
      TU Alumni Plus values your privacy. This policy explains what information we collect, how we use it, and how we protect it.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
    <ul className="list-disc list-inside space-y-1">
      <li>Name, email, department, and program (during registration)</li>
      <li>Feedback responses and activity logs</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
    <p>We use your data to manage accounts, analyze feedback, and improve the university experience.</p>

    <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
    <p>
      Your passwords are stored securely using encryption. We take appropriate security measures to protect your information.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Sharing</h2>
    <p>We do not share your personal data with third parties except where required by law.</p>

    <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
    <p>You can contact us to request access, correction, or deletion of your personal data.</p>

    <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact</h2>
    <p>If you have questions about this policy, contact: support@tualumniplus.edu</p>
  </div>
);

export default PrivacyPolicy;
