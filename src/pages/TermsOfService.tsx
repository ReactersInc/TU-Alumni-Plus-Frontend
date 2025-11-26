import React from "react";

const TermsOfService = () => (
  <div className="min-h-screen bg-white text-gray-800 p-8 max-w-3xl mx-auto">
    <h1 className="text-3xl font-bold mb-6 text-navy">Terms of Service</h1>
    <p className="mb-4">
      Welcome to TU Alumni Plus. By accessing or using our platform, you agree to the following terms and conditions.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Service</h2>
    <p>You must use the platform only for lawful purposes related to alumni networking and university engagement.</p>

    <h2 className="text-xl font-semibold mt-6 mb-2">2. Account Responsibilities</h2>
    <p>
      You are responsible for maintaining the confidentiality of your login credentials and for any activities under your account.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">3. Prohibited Activities</h2>
    <ul className="list-disc list-inside space-y-1">
      <li>Uploading harmful or misleading content</li>
      <li>Attempting unauthorized access to the system</li>
      <li>Misuse of alumni data</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">4. Termination</h2>
    <p>We may suspend or terminate your account if you violate these terms.</p>

    <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes</h2>
    <p>We reserve the right to modify these terms at any time. Updated terms will be posted here.</p>
  </div>
);

export default TermsOfService;
