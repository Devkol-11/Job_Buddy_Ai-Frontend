'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthLayout } from '@/components/auth/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authApi } from '@/lib/api';
import { Lock, Loader2, CheckCircle, Eye, EyeOff } from 'lucide-react';

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tokenFromUrl = searchParams.get('token') || '';

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        token: tokenFromUrl,
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (formData.newPassword.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await authApi.resetPassword({
                incomingToken: formData.token,
                newPassword: formData.newPassword,
            });

            if (response.success) {
                setIsSuccess(true);
                setTimeout(() => {
                    router.push('/auth/login');
                }, 3000);
            } else {
                setError(response.message || 'Failed to reset password. Please try again.');
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
                title="Password reset successful"
                description="Your password has been updated"
            >
                <div className="text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="p-3 border border-[#d1d5db] rounded-full">
                            <CheckCircle className="h-8 w-8 text-black" />
                        </div>
                    </div>

                    <p className="text-sm text-gray-600">
                        Your password has been successfully reset. You will be redirected to the login page shortly.
                    </p>

                    <Link
                        href="/auth/login"
                        className="inline-block w-full"
                    >
                        <Button className="w-full bg-black text-white hover:bg-gray-800 border-0">
                            Continue to sign in
                        </Button>
                    </Link>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Reset your password"
            description="Enter your new password below"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                    <div className="p-3 border border-red-300 bg-red-50 rounded-md">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {!tokenFromUrl && (
                    <div className="space-y-2">
                        <Label htmlFor="token" className="text-black font-medium">
                            Reset Token
                        </Label>
                        <Input
                            id="token"
                            name="token"
                            type="text"
                            placeholder="Enter your reset token"
                            value={formData.token}
                            onChange={handleChange}
                            required
                            className="border-[#d1d5db] focus:border-black"
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-black font-medium">
                        New Password
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                            minLength={8}
                            className="pl-10 pr-10 border-[#d1d5db] focus:border-black"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-black font-medium">
                        Confirm Password
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength={8}
                            className="pl-10 pr-10 border-[#d1d5db] focus:border-black"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                        >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
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
                            <span>Resetting...</span>
                        </>
                    ) : (
                        'Reset password'
                    )}
                </Button>

                <p className="text-center text-sm text-gray-600">
                    Remember your password?{' '}
                    <Link
                        href="/auth/login"
                        className="text-black font-medium hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <AuthLayout title="Loading..." description="">
                <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                </div>
            </AuthLayout>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}
