// Legal documents shown in the drawer (redesign line 667) and the drawer's labels.

export const LEGAL_DOCS = {
  privacy: {
    title: "Privacy Policy",
    updated: "March 2026",
    sections: [
      {
        heading: "1. Who We Are",
        body: "This website is the personal portfolio of Andrea, a graphic and fashion designer. It is operated as a sole proprietorship. For any privacy-related inquiries, you may contact us via the contact form on this website.",
      },
      {
        heading: "2. What Information We Collect",
        body: "We collect only the information you voluntarily provide through the contact form: your name, email address, and message content. We do not collect payment information, create user accounts, or require registration of any kind.",
      },
      {
        heading: "3. How We Use Your Information",
        body: "The information you provide is used solely to respond to your inquiry or project request. We do not use your data for marketing purposes, share it with third parties, or store it beyond the time necessary to complete our correspondence.",
      },
      {
        heading: "4. Cookies & Analytics",
        body: "This website may use minimal, privacy-respecting analytics to understand general visitor behavior (e.g., page views). No personally identifiable information is collected through analytics. We do not use advertising cookies or cross-site tracking.",
      },
      {
        heading: "5. Third-Party Services",
        body: "This website may embed content or link to third-party platforms such as Instagram, Facebook, or Behance. These platforms have their own privacy policies and data practices, which we do not control. We encourage you to review their policies independently.",
      },
      {
        heading: "6. Data Retention",
        body: "Contact form submissions are retained only as long as necessary to fulfill your request. You may request deletion of your data at any time by contacting us directly.",
      },
      {
        heading: "7. Your Rights",
        body: "You have the right to access, correct, or request deletion of any personal data you have submitted to us. You also have the right to withdraw consent at any time. To exercise these rights, please use the contact form on this website.",
      },
      {
        heading: "8. Security",
        body: "We take reasonable precautions to protect your data during transmission and storage. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
      },
      {
        heading: "9. Changes to This Policy",
        body: "We may update this Privacy Policy from time to time. The date of the most recent revision is indicated at the top of this document. Continued use of this website constitutes acceptance of the updated policy.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: "March 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: "By accessing this website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of this website.",
      },
      {
        heading: "2. Nature of Services",
        body: "This portfolio represents the creative work of Andrea, a graphic and fashion designer offering freelance design services. Services may include, but are not limited to: brand identity design, visual communication, fashion illustration, lookbook design, editorial layout, and packaging design.",
      },
      {
        heading: "3. Intellectual Property",
        body: "All content displayed on this website - including designs, illustrations, photography, logos, and visual concepts - is the intellectual property of Andrea unless otherwise credited. Reproduction, redistribution, or commercial use of any content without prior written consent is strictly prohibited.",
      },
      {
        heading: "4. Project Engagements",
        body: "Project terms, deliverables, timelines, revisions, and pricing are agreed upon individually via written communication (email or contract) prior to commencing work. Nothing displayed on this portfolio constitutes a binding offer or guarantee of availability.",
      },
      {
        heading: "5. Client Responsibilities",
        body: "Clients are responsible for providing accurate project briefs, timely feedback, and necessary source materials. Delays caused by the client may affect project timelines without constituting a breach on the designer's part.",
      },
      {
        heading: "6. Revisions & Approval",
        body: "The number of revision rounds is specified in each project agreement. Work approved by the client in writing is considered final. Requests for changes after final approval may be subject to additional fees.",
      },
      {
        heading: "7. Payment",
        body: "Payment terms are outlined in individual project agreements. A deposit may be required before work commences. Failure to pay within the agreed timeframe may result in suspension of deliverables and/or termination of the project.",
      },
      {
        heading: "8. Portfolio Usage",
        body: "Unless explicitly restricted in writing, completed client projects may be featured in this portfolio and on related social media channels for self-promotion purposes. If confidentiality is required, please state this before project commencement.",
      },
      {
        heading: "9. Limitation of Liability",
        body: "Andrea shall not be liable for any indirect, incidental, or consequential damages arising from the use of delivered design work. Maximum liability is limited to the amount paid for the specific project in question.",
      },
      {
        heading: "10. Governing Law",
        body: "These terms are governed by the laws of the jurisdiction in which Andrea operates. Any disputes shall be resolved through good-faith negotiation before pursuing formal legal remedies.",
      },
      {
        heading: "11. Changes to Terms",
        body: "These Terms of Service may be updated at any time. The revision date is indicated above. Continued use of this website or engagement of services constitutes acceptance of the current terms.",
      },
    ],
  },
};

// Footer buttons, in order
export const LEGAL_KEYS = ["privacy", "terms"];

// Drawer kicker and date line of a legal text; `rights` also ends the footer copyright line
export const LEGAL_COPY = {
  kicker: "Legal",
  updatedLabel: "Last updated:",
  rights: "All rights reserved.",
};

// Chapter story in the drawer: "View the <unit>" button under the text
export const STORY_COPY = { action: "View the" };
