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
  const watermark = PlaceHolderImages.find((img) => img.id === 'gov-monogram');


  const data = React.useMemo(() => {
    const values: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      values[key] = value;
    });
    return values;
  }, [searchParams]);

  const issueDate = data.issueDate || '09/10/2025';
  const applicationNo = '251810030023825';
  const certificateNo = '512253005473';

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
      <div className="w-full max-w-4xl mt-8 relative certificate-preview">
        {watermark && <Image src={watermark.imageUrl} alt={watermark.description} width={400} height={400} className="absolute top-[220px] left-[130px] -z-10 opacity-10" data-ai-hint={watermark.imageHint}/>}
        
        <table className="w-full border border-black" cellSpacing="0" cellPadding="4" style={{ fontSize: '10pt', fontFamily: "'Arial Unicode MS', sans-serif" }}>
          <tbody>
            <tr><td colSpan={6} className="h-4"></td></tr>
            <tr>
              <td colSpan={6} className="text-center">
                {upSeal && <Image src={upSeal.imageUrl} alt={upSeal.description} width={110} height={110} className="mx-auto" data-ai-hint={upSeal.imageHint}/>}
              </td>
            </tr>
            <tr>
              <td colSpan={6} className="text-center">
                <p className="text-5xl font-headline">उत्तर प्रदॆश शासन</p>
              </td>
            </tr>
            <tr><td colSpan={6} className="h-4"></td></tr>
            <tr>
              <td colSpan={6} className="text-center">
                <p className="text-xl font-bold">उत्तर प्रदेश के {data.category || 'पिछड़ी'} जाति के लिए जाति प्रमाण पत्र</p>
              </td>
            </tr>
            <tr><td colSpan={6} className="h-8"></td></tr>
            <tr>
                <td className="w-[17%] whitespace-nowrap"><b>जिला</b></td>
                <td className="whitespace-nowrap"><b>{data.currentAddressDistrict}</b></td>
                <td colSpan={3} className="w-[30%]"></td>
                <td className="w-[35%] whitespace-nowrap text-left"></td>
            </tr>
            <tr>
                <td className="w-[17%] whitespace-nowrap"><b>तहसील</b></td>
                <td className="whitespace-nowrap"><b>{data.currentAddressTehsil}</b></td>
                <td colSpan={3} className="w-[30%]"></td>
                <td className="w-[35%] whitespace-nowrap text-left"><b>जारी दिनांक: {issueDate}</b></td>
            </tr>
            <tr>
                <td className="w-[17%] whitespace-nowrap align-top"><b>आवेदन क्र०</b></td>
                <td className="w-[30%] whitespace-nowrap align-top"><b>{applicationNo}</b></td>
                <td colSpan={3} className="w-[30%] align-top text-left"></td>
                <td className="w-[35%] align-right"></td>
            </tr>
            <tr>
                <td className="w-[17%] whitespace-nowrap align-top"><b>प्रमाणपत्र क्र०</b></td>
                <td className="w-[30%] whitespace-nowrap align-top"><b>{certificateNo}</b></td>
                <td colSpan={3} className="w-[30%] align-top text-left"></td>
                <td className="w-[35%] align-right"></td>
            </tr>
            <tr>
              <td colSpan={6}>
                <table className="w-full" style={{fontSize: '10pt'}} cellSpacing="0" cellPadding="0">
                  <tbody>
                    <tr>
                      <td className="w-[10%] align-top">&nbsp;</td>
                      <td className="w-[32%] align-top">&nbsp;</td>
                      <td className="w-[33%] align-top">&nbsp;</td>
                      <td className="w-[25%] align-top" rowSpan={6}>
                        {data.applicantPhoto ? (
                            <Image src={data.applicantPhoto} alt="Applicant's photo" width={96} height={96} style={{width: '96px', height: '96px'}} className="border"/>
                        ) : (
                            applicantPhotoPlaceholder && <Image src={applicantPhotoPlaceholder.imageUrl} alt={applicantPhotoPlaceholder.description} width={96} height={96} style={{width: '96px', height: '96px'}} className="border" data-ai-hint={applicantPhotoPlaceholder.imageHint} />
                        )}
                      </td>
                    </tr>
                    <tr>
                        <td className="w-[10%] align-top">&nbsp;</td>
                        <td className="h-5 align-middle whitespace-nowrap">प्रमाणित किया जाता है कि</td>
                        <td className="h-5 align-middle" style={{fontSize: '10pt'}}><b>{data.applicantNameHindi}/{data.applicantNameEnglish}</b></td>
                    </tr>
                    <tr>
                        <td className="w-[10%] align-top">&nbsp;</td>
                        <td className="h-5 align-middle whitespace-nowrap" style={{fontSize: '10pt'}}>{data.relationType}</td>
                        <td className="h-5 align-middle" style={{fontSize: '10pt'}}><b>{data.relationName}</b></td>
                    </tr>
                     <tr>
                        <td className="w-[10%] align-top">&nbsp;</td>
                        <td className="h-5 align-middle whitespace-nowrap" style={{fontSize: '10pt'}}>माता का नाम</td>
                        <td className="h-5 align-middle" style={{fontSize: '10pt'}}><b>{data.motherName}</b></td>
                    </tr>
                    <tr>
                        <td className="w-[10%] align-top">&nbsp;</td>
                        <td className="h-5 align-middle whitespace-nowrap" style={{fontSize: '10pt'}}>निवासी</td>
                        <td className="h-5 align-middle" style={{fontSize: '10pt'}}><b>{data.currentAddressHouseNo}, {data.currentAddressMohalla}</b></td>
                    </tr>
                    <tr>
                        <td className="w-[20%] align-top whitespace-nowrap">&nbsp;</td>
                        <td className="h-5 align-top whitespace-nowrap" style={{fontSize: '10pt'}}>ग्राम</td>
                        <td className="h-5 align-top" style={{fontSize: '10pt'}}><b>{data.currentAddressGram}</b>&nbsp;</td>
                    </tr>
                    <tr>
                        <td className="w-[10%] align-top whitespace-nowrap">&nbsp;</td>
                        <td className="h-5 align-top whitespace-nowrap" style={{fontSize: '10pt'}}>तहसील</td>
                        <td className="h-5 align-top" style={{fontSize: '10pt'}}><b>{data.currentAddressTehsil}</b></td>
                    </tr>
                    <tr>
                        <td className="w-[10%] align-top whitespace-nowrap">&nbsp;</td>
                        <td className="h-5 align-top whitespace-nowrap" style={{fontSize: '10pt'}}>जिला</td>
                        <td className="h-5 align-top" style={{fontSize: '10pt'}}><b>{data.currentAddressDistrict}</b></td>
                    </tr>
                     <tr>
                      <td className="w-[10%] align-top">&nbsp;</td>
                      <td className="w-[32%] align-top">&nbsp;</td>
                      <td className="w-[33%] align-top">&nbsp;</td>
                      <td className="w-[25%] align-top">&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan={6} className="py-4 text-justify" style={{fontSize: '10pt'}}>
                  उत्तर प्रदेश राज्य की <b><u>{data.caste}</u></b> जाति के व्यक्ति हैं। यह उत्तर प्रदेश लोक सेवा अनुसूचित जातियों,अनुसूचित जन जातियों तथा अन्य पिछड़े वर्गों के लिए आरक्षण अधिनियम १९९४ की अनुसूची एक के अन्तर्गत मान्यता प्राप्त है।
                  <br />
                  यह भी प्रमाणित किया जाता है कि <b>{data.applicantNameHindi}/{data.applicantNameEnglish}</b> पूर्वोक्त अधिनियम १९९४ (यथा संशोधित) की अनुसूची २ (जैसा कि उत्तर प्रदेश लोक सेवा)अनुसूचित जातियों, अनुसूचित जनजातियों और अन्य पिछड़े वर्गों के लिए आरक्षण (संशोधन) अधिनियम २००१ द्वारा प्रतिस्थापित किया गया है एंव जो उ०प्र० लोक सेवा अनुसूचित जातियों, अनुसूचित जनजातियों और अन्य पिछड़े वर्गों के लिए आरक्षण (संशोधन) अधिनियम २००२ एवं शासनादेश संख्या 22/16/92 टी० सी०-III , दिनाँक २० अक्टुबर २००८ द्वारा संशोधित की गई है, से आच्छादित नहीं है।इनके माता-पिता की निरन्तर तीन वर्षो की अवधि के लिये सकल वार्षिक आय आठ लाख रुपये या इससे अधिक नहीं है तथा इनके पास धन कर अधिनियम १९५७ मे तथा विहिप छूट सीमा से अधिक सम्पत्ति नहीं है |
              </td>
            </tr>
            <tr><td colSpan={6} className="h-4"></td></tr>
            <tr>
              <td colSpan={6}>
                 {qrCode && <Image src={qrCode.imageUrl} alt={qrCode.description} width={56} height={56} data-ai-hint={qrCode.imageHint}/>}
              </td>
            </tr>
             <tr>
              <td colSpan={6} className="text-center">
                <table className="w-full" style={{fontSize: '10pt'}} cellSpacing="0" cellPadding="0">
                  <tbody>
                    <tr>
                      <td className="w-[17%] h-20 align-bottom whitespace-nowrap">&nbsp;</td>
                      <td className="w-[23%] h-20 align-bottom whitespace-nowrap">&nbsp;</td>
                      <td className="w-[29%] h-20 align-bottom whitespace-nowrap" rowSpan={4}>
                         <table className="w-full" id="table1">
                           <tbody>
                              <tr>
                                <td className="w-1/2 text-right align-top" style={{fontSize: '20px', fontFamily: 'Arial'}}>{data.officerName}&nbsp;</td>
                                <td className="w-1/2 text-left align-top" style={{fontSize: '8px', fontFamily: 'Arial'}}>Digitally Signed by {data.officerName?.toUpperCase()} O=Personal, C=IN,CN={data.officerName?.toUpperCase()}, L=ALLAHABAD, S=UTTAR PRADESH&nbsp;</td>
                              </tr>
                            </tbody>
                         </table>
                      </td>
                      <td className="w-[15%] h-20 align-bottom text-center whitespace-nowrap" colSpan={2}></td>
                    </tr>
                     <tr>
                      <td className="align-left w-[17%] whitespace-nowrap">&nbsp;</td>
                      <td className="w-[23%]" style={{fontSize: '8px', fontFamily: 'Arial'}}><b></b></td>
                      <td className="text-center w-[15%] whitespace-nowrap" colSpan={2}><b>सक्षम अधिकारी/तहसीलदार</b></td>
                    </tr>
                    <tr>
                      <td className="align-left w-[17%] whitespace-nowrap">&nbsp;</td>
                      <td className="w-[23%]" style={{fontSize: '8px', fontFamily: 'Arial'}}><b></b></td>
                      <td className="text-center w-[15%] whitespace-nowrap" colSpan={2}><b>डिजिटल हस्ताक्षरित</b></td>
                    </tr>
                    <tr>
                      <td className="w-[17%] whitespace-nowrap">&nbsp;</td>
                      <td className="w-[23%] whitespace-nowrap">&nbsp;<b></b></td>
                      <td className="text-center w-[9%] whitespace-nowrap" colSpan={2}><b>{data.currentAddressTehsil},{data.currentAddressDistrict}</b></td>
                    </tr>
                    <tr>
                      <td className="w-[17%] whitespace-nowrap">&nbsp;</td>
                      <td className="w-[23%] whitespace-nowrap">&nbsp;</td>
                      <td className="w-[29%] whitespace-nowrap">&nbsp;</td>
                      <td className="w-[9%] whitespace-nowrap"><b>&nbsp;</b></td>
                      <td className="w-[19%] whitespace-nowrap"><b>दिनॉंक:</b>&nbsp;<b>{issueDate}</b></td>
                    </tr>
                    <tr><td colSpan={6}>&nbsp;</td></tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan={6} className="text-center text-xs pt-4 border-t border-dashed border-gray-400">
                <b>यह प्रमाण पत्र इलेक्ट्रॉनिक डिलिवरी सिस्टम द्वारा तैयार किया गया है तथा डिजिटल सिग्नेचर से हस्ताक्षरित है एवम् आवेदक द्वारा स्वयं की लॉग इन आइडी के माध्यम से डाउनलोड किया गया है। यह प्रमाण पत्र वेबसाइट https://edistrict.up.gov.in पर इसका  पहले आवेदन क्र० फिर प्रमाणपत्र क्र० अंकित कर,सत्यापित किया जा सकता है। </b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
