import { z } from "zod";

export const certificateSchema = z.object({
  serviceType: z.enum(["RURAL"], {
    required_error: "सेवा का प्रकार चुनें"
  }).default("RURAL"),
  applicantNameHindi: z.string().min(1, "प्रार्थी का नाम आवश्यक है"),
  applicantNameEnglish: z.string().min(1, "Applicant's Name (in English) is required"),
  applicantPhoto: z.string().optional(),
  relationType: z.enum(["पिता", "पति", "संरक्षक"], {
    required_error: "संबंध चुनें"
  }).default("पिता"),
  relationName: z.string().min(1, "नाम आवश्यक है"),
  motherName: z.string().optional(),
  currentAddressHouseNo: z.string().optional(),
  currentAddressMohalla: z.string().optional(),
  currentAddressDistrict: z.string().min(1, "जनपद आवश्यक है"),
  currentAddressTehsil: z.string().min(1, "तहसील आवश्यक है"),
  currentAddressGram: z.string().min(1, "ग्राम आवश्यक है"),
  category: z.string().min(1, "श्रेणी चुनें"),
  caste: z.string().min(1, "जाति आवश्यक है"),
  issueDate: z.string().min(1, "जारी दिनांक आवश्यक है"),
  officerName: z.string().min(1, "अधिकारी का नाम आवश्यक है"),
  applicationNumber: z.string().min(1, "आवेदन क्रमांक आवश्यक है"),
  certificateNumber: z.string().min(1, "प्रमाणपत्र क्रमांक आवश्यक है"),
});

export type CertificateFormValues = z.infer<typeof certificateSchema>;
