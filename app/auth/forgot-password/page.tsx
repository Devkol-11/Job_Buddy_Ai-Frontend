'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authApi } from '@/lib/api';
import { Mail, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await authApi.forgotPassword({ email });

            if (response.success) {
                setIsSuccess(true);
            } else {
                setError(response.message || 'Failed to send reset email. Please try again.');
            }
        } catch {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <AuthLayout
                title="Check your email"
                description="We've sent you a password reset link"
            >
                <div className="text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="p-3 border border-[#d1d5db] rounded-full">
                            <CheckCircle className="h-8 w-8 text-black" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                            We sent a password reset link to
                        </p>
                        <p className="text-sm font-medium text-black">{email}</p>
                    </div>

                    <p className="text-sm text-gray-600">
                        Didn&apos;t receive the email?{' '}
                        <button
                            onClick={() => setIsSuccess(false)}
                            className="text-black font-medium hover:underline"
                        >
                            Click to resend
                        </button>
                    </p>

                    <Link
                        href="/auth/login"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to sign in
                    </Link>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Forgot password?"
            description="No worries, we'll send you reset instructions"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                    <div className="p-3 border border-red-300 bg-red-50 rounded-md">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-black font-medium">
                        Email
                    </Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError(null);
                            }}
                            required
                            className="pl-10 border-[#d1d5db] focus:border-black"
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white hover:bg-gray-800 border-0"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Sending...</span>
                        </>
                    ) : (
                        'Send reset link'
                    )}
                </Button>

                <Link
                    href="/auth/login"
                    className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-black"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to sign in
                </Link>
            </form>
        </AuthLayout>
    );
}
