'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  certificateSchema,
  type CertificateFormValues,
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
  FormDescription,
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

export function CertificateForm() {
  const router = useRouter();

  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      serviceType: 'RURAL',
      applicantNameHindi: '',
      applicantNameEnglish: '',
      applicantPhoto: '',
      relationType: 'पिता',
      relationName: '',
      motherName: '',
      currentAddressHouseNo: '',
      currentAddressMohalla: '',
      currentAddressDistrict: '',
      currentAddressTehsil: '',
      currentAddressGram: '',
      category: '',
      caste: '',
      issueDate: '',
      officerName: '',
      applicationNumber: '',
      certificateNumber: '',
    },
  });

  const { watch, setValue } = form;
  const issueDate = watch('issueDate');

  React.useEffect(() => {
    if (issueDate) {
      const date = new Date(issueDate);
      if (date && !isNaN(date.getTime())) {
        const year = date.getFullYear();

        const random13 = Math.floor(1e12 + Math.random() * 9e12).toString();
        setValue('applicationNumber', `${year}${random13}`);

        const random11 = Math.floor(1e10 + Math.random() * 9e10).toString();
        setValue('certificateNumber', `5${random11}`);
      }
    }
  }, [issueDate, setValue]);


  function onSubmit(data: CertificateFormValues) {
    sessionStorage.setItem('certificateData', JSON.stringify(data));
    router.push('/preview');
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
                    <FormLabel>प्रार्थी का नाम (हिंदी में) / Applicant's Name (in Hindi) <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="applicantNameEnglish"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>प्रार्थी का नाम (अंग्रेजी में) / Applicant's Name (in English) <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="applicantPhoto"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Photo</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              form.setValue('applicantPhoto', reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }} 
                      />
                    </FormControl>
                    <FormDescription>
                      Upload a passport size photo. (.jpg, .jpeg, .png)
                    </FormDescription>
                    <FormMessage />
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
                  <FormItem><FormLabel>जनपद (हिंदी में) <span className="text-red-500">*</span></FormLabel><FormControl><Input placeholder="जनपद" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="currentAddressTehsil" render={({ field }) => (
                  <FormItem><FormLabel>तहसील (हिंदी में) <span className="text-red-500">*</span></FormLabel><FormControl><Input placeholder="तहसील" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="currentAddressGram" render={({ field }) => (
                    <FormItem><FormLabel>ग्राम (हिंदी में) <span className="text-red-500">*</span></FormLabel><FormControl><Input placeholder="ग्राम" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
              <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem><FormLabel>श्रेणी / Category <span className="text-red-500">*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="--श्रेणी चुनें--" /></SelectTrigger></FormControl>
                  <SelectContent>
                      <SelectItem value="पिछड़ी">पिछड़ी</SelectItem>
                      <SelectItem value="अनुसूचित जाति">अनुसूचित जाति</SelectItem>
                      <SelectItem value="अनुसूचित जनजाति">अनुसूचित जनजाति</SelectItem>
                      <SelectItem value="विमुक्त">विमुक्त</SelectItem>
                  </SelectContent></Select><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="caste" render={({ field }) => (
                  <FormItem><FormLabel>जाति (हिंदी में) / Caste (in Hindi) <span className="text-red-500">*</span></FormLabel>
                  <FormControl><Input placeholder="जाति" {...field} /></FormControl>
                  <FormMessage /></FormItem>
              )}/>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                <FormField control={form.control} name="issueDate" render={({ field }) => (
                  <FormItem><FormLabel>जारी दिनांक / Issue Date <span className="text-red-500">*</span></FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="officerName" render={({ field }) => (
                  <FormItem><FormLabel>सक्षम अधिकारी का नाम / Officer's Name <span className="text-red-500">*</span></FormLabel><FormControl><Input placeholder="Officer's Name" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                <FormField control={form.control} name="applicationNumber" render={({ field }) => (
                  <FormItem><FormLabel>आवेदन क्रमांक / Application Number <span className="text-red-500">*</span></FormLabel><FormControl><Input placeholder="आवेदन क्रमांक" {...field} readOnly /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="certificateNumber" render={({ field }) => (
                  <FormItem><FormLabel>प्रमाण पत्र क्रमांक / Certificate Number <span className="text-red-500">*</span></FormLabel><FormControl><Input placeholder="प्रमाण पत्र क्रमांक" {...field} readOnly /></FormControl><FormMessage /></FormItem>
                )}/>
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
