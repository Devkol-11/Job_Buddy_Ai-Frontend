'use client';

import { Button } from '@/components/ui/button';
import { LogOut, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { authApi } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

interface LogoutButtonProps {
    variant?: 'default' | 'outline' | 'ghost';
    showIcon?: boolean;
    className?: string;
}

export function LogoutButton({
    variant = 'outline',
    showIcon = true,
    className = ''
}: LogoutButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            const response = await authApi.logout();
            if (response.success) {
                logout();
                router.push('/auth/login');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant={variant}
            onClick={handleLogout}
            disabled={isLoading}
            className={`border-[#d1d5db] ${className}`}
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <>
                    {showIcon && <LogOut className="h-4 w-4" />}
                    <span>Logout</span>
                </>
            )}
        </Button>
    );
}
