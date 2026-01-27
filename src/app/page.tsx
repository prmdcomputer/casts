import { CertificateForm } from '@/components/certificate-form';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <CertificateForm />
    </main>
  );
}
