'use client';

import * as React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import QRCode from 'react-qr-code';
import { Button } from './ui/button';
import { Printer } from 'lucide-react';

export function CertificatePreview() {
  const [data, setData] = React.useState<Record<string, string> | null>(null);
  const upSeal = PlaceHolderImages.find((img) => img.id === 'up-seal');
  const applicantPhotoPlaceholder = PlaceHolderImages.find((img) => img.id === 'applicant-photo');
  const watermark = PlaceHolderImages.find((img) => img.id === 'gov-monogram');

  React.useEffect(() => {
    const storedData = sessionStorage.getItem('certificateData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading Preview...</div>
      </div>
    );
  }

  const verificationUrl = (data.applicationNumber && data.certificateNumber)
    ? `https://esathi.up.gov.in/citizenservices/ServiceEdist/Certificate/Caste/Forms/printCert.aspx?ApplicationNo=${data.applicationNumber}&CertificateID=${data.certificateNumber}`
    : '';


  const issueDate = data.issueDate ? new Date(data.issueDate).toLocaleDateString('en-GB') : '09/10/2025';

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-end mb-4 no-print">
        <Button onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
      </div>
      <div className="w-full max-w-4xl bg-white text-black shadow-lg relative certificate-preview" style={{width: '21cm', padding: '1rem' }}>
        
        {watermark && <Image 
            src={watermark.imageUrl} 
            alt={watermark.description}
            width={400}
            height={400}
            style={{position: 'absolute', top: '50%', right: '50%', transform: 'translate(-50%, -50%)', opacity: 0.7, pointerEvents: 'none'}} 
            data-ai-hint={watermark.imageHint}
        />}

        <table className="mgn" style={{padding: '1px', margin: '1px'}} border={0} align="center" width="100%" cellSpacing="0" cellPadding="0" style={{border: '1px solid #000000', paddingLeft: '4px', paddingRight: '4px', paddingTop: '1px', paddingBottom: '1px', fontSize: '10pt', fontFamily: 'Arial Unicode MS', position: 'relative'}}>
            <tbody>
                <tr>
                    <td colSpan={6}>
                        <p align="center" style={{padding: '1px', margin: '1px'}}>
                            {upSeal && <Image src={upSeal.imageUrl} alt={upSeal.description} width={110} height={110} data-ai-hint={upSeal.imageHint} />}
                        </p>
                    </td>
                </tr>
                <tr><td colSpan={6}><p align="center"><font size="7">उत्तर प्रदॆश शासन</font></p></td></tr>
                <tr><td colSpan={6}><p align="center"><b><font size="4">उत्तर प्रदेश के {data.category || 'पिछड़ी'} जाति के लिए जाति प्रमाण पत्र</font></b></p></td></tr>
                <tr>
                    <td width="17%" style={{whiteSpace: 'nowrap'}}><b>जिला </b></td>
                    <td style={{whiteSpace: 'nowrap'}}><b>{data.currentAddressDistrict}</b></td>
                    <td width="30%" colSpan={3} align="right">&nbsp;</td>
                    <td align="left" width="35%">&nbsp;</td>
                </tr>
                <tr>
                    <td width="17%" style={{whiteSpace: 'nowrap'}}><b>तहसील </b></td>
                    <td style={{whiteSpace: 'nowrap'}}><b>{data.currentAddressTehsil}</b></td>
                    <td width="30%" colSpan={3} align="right">&nbsp;</td>
                    <td align="left" width="35%" style={{whiteSpace: 'nowrap'}}><b>जारी दिनांक: {issueDate}</b></td>
                </tr>
                <tr>
                    <td width="17%" valign="top" style={{whiteSpace: 'nowrap'}}><b>आवेदन क्र०</b></td>
                    <td width="30%" style={{whiteSpace: 'nowrap'}} valign="top"><b>{data.applicationNumber}</b></td>
                    <td width="30%" colSpan={3} valign="top" align="left">&nbsp;</td>
                    <td width="35%" align="right">&nbsp;</td>
                </tr>
                <tr>
                    <td width="17%" style={{whiteSpace: 'nowrap'}} valign="top"><b>प्रमाणपत्र क्र०</b></td>
                    <td width="30%" style={{whiteSpace: 'nowrap'}} valign="top"><b>{data.certificateNumber}</b></td>
                    <td width="30%" colSpan={3} valign="top" align="left">&nbsp;</td>
                    <td width="35%" align="right">&nbsp;</td>
                </tr>
                <tr>
                    <td colSpan={6}>
                        <table border={0} style={{fontSize: '10pt'}} width="100%" cellSpacing="0" cellPadding="0">
                            <tbody>
                                <tr>
                                    <td width="10%" align="left" valign="top">&nbsp;</td>
                                    <td width="32%" align="left" valign="top">&nbsp;</td>
                                    <td width="33%" align="left" valign="top">&nbsp;</td>
                                    <td width="25%" rowSpan={6} align="left" valign="top">
                                        {data.applicantPhoto ? (
                                            <Image src={data.applicantPhoto} alt="Applicant's photo" width={96} height={96} style={{width: '96px', height: '96px'}} />
                                        ) : (
                                            applicantPhotoPlaceholder && <Image src={applicantPhotoPlaceholder.imageUrl} alt={applicantPhotoPlaceholder.description} width={96} height={96} style={{width: '96px', height: '96px'}} data-ai-hint={applicantPhotoPlaceholder.imageHint} />
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="10%" align="left" valign="top">&nbsp;</td>
                                    <td width="32%" height="20" align="left" style={{whiteSpace: 'nowrap'}} valign="middle">प्रमाणित किया जाता है कि</td>
                                    <td width="33%" height="20" align="left" valign="middle"><font size="2pt"><b>  {data.applicantNameHindi}/{data.applicantNameEnglish}</b></font></td>
                                </tr>
                                <tr>
                                    <td width="10%" align="left" valign="top">&nbsp;</td>
                                    <td width="32%" height="20" align="left" style={{whiteSpace: 'nowrap'}} valign="middle"><font size="2pt">{data.relationType} </font></td>
                                    <td width="33%" height="20" align="left" valign="middle"><font size="2pt"><b>  {data.relationName}</b></font></td>
                                </tr>
                                <tr>
                                    <td width="10%" align="left" valign="top">&nbsp;</td>
                                    <td width="32%" height="20" align="left" style={{whiteSpace: 'nowrap'}} valign="middle"><font size="2pt">माता का नाम</font></td>
                                    <td width="33%" height="20" align="left" valign="middle"><font size="2pt"><b>{data.motherName}</b></font></td>
                                </tr>
                                <tr>
                                    <td width="10%" align="left" style={{whiteSpace: 'nowrap'}} valign="top">&nbsp;</td>
                                    <td width="32%" height="20" align="left" style={{whiteSpace: 'nowrap'}} valign="middle"><font size="2pt">निवासी</font></td>
                                    <td width="33%" height="20" align="left" valign="middle"><font size="2pt"><b>{data.currentAddressHouseNo},{data.currentAddressMohalla}&nbsp;</b></font></td>
                                </tr>
                                <tr>
                                    <td width="20%" align="left" style={{whiteSpace: 'nowrap'}} valign="top">&nbsp;</td>
                                    <td width="32%" height="20" align="left" style={{whiteSpace: 'nowrap'}} valign="top"><font size="2pt">ग्राम</font></td>
                                    <td width="33%" height="20" align="left" valign="top"><font size="2pt"><b>{data.currentAddressGram}</b>&nbsp;</font></td>
                                </tr>
                                <tr>
                                    <td width="10%" align="left" style={{whiteSpace: 'nowrap'}} valign="top">&nbsp;</td>
                                    <td width="32%" height="20" align="left" style={{whiteSpace: 'nowrap'}} valign="top"><font size="2pt">तहसील</font></td>
                                    <td width="33%" height="20" align="left" valign="top"><font size="2pt"><b>{data.currentAddressTehsil}</b></font></td>
                                </tr>
                                <tr>
                                    <td width="10%" align="left" style={{whiteSpace: 'nowrap'}} valign="top">&nbsp;</td>
                                    <td width="32%" height="20" align="left" style={{whiteSpace: 'nowrap'}} valign="top"><font size="2pt">जिला</font></td>
                                    <td width="33%" height="20" align="left" valign="top"><font size="2pt"><b>{data.currentAddressDistrict}</b></font></td>
                                </tr>
                            </tbody>
                        </table>&nbsp;
                    </td>
                </tr>
                 <tr><td colSpan={6}><font size="2pt">उत्तर प्रदेश राज्य की  <b><u>{data.caste}</u></b> जाति के व्यक्ति हैं। यह उत्तर प्रदेश लोक सेवा अनुसूचित जातियों,अनुसूचित जन जातियों तथा अन्य पिछड़े वर्गों के लिए आरक्षण अधिनियम १९९४ की अनुसूची एक के अन्तर्गत मान्यता प्राप्त है।<br/> यह भी प्रमाणित किया जाता है कि <b>  {data.applicantNameHindi}/{data.applicantNameEnglish}</b> पूर्वोक्त अधिनियम १९९४ (यथा संशोधित) की अनुसूची २ (जैसा कि उत्तर प्रदेश लोक सेवा)अनुसूचित जातियों, अनुसूचित जनजातियों और अन्य पिछड़े वर्गों के लिए आरक्षण (संशोधन) अधिनियम २००१ द्वारा प्रतिस्थापित किया गया है एंव जो उ०प्र० लोक सेवा अनुसूचित जातियों, अनुसूचित जनजातियों और अन्य पिछड़े वर्गों के लिए आरक्षण (संशोधन) अधिनियम २००२ एवं शासनादेश संख्या 22/16/92 टी० सी०-III , दिनाँक २० अक्टुबर २००८ द्वारा संशोधित की गई है, से आच्छादित नहीं है।इनके माता-पिता की निरन्तर तीन वर्षो की अवधि के लिये सकल वार्षिक आय आठ लाख रुपये  या इससे अधिक नहीं है तथा इनके पास धन कर अधिनियम १९५७ मे तथा विहिप छूट सीमा से अधिक सम्पत्ति नहीं है |</font></td></tr>
                 <tr>
                    <td>
                        <div style={{ margin: '1rem 0' }}>
                        {verificationUrl && (
                          <div style={{ height: "auto", margin: "0 auto", maxWidth: 100, width: "100%" }}>
                            <QRCode
                              size={256}
                              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                              value={verificationUrl}
                              viewBox={`0 0 256 256`}
                            />
                          </div>
                        )}
                        </div>
                    </td>
                </tr>
                 <tr>
                    <td align="right" colSpan={6}>
                        <table border={0} style={{fontSize: '10pt'}} cellSpacing="0" cellPadding="0">
                            <tbody>
                                <tr>
                                    <td valign="top" align="right" style={{fontSize: '20px', fontFamily: 'Arial', paddingRight: '5px'}}>
                                        {data.officerName?.split(' ').map((part, index, arr) => (
                                            <React.Fragment key={index}>
                                                {part}
                                                {index < arr.length - 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                        &nbsp;
                                    </td>
                                    <td valign="top" align="left" style={{fontSize: '8px', fontFamily: 'Arial', paddingTop: '4px'}}>
                                        Digitally Signed by {data.officerName?.toUpperCase()} O=Personal,
                                        <br />
                                        C=IN,CN={data.officerName?.toUpperCase()}, L=ALLAHABAD, S=UTTAR PRADESH&nbsp;
                                    </td>
                                    <td valign="bottom" align="center" style={{paddingRight: '2rem'}}>
                                        <b>सक्षम अधिकारी/तहसीलदार</b><br/>
                                        <b>डिजिटल हस्ताक्षरित</b><br/>
                                        <b>{data.currentAddressTehsil},{data.currentAddressDistrict}</b><br/>
                                        <b>दिनॉंक:</b>&nbsp;<b>{issueDate}</b>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" colSpan={6}><font size="1pt"> <b>यह प्रमाण पत्र इलेक्ट्रॉनिक डिलिवरी सिस्टम द्वारा तैयार किया गया है तथा डिजिटल सिग्नेचर से हस्ताक्षरित है एवम् आवेदक द्वारा स्वयं की लॉग इन आइडी के माध्यम से डाउनलोड किया गया है। यह प्रमाण पत्र वेबसाइट https://edistrict.up.gov.in पर इसका  पहले आवेदन क्र० फिर प्रमाणपत्र क्र० अंकित कर,सत्यापित किया जा सकता है। </b></font></td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
}
