import { z } from "zod";

export const certificateSchema = z.object({
  serviceType: z.enum(["RURAL"], {
    required_error: "सेवा का प्रकार चुनें"
  }).default("RURAL"),
  applicantNameHindi: z.string().default("देवी दयाल गुप्ता"),
  applicantNameEnglish: z.string().default("Devi Dayal Gupta"),
  relationType: z.enum(["पिता", "पति", "संरक्षक"], {
    required_error: "संबंध चुनें"
  }).default("पिता"),
  relationName: z.string().min(1, "नाम आवश्यक है"),
  motherName: z.string().optional(),
  currentAddressHouseNo: z.string().optional(),
  currentAddressMohalla: z.string().optional(),
  currentAddressDistrict: z.string().min(1, "जनपद चुनें"),
  currentAddressTehsil: z.string().min(1, "तहसील चुनें"),
  currentAddressGram: z.string().optional(),
  mobileNo: z.string().length(10, "मोबाइल नंबर 10 अंकों का होना चाहिए").regex(/^\d+$/, "केवल अंक दर्ज करें"),
  isPermanentAddressSame: z.boolean().default(false),
  permanentAddress: z.string().min(1, "स्थाई पता आवश्यक है"),
  category: z.string().min(1, "श्रेणी चुनें"),
  caste: z.string().min(1, "जाति चुनें"),
  reason: z.string().min(1, "कारण आवश्यक है"),
  hasPreviousCertificate: z.enum(["0", "1"], {
    required_error: "यह चयन आवश्यक है"
  }).default("0"),
  familyId: z.string().default("218041587369"),
  applicantPhoto: z.any().optional()
}).refine(data => {
  if (data.serviceType === "RURAL") {
    return !!data.currentAddressGram;
  }
  return true;
}, {
  message: "ग्राम चुनें",
  path: ["currentAddressGram"],
});

export type CertificateFormValues = z.infer<typeof certificateSchema>;

export const tehsils: { [key: string]: { value: string, label: string }[] } = {
  "051": [
    { value: "0001", label: "भिन्गा" },
    { value: "0002", label: "इकौना" },
    { value: "0003", label: "जमुनहा" },
  ]
};

export const villages: { [key: string]: { value: string, label: string }[] } = {
  "0001": [{ value: "ग्राम 1-1", label: "ग्राम 1-1" }, { value: "ग्राम 1-2", label: "ग्राम 1-2" }],
  "0002": [{ value: "भिखारीपुर मसरी", label: "भिखारीपुर मसरी" }, { value: "ग्राम 2-2", label: "ग्राम 2-2" }],
  "0003": [{ value: "ग्राम 3-1", label: "ग्राम 3-1" }, { value: "ग्राम 3-2", label: "ग्राम 3-2" }],
};

export const castes: { [key: string]: { value: string, label: string }[] } = {
  "1": [{ value: "सुनार", label: "सुनार" }, { value: "लोहार", label: "लोहार" }],
  "2": [{ value: "चमार", label: "चमार" }, { value: "पासी", label: "पासी" }],
  "3": [{ value: "गोंड", label: "गोंड" }, { value: "थारू", label: "थारू" }],
  "5": [{ value: "विमुक्त जाति 1", label: "विमुक्त जाति 1" }],
};

export const attachmentTitles = [
  { value: "फोटो", label: "फोटो" },
  { value: "स्वप्रमाणित घोषणा पत्र", label: "स्वप्रमाणित घोषणा पत्र" },
  { value: "पार्षद या वार्डेन या ग्राम प्रधान द्वारा जारी दस्तावेज", label: "पार्षद या वार्डेन या ग्राम प्रधान द्वारा जारी दस्तावेज" },
  { value: "राशन कार्ड की छाया प्रति", label: "राशन कार्ड की छाया प्रति" },
  { value: "अन्य", label: "अन्य" },
];
