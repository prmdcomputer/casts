'use client';
import { CertificatePreview } from '@/components/certificate-preview';
import { Suspense } from 'react';

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-xl font-semibold">Loading Preview...</div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CertificatePreview />
    </Suspense>
  );
}
