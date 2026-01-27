'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { castes, tehsils, villages } from '@/app/schema';
import { Card, CardContent } from './ui/card';

export function CertificatePreview() {
  const searchParams = useSearchParams();
  const upSeal = PlaceHolderImages.find((img) => img.id === 'up-seal');
  const applicantPhoto = PlaceHolderImages.find((img) => img.id === 'applicant-photo');
  const qrCode = PlaceHolderImages.find((img) => img.id === 'qr-code');

  const data = React.useMemo(() => {
    const values: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      values[key] = value;
    });
    return values;
  }, [searchParams]);

  const issueDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  
  const tehsilLabel = tehsils[data.currentAddressDistrict]?.find(t => t.value === data.currentAddressTehsil)?.label || '';
  const gramLabel = villages[data.currentAddressTehsil]?.find(v => v.value === data.currentAddressGram)?.label || '';
  const casteLabel = castes[data.category]?.find(c => c.value === data.caste)?.label || '';


  return (
    <div className="bg-background min-h-screen p-4 sm:p-8 flex flex-col items-center font-serif">
      <div className="w-full max-w-4xl space-y-4 no-print">
        <h1 className="text-3xl font-headline text-center">Certificate Preview</h1>
        <p className="text-center text-muted-foreground">This is a preview of your certificate. You can print it or download as PDF.</p>
        <div className="flex justify-center gap-4">
            <Button onClick={() => window.print()}>Print / Download PDF</Button>
            <Button variant="outline" onClick={() => window.history.back()}>Back to Form</Button>
        </div>
      </div>
      <Card className="w-full max-w-4xl mt-8 shadow-lg certificate-preview aspect-[210/297] p-8 border border-foreground">
        <CardContent className="p-0">
          <div className="text-black" style={{ fontFamily: "'Arial Unicode MS', 'Inter', sans-serif" }}>
            <div className="text-center">
              {upSeal && <Image src={upSeal.imageUrl} alt={upSeal.description} width={110} height={110} className="mx-auto" data-ai-hint={upSeal.imageHint}/>}
              <h1 className="text-4xl mt-4 font-bold" style={{fontFamily: "'Space Grotesk', sans-serif"}}>उत्तर प्रदेश शासन</h1>
              <p className="text-xl mt-4 font-semibold">उत्तर प्रदेश के पिछड़ी जाति के लिए जाति प्रमाण पत्र</p>
            </div>
            
            <div className="flex justify-between mt-8 text-sm">
                <div>
                    <p><b>जिला:</b> श्रावस्ती</p>
                    <p><b>तहसील:</b> {tehsilLabel}</p>
                </div>
                <div className="text-right">
                    <p><b>जारी दिनांक:</b> {issueDate}</p>
                </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
                 <div>
                    <p><b>आवेदन क्र०:</b> {Math.floor(1000000000000 + Math.random() * 9000000000000)}</p>
                    <p><b>प्रमाणपत्र क्र०:</b> {Math.floor(100000000000 + Math.random() * 900000000000)}</p>
                 </div>
            </div>

            <div className="mt-6 flex">
                <div className="flex-grow text-sm space-y-2">
                    <p>प्रमाणित किया जाता है कि <b>{data.applicantNameEnglish?.toUpperCase()}</b></p>
                    <p>{data.relationType} <b>{data.relationName}</b></p>
                    <p>माता का नाम <b>{data.motherName}</b></p>
                    <p>निवासी <b>{data.currentAddressHouseNo}, {data.currentAddressMohalla}</b></p>
                    {data.serviceType === 'RURAL' && <p>ग्राम <b>{gramLabel}</b></p>}
                    <p>तहसील <b>{tehsilLabel}</b></p>
                    <p>जिला <b>श्रावस्ती</b></p>
                </div>
                <div className="w-24 h-24 ml-4">
                     {applicantPhoto && <Image src={applicantPhoto.imageUrl} alt={applicantPhoto.description} width={96} height={96} className="border" data-ai-hint={applicantPhoto.imageHint} />}
                </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed">
                उत्तर प्रदेश राज्य की <b><u>{casteLabel}</u></b> जाति के व्यक्ति हैं। यह उत्तर प्रदेश लोक सेवा अनुसूचित जातियों,अनुसूचित जन जातियों तथा अन्य पिछड़े वर्गों के लिए आरक्षण अधिनियम १९९४ की अनुसूची एक के अन्तर्गत मान्यता प्राप्त है।
                <br />
                यह भी प्रमाणित किया जाता है कि <b>{data.applicantNameEnglish?.toUpperCase()}</b> पूर्वोक्त अधिनियम १९९४ (यथा संशोधित) की अनुसूची २ (जैसा कि उत्तर प्रदेश लोक सेवा)अनुसूचित जातियों, अनुसूचित जनजातियों और अन्य पिछड़े वर्गों के लिए आरक्षण (संशोधन) अधिनियम २००१ द्वारा प्रतिस्थापित किया गया है एंव जो उ०प्र० लोक सेवा अनुसूचित जातियों, अनुसूचित जनजातियों और अन्य पिछड़े वर्गों के लिए आरक्षण (संशोधन) अधिनियम २००२ एवं शासनादेश संख्या 22/16/92 टी० सी०-III , दिनाँक २० अक्टुबर २००८ द्वारा संशोधित की गई है, से आच्छादित नहीं है।इनके माता-पिता की निरन्तर तीन वर्षो की अवधि के लिये सकल वार्षिक आय आठ लाख रुपये या इससे अधिक नहीं है तथा इनके पास धन कर अधिनियम १९५७ मे तथा विहिप छूट सीमा से अधिक सम्पत्ति नहीं है |
            </p>

            <div className="mt-8 flex justify-between items-end">
                <div className="w-1/3">
                    {qrCode && <Image src={qrCode.imageUrl} alt={qrCode.description} width={56} height={56} data-ai-hint={qrCode.imageHint}/>}
                </div>
                <div className="w-2/3 text-center text-sm">
                    <p className="font-bold text-lg" style={{fontFamily: "'Space Grotesk', sans-serif"}}>ANAND SINGH</p>
                    <p><b>सक्षम अधिकारी/तहसीलदार</b></p>
                    <p>डिजिटल हस्ताक्षरित</p>
                    <p>{tehsilLabel}, श्रावस्ती</p>
                    <p><b>दिनांक:</b> {issueDate}</p>
                </div>
            </div>

            <div className="text-center mt-8 pt-4 border-t border-dashed border-gray-400">
                <p className="text-xs">
                यह प्रमाण पत्र इलेक्ट्रॉनिक डिलिवरी सिस्टम द्वारा तैयार किया गया है तथा डिजिटल सिग्नेचर से हस्ताक्षरित है एवम् आवेदक द्वारा स्वयं की लॉग इन आइडी के माध्यम से डाउनलोड किया गया है। यह प्रमाण पत्र वेबसाइट https://edistrict.up.gov.in पर इसका पहले आवेदन क्र० फिर प्रमाणपत्र क्र० अंकित कर,सत्यापित किया जा सकता है।
                </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
