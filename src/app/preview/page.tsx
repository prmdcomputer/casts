'use client';
import { CertificatePreview } from '@/components/certificate-preview';

export default function PreviewPage() {
  return (
    <main className="bg-gray-100 min-h-screen py-8 flex justify-center">
      <CertificatePreview />
    </main>
  );
}
