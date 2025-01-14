import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

export default function FlashMessage() {
    const page = usePage();
    
    useEffect(() => {
        const flash = page?.props?.flash;
        
        if (!flash) return;

        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.error(flash.error);
        }
    }, [page.props.flash]);

    return null;
} 