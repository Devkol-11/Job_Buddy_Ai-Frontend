import { ReactNode } from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    description?: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
            <div className="w-full max-w-md">
                <div className="border border-[#d1d5db] rounded-lg bg-white p-8">
                    <div className="mb-8 text-center">
                        <Link href="/" className="inline-block mb-6">
                            <span className="text-2xl font-bold text-black">JobFeed</span>
                        </Link>
                        <h1 className="text-2xl font-semibold text-black mb-2">{title}</h1>
                        {description && (
                            <p className="text-sm text-gray-600">{description}</p>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
