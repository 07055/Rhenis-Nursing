'use client';

import { useEffect, useState } from 'react';
import PageWrapper from '@/app/(web)/wrapper'
import type { PageContent } from '@/lib/types/PageContent';
import { apiFetch } from '@/lib/api/api/api';

export default function ContactPage() {
  const [data, setData] = useState<PageContent | null>(null);

useEffect(() => {
  apiFetch<PageContent>('/NextContact') 
    .then(setData)
    .catch((err) => console.error('Error fetching contact content:', err));
}, []);

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
          {data?.title || 'Contact Us'}
        </h1>

        <div className="text-lg text-gray-700 leading-relaxed space-y-4">
          <p>
            {data?.content ||
              'We’re here to help. Whether you have a question about features, pricing, or anything else — our team is ready to answer all your questions.'}
          </p>

          <p>
            Reach out to us using the contact form on this page, or email us
            directly at{' '}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 underline"
            >
              support@example.com
            </a>
            .
          </p>

          <p>
            We typically respond within 24 hours. Looking forward to connecting
            with you!
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
