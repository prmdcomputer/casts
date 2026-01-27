'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  certificateSchema,
  type CertificateFormValues,
  tehsils,
  villages,
  castes,
  attachmentTitles
} from '@/app/schema';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { FileUp, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

type Attachment = {
  title: string;
  file: File;
};

export function CertificateForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [attachments, setAttachments] = React.useState<Attachment[]>([]);
  const [currentAttachment, setCurrentAttachment] = React.useState<{title: string, file: File | null}>({ title: '', file: null });

  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      serviceType: 'RURAL',
      applicantNameHindi: 'देवी दयाल गुप्ता',
      applicantNameEnglish: 'Devi Dayal Gupta',
      relationType: 'पिता',
      relationName: '',
      motherName: '',
      currentAddressHouseNo: '',
      currentAddressMohalla: '',
      currentAddressDistrict: '051',
      currentAddressTehsil: '',
      currentAddressGram: '',
      mobileNo: '',
      isPermanentAddressSame: false,
      permanentAddress: '',
      category: '',
      caste: '',
      reason: '',
      hasPreviousCertificate: '0',
      familyId: '218041587369',
    },
  });

  const watchDistrict = form.watch('currentAddressDistrict');
  const watchTehsil = form.watch('currentAddressTehsil');
  const watchCategory = form.watch('category');
  const watchServiceType = form.watch('serviceType');
  const watchIsSameAddress = form.watch('isPermanentAddressSame');
  const watchAadhaarPhoto = form.watch('applicantPhoto');

  React.useEffect(() => {
    if (watchIsSameAddress) {
      const { currentAddressHouseNo, currentAddressMohalla, currentAddressDistrict, currentAddressTehsil, currentAddressGram } = form.getValues();
      const districtLabel = "श्रावस्ती";
      const tehsilLabel = tehsils[currentAddressDistrict]?.find(t => t.value === currentAddressTehsil)?.label || '';
      const gramLabel = villages[currentAddressTehsil]?.find(v => v.value === currentAddressGram)?.label || '';
      const fullAddress = [
        currentAddressHouseNo,
        currentAddressMohalla,
        gramLabel,
        tehsilLabel,
        districtLabel
      ].filter(Boolean).join(', ');
      form.setValue('permanentAddress', fullAddress);
    } else {
      form.setValue('permanentAddress', '');
    }
  }, [watchIsSameAddress, form]);


  const handleAddAttachment = () => {
    if (currentAttachment.title && currentAttachment.file) {
      if (attachments.find(a => a.title === currentAttachment.title)) {
        toast({
          variant: "destructive",
          title: "Error",
          description: `"${currentAttachment.title}" is already attached.`,
        });
        return;
      }
      setAttachments([...attachments, { title: currentAttachment.title, file: currentAttachment.file }]);
      setCurrentAttachment({ title: '', file: null });
      const fileInput = document.getElementById('attachment-file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      form.setValue('attachmentTitle', '');
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an attachment title and a file.",
      });
    }
  };

  const removeAttachment = (title: string) => {
    setAttachments(attachments.filter(a => a.title !== title));
  }

  function onSubmit(data: CertificateFormValues) {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
    attachments.forEach((att, index) => {
      params.append(`attachment_${index}_title`, att.title);
      params.append(`attachment_${index}_name`, att.file.name);
    });

    router.push(`/preview?${params.toString()}`);
  }

  return (
    <Card className="w-full max-w-4xl shadow-2xl">
      <CardHeader className="text-center bg-gray-100 dark:bg-gray-800 rounded-t-lg" style={{ background: 'linear-gradient(180deg,white 1%,lightgrey 40%)' }}>
        <CardTitle className="font-headline text-2xl md:text-3xl text-black">जाति प्रमाण-पत्र हेतु आवेदन-पत्र</CardTitle>
        <CardDescription className="text-black">Application for Caste Certificate</CardDescription>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem className="space-y-3 md:col-span-2">
                    <FormLabel>सेवा का प्रकार / Service Type <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="RURAL" />
                          </FormControl>
                          <FormLabel className="font-normal">ग्रामीण / Rural</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="applicantNameHindi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>प्रार्थी का नाम (हिंदी में) / Applicant's Name (in Hindi)</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="applicantNameEnglish"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>प्रार्थी का नाम (अंग्रेजी में) / Applicant's Name (in English)</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="relationType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>पिता/पति/संरक्षक / Father/Husband/Guardian <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center"
                      >
                        {["पिता", "पति", "संरक्षक"].map((type) => (
                          <FormItem key={type} className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={type} />
                            </FormControl>
                            <FormLabel className="font-normal">{type}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="relationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>नाम / Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="पिता/पति/संरक्षक का नाम" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="motherName"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>माता का नाम / Mother's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="माता का नाम" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4 border-t pt-6">
              <h3 className="font-headline text-lg">वर्तमान पता / Current Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField control={form.control} name="currentAddressHouseNo" render={({ field }) => (
                  <FormItem><FormLabel>मकान नम्बर</FormLabel><FormControl><Input placeholder="House No." {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="currentAddressMohalla" render={({ field }) => (
                  <FormItem><FormLabel>मौहल्ला/पोस्ट</FormLabel><FormControl><Input placeholder="Mohalla/Post" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="currentAddressDistrict" render={({ field }) => (
                  <FormItem><FormLabel>जनपद <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="--जनपद चुनें--" /></SelectTrigger></FormControl>
                    <SelectContent><SelectItem value="051">श्रावस्ती</SelectItem></SelectContent></Select><FormMessage />
                  </FormItem>
                )}/>
                <FormField control={form.control} name="currentAddressTehsil" render={({ field }) => (
                  <FormItem><FormLabel>तहसील <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="--तहसील चुनें--" /></SelectTrigger></FormControl>
                    <SelectContent>{tehsils[watchDistrict]?.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent></Select><FormMessage />
                  </FormItem>
                )}/>
                {watchServiceType === 'RURAL' && (
                  <FormField control={form.control} name="currentAddressGram" render={({ field }) => (
                    <FormItem><FormLabel>ग्राम <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="--ग्राम चुनें--" /></SelectTrigger></FormControl>
                      <SelectContent>{villages[watchTehsil]?.map(v => <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>)}</SelectContent></Select><FormMessage />
                    </FormItem>
                  )}/>
                )}
                <FormField control={form.control} name="mobileNo" render={({ field }) => (
                  <FormItem><FormLabel>मोबाईल नम्बर <span className="text-red-500">*</span></FormLabel><FormControl><Input type="tel" placeholder="Mobile No." {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </div>
            </div>

            <div className="space-y-4 border-t pt-6">
                <FormField
                    control={form.control}
                    name="isPermanentAddressSame"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>स्थाई पता उपरोक्त है / Permanent address is same as above</FormLabel>
                        </div>
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="permanentAddress"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>स्थाई पता / Permanent Address <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <Textarea placeholder="स्थाई पता" {...field} disabled={watchIsSameAddress} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
              <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem><FormLabel>श्रेणी / Category <span className="text-red-500">*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="--श्रेणी चुनें--" /></SelectTrigger></FormControl>
                  <SelectContent>
                      <SelectItem value="1">पिछड़ी</SelectItem>
                      <SelectItem value="2">अनुसूचित जाति</SelectItem>
                      <SelectItem value="3">अनुसूचित जनजाति</SelectItem>
                      <SelectItem value="5">विमुक्त</SelectItem>
                  </SelectContent></Select><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="caste" render={({ field }) => (
                  <FormItem><FormLabel>जाति / Caste <span className="text-red-500">*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="--जाति चुनें--" /></SelectTrigger></FormControl>
                  <SelectContent>{castes[watchCategory]?.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="reason" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel>प्रमाण पत्र बनवाने का कारण / Reason for Certificate <span className="text-red-500">*</span></FormLabel><FormControl><Input placeholder="कारण" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
               <FormField control={form.control} name="hasPreviousCertificate" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel>क्या इससे पूर्व स्वयं / परिवार के सदस्य का प्रमाण पत्र जारी हुआ है ?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                  <SelectContent><SelectItem value="0">नहीं</SelectItem><SelectItem value="1">हां</SelectItem></SelectContent></Select><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="familyId" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel>फैमिली आई.डी. / Family ID</FormLabel><FormControl><Input {...field} disabled /></FormControl><FormMessage /></FormItem>
              )}/>
            </div>

            <div className="space-y-4 border-t pt-6">
                <h3 className="font-headline text-lg">संलग्नक / Attachments</h3>
                <p className="text-sm text-muted-foreground">अनिवार्य संलग्नक: फोटो, स्वप्रमाणित घोषणा पत्र. फ़ाइल प्रकार: .jpg, .jpeg, .png. अधिकतम आकार: फोटो 50KB, अन्य 100KB.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <FormField control={form.control} name="attachmentTitle" render={({ field }) => (
                      <FormItem><FormLabel>संलग्नक शीर्षक</FormLabel>
                      <Select onValueChange={(value) => { field.onChange(value); setCurrentAttachment(prev => ({ ...prev, title: value })); }} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="--चुने--" /></SelectTrigger></FormControl>
                      <SelectContent>{attachmentTitles.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                  )}/>
                  <div>
                    <Input id="attachment-file-input" type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setCurrentAttachment(prev => ({...prev, file: e.target.files?.[0] || null}))} />
                  </div>
                </div>
                 <div className="flex justify-end">
                    <Button type="button" onClick={handleAddAttachment}><FileUp className="mr-2 h-4 w-4" />अपलोड / Upload</Button>
                </div>

                {attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-medium">अपलोड किए गए दस्तावेज़:</h4>
                    <ul className="list-disc list-inside bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      {attachments.map((att, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <span>{att.title} ({att.file.name})</span>
                          <Button variant="ghost" size="icon" onClick={() => removeAttachment(att.title)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            <CardFooter className="flex justify-center p-0 pt-6">
              <Button type="submit" size="lg">दर्ज करें / Submit</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
