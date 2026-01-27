'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function CertificatePreview() {
  const searchParams = useSearchParams();
  const upSeal = PlaceHolderImages.find((img) => img.id === 'up-seal');
  const applicantPhotoPlaceholder = PlaceHolderImages.find((img) => img.id === 'applicant-photo');
  const qrCode = PlaceHolderImages.find((img) => img.id === 'qr-code');

  const data = React.useMemo(() => {
    const values: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      values[key] = value;
    });
    return values;
  }, [searchParams]);

  const issueDate = data.issueDate || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <div className="bg-background min-h-screen p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-4 no-print">
        <h1 className="text-3xl font-headline text-center">Certificate Preview</h1>
        <p className="text-center text-muted-foreground">This is a preview of your certificate. You can print it or download as PDF.</p>
        <div className="flex justify-center gap-4">
            <Button onClick={() => window.print()}>Print / Download PDF</Button>
            <Button variant="outline" onClick={() => window.history.back()}>Back to Form</Button>
        </div>
      </div>
      <div className="w-full max-w-4xl mt-8 certificate-preview aspect-[210/297] p-4 border border-black relative" style={{ fontFamily: "'Arial Unicode MS', sans-serif", fontSize: '10pt' }}>
        {upSeal && <Image src={upSeal.imageUrl} alt="UP Government Monogram" width={400} height={400} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 z-0" data-ai-hint="government monogram"/>}
        <div className="relative z-10">
            <table className="w-full" border={0} cellSpacing={0} cellPadding={0}>
                <tbody>
                    <tr>
                        <td colSpan={6} className="text-center">
                            {upSeal && <Image src={upSeal.imageUrl} alt={upSeal.description} width={110} height={110} className="mx-auto" data-ai-hint={upSeal.imageHint}/>}
                            <p className="text-5xl font-headline mt-4">उत्तर प्रदॆश शासन</p>
                            <p className="text-xl font-bold mt-8">उत्तर प्रदेश के {data.category} जाति के लिए जाति प्रमाण पत्र</p>
                        </td>
                    </tr>
                    <tr><td colSpan={6}>&nbsp;</td></tr>
                    <tr>
                        <td className="w-[17%]"><b>जिला</b></td>
                        <td className="w-auto">{data.currentAddressDistrict}</td>
                        <td colSpan={3} className="w-[30%]"></td>
                        <td className="w-[35%] text-left"><b>जारी दिनांक: {issueDate}</b></td>
                    </tr>
                    <tr>
                        <td><b>तहसील</b></td>
                        <td>{data.currentAddressTehsil}</td>
                        <td colSpan={3}></td>
                        <td></td>
                    </tr>
                     <tr>
                        <td className="align-top"><b>आवेदन क्र०</b></td>
                        <td className="align-top w-[30%]">251810030023825</td>
                        <td colSpan={3}></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="align-top"><b>प्रमाणपत्र क्र०</b></td>
                        <td className="align-top">512253005473</td>
                        <td colSpan={3}></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan={6}>
                            <table className="w-full" style={{fontSize: '10pt'}} cellSpacing="0" cellPadding="0">
                                <tbody>
                                    <tr>
                                        <td className="w-[10%] align-top">&nbsp;</td>
                                        <td className="w-[32%] align-top">&nbsp;</td>
                                        <td className="w-[33%] align-top">&nbsp;</td>
                                        <td className="w-[25%] align-top row-span-8">
                                            {data.applicantPhoto ? (
                                                <Image src={data.applicantPhoto} alt="Applicant's photo" width={96} height={96} style={{width: '96px', height: '96px'}} className="border"/>
                                            ) : (
                                                applicantPhotoPlaceholder && <Image src={applicantPhotoPlaceholder.imageUrl} alt={applicantPhotoPlaceholder.description} width={96} height={96} className="border" data-ai-hint={applicantPhotoPlaceholder.imageHint} />
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td className="h-5 align-middle">प्रमाणित किया जाता है कि</td>
                                        <td className="h-5 align-middle text-sm"><b>{data.applicantNameHindi}/{data.applicantNameEnglish}</b></td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td className="h-5 align-middle text-sm">{data.relationType}</td>
                                        <td className="h-5 align-middle text-sm"><b>{data.relationName}</b></td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td className="h-5 align-middle text-sm">माता का नाम</td>
                                        <td className="h-5 align-middle text-sm"><b>{data.motherName}</b></td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td className="h-5 align-middle text-sm">निवासी</td>
                                        <td className="h-5 align-middle text-sm"><b>{data.currentAddressHouseNo}, {data.currentAddressMohalla}</b></td>
                                    </tr>
                                    <tr>
                                        <td className="align-top">&nbsp;</td>
                                        <td className="h-5 align-top text-sm">ग्राम</td>
                                        <td className="h-5 align-top text-sm"><b>{data.currentAddressGram}</b>&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td className="align-top">&nbsp;</td>
                                        <td className="h-5 align-top text-sm">तहसील</td>
                                        <td className="h-5 align-top text-sm"><b>{data.currentAddressTehsil}</b></td>
                                    </tr>
                                    <tr>
                                        <td className="align-top">&nbsp;</td>
                                        <td className="h-5 align-top text-sm">जिला</td>
                                        <td className="h-5 align-top text-sm"><b>{data.currentAddressDistrict}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={6} className="text-sm leading-relaxed py-4">
                            उत्तर प्रदेश राज्य की <b><u>{data.caste}</u></b> जाति के व्यक्ति हैं। यह उत्तर प्रदेश लोक सेवा अनुसूचित जातियों,अनुसूचित जन जातियों तथा अन्य पिछड़े वर्गों के लिए आरक्षण अधिनियम १९९४ की अनुसूची एक के अन्तर्गत मान्यता प्राप्त है।
                            <br />
                            यह भी प्रमाणित किया जाता है कि <b>{data.applicantNameEnglish?.toUpperCase()}</b> पूर्वोक्त अधिनियम १९९४ (यथा संशोधित) की अनुसूची २ (जैसा कि उत्तर प्रदेश लोक सेवा)अनुसूचित जातियों, अनुसूचित जनजातियों और अन्य पिछड़े वर्गों के लिए आरक्षण (संशोधन) अधिनियम २००१ द्वारा प्रतिस्थापित किया गया है एंव जो उ०प्र० लोक सेवा अनुसूचित जातियों, अनुसूचित जनजातियों और अन्य पिछड़े वर्गों के लिए आरक्षण (संशोधन) अधिनियम २००२ एवं शासनादेश संख्या 22/16/92 टी० सी०-III , दिनाँक २० अक्टुबर २००८ द्वारा संशोधित की गई है, से आच्छादित नहीं है।इनके माता-पिता की निरन्तर तीन वर्षो की अवधि के लिये सकल वार्षिक आय आठ लाख रुपये या इससे अधिक नहीं है तथा इनके पास धन कर अधिनियम १९५७ मे तथा विहिप छूट सीमा से अधिक सम्पत्ति नहीं है |
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={6}>
                            <table className="w-full" cellSpacing="0" cellPadding="0">
                                <tbody>
                                    <tr>
                                        <td className="w-1/4 align-bottom h-20">
                                            {qrCode && <Image src={qrCode.imageUrl} alt={qrCode.description} width={56} height={56} data-ai-hint={qrCode.imageHint}/>}
                                        </td>
                                        <td className="w-1/4 h-20"></td>
                                        <td className="w-1/2 h-20 align-bottom">
                                            <div className="text-center">
                                                <div style={{fontSize: '20px', fontFamily: 'Arial'}}>{data.officerName?.toUpperCase()}&nbsp;</div>
                                                <div style={{fontSize: '8px', fontFamily: 'Arial'}}>Digitally Signed by {data.officerName?.toUpperCase()} O=Personal, C=IN,CN={data.officerName?.toUpperCase()}, L=ALLAHABAD, S=UTTAR PRADESH&nbsp;</div>
                                                <p><b>सक्षम अधिकारी/तहसीलदार</b></p>
                                                <p><b>डिजिटल हस्ताक्षरित</b></p>
                                                <p><b>{data.currentAddressTehsil}, {data.currentAddressDistrict}</b></p>
                                                <p><b>दिनॉंक:</b> {issueDate}</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr><td colSpan={6} className="h-4"></td></tr>
                    <tr>
                        <td colSpan={6} className="text-center text-xs pt-4 border-t border-dashed border-gray-400">
                             यह प्रमाण पत्र इलेक्ट्रॉनिक डिलिवरी सिस्टम द्वारा तैयार किया गया है तथा डिजिटल सिग्नेचर से हस्ताक्षरित है एवम् आवेदक द्वारा स्वयं की लॉग इन आइडी के माध्यम से डाउनलोड किया गया है। यह प्रमाण पत्र वेबसाइट https://edistrict.up.gov.in पर इसका पहले आवेदन क्र० फिर प्रमाणपत्र क्र० अंकित कर,सत्यापित किया जा सकता है।
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
