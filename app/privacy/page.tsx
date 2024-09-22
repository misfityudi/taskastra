export default async function Page() {
  return (
    <main className="flex h-full flex-col items-center w-full max-w-screen-2xl">
      <div className="flex w-11/12 my-2 p-6 rounded-lg bg-dark text-center justify-center items-center">
        <h1 className="text-yellow text-2xl font-extrabold">Privacy Policy</h1>
      </div>
      <span className="text-darkGrey m-4 w-11/12">
        Effective Date: 22 September, 2024
      </span>
      <div className="w-11/12 m-4 overflow-y-auto">
        <h2 className="text-xl font-semibold text-darkGrey mb-1">
          1. Introduction
        </h2>
        <p className="text-darkGrey mb-4">
          {`Welcome to Taskastra ("we," "our," or "us"). We are committed to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your information when you use our online web-based card game ("Service").`}
        </p>

        <h2 className="text-xl font-semibold text-darkGrey mb-1">
          2. Information We Collect
        </h2>
        <div className="text-darkGrey mb-4">
          <ul className="ml-2 text-base font-semibold">
            2.1 Personal Information
          </ul>
          <ul className="ml-2">
            When you register for our Service or interact with us, we may
            collect the following personal information:
          </ul>
          <li className="ml-4">
            Use the Service for any illegal or unauthorized purpose.
          </li>
          <li className="ml-4">
            Interfere with or disrupt the operation of the Service or the
            servers or networks that host the Service.
          </li>
          <li className="ml-4">
            Use any automated system, such as bots, to access the Service.
          </li>
          <li className="ml-4">
            Attempt to gain unauthorized access to any part of the Service or
            any other accounts, systems, or networks.
          </li>
          <li className="ml-4">Harass, abuse, or harm other users.</li>
          <ul className="ml-2 text-base font-semibold mt-1">
            2.2 Non-Personal Information
          </ul>
          <ul className="ml-2">
            We may also collect non-personal information that cannot be used to
            identify you, such as:
          </ul>
          <li className="ml-4">
            <span className="font-semibold">Device Information:</span> Device
            type, operating system, and browser type.
          </li>
          <li className="ml-4">
            <span className="font-semibold">Usage Data:</span> Game statistics,
            scores, and user interactions.
          </li>
          <li className="ml-4">
            <span className="font-semibold">Log Data:</span> IP address, access
            times, and pages viewed.
          </li>
        </div>

        <h2 className="text-xl font-semibold text-darkGrey mb-1">
          3. How We Use Your Information
        </h2>
        <div className="text-darkGrey mb-4">
          <ul className="ml-2">
            We may also collect non-personal information that cannot be used to
            identify you, such as:
          </ul>
          <li className="ml-4">
            <span className="font-semibold">Device Information:</span> Device
            type, operating system, and browser type.
          </li>
          <li className="ml-4">
            <span className="font-semibold">Usage Data:</span> Game statistics,
            scores, and user interactions.
          </li>
          <li className="ml-4">
            <span className="font-semibold">Log Data:</span> IP address, access
            times, and pages viewed.
          </li>
        </div>

        <h2 className="text-xl font-semibold text-darkGrey mb-1">
          4. Sharing Your Information
        </h2>
        <div className="text-darkGrey mb-4">
          <ul className="ml-2">
            We do not sell or rent your personal information to third parties.
            We may share your information in the following circumstances:
          </ul>
          <li className="ml-4">
            <span className="font-semibold">With Service Providers: </span>
            Third-party companies that perform services on our behalf, such as
            payment processing and data analysis.
          </li>
          <li className="ml-4">
            <span className="font-semibold">With Legal Authorities:</span> If
            required by law, or to protect our rights, users, or the public.
          </li>
          <li className="ml-4">
            <span className="font-semibold">With Your Consent:</span> If you
            have given us explicit permission to share your information.
          </li>
        </div>

        <h2 className="text-xl font-semibold text-darkGrey mb-1">
          5. Data Security
        </h2>
        <p className="text-darkGrey mb-4">
          We implement appropriate security measures to protect your personal
          information from unauthorized access, alteration, disclosure, or
          destruction. However, please note that no method of transmission over
          the internet or electronic storage is completely secure.
        </p>

        <h2 className="text-xl font-semibold text-darkGrey mb-1">
          6. Your Rights
        </h2>
        <div className="text-darkGrey mb-4">
          <ul className="ml-2">
            You have the following rights regarding your personal information:
          </ul>
          <li className="ml-4">
            <span className="font-semibold">Access and Update:</span> Review and
            update your personal information through your account settings.
          </li>
          <li className="ml-4">
            <span className="font-semibold">Delete:</span> Request the deletion
            of your account and personal information.
          </li>
          <li className="ml-4">
            <span className="font-semibold">Opt-Out:</span> Unsubscribe from
            marketing communications by following the instructions in the emails
            we send.
          </li>
        </div>

        <h2 className="text-xl font-semibold text-darkGrey mb-1">
          {`7. Children's Privacy`}
        </h2>
        <p className="text-darkGrey mb-4">
          Our Service is not intended for children under the age of 13. We do
          not knowingly collect personal information from children under 13. If
          we become aware that we have inadvertently collected such information,
          we will take steps to delete it.
        </p>

        <h2 className="text-xl font-semibold text-darkGrey mb-1">
          8. Changes to This Privacy Policy
        </h2>
        <p className="text-darkGrey mb-4">
          We may update this Privacy Policy from time to time. We will notify
          you of any significant changes by posting the new Privacy Policy on
          our website and updating the effective date. Your continued use of the
          Service after the changes take effect will constitute your acceptance
          of the revised policy.
        </p>

        <h2 className="text-xl font-semibold text-darkGrey mb-1">
          9. Contact Us
        </h2>
        <div className="text-darkGrey mb-4">
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please contact us at:
          <li className="ml-2">chahar7vikas@gmail.com</li>
        </div>
        <p className="text-darkGrey mb-4">
          By using our Service, you agree to the terms outlined in this Privacy
          Policy.
        </p>
        <p className="text-darkGrey mb-4">Thank you for trying Taskastra!</p>
      </div>
    </main>
  );
}
