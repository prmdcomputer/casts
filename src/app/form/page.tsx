import { CertificateForm } from '@/components/certificate-form';
import { LogoutButton } from '@/components/logout-button';

export default function FormPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="absolute top-4 right-4">
          <LogoutButton />
      </div>
      <CertificateForm />
    </main>
  );
}
