import { forwardRef } from 'preact/compat';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';
import { IconLoading } from './Icons';
import { getExportHost } from '../host';
import type { FC } from '../type';
export interface MenuItemProps { text: string; icon?: FC; successText?: string; disabled?: boolean; title?: string; className?: string; onClick?: (event?: any) => boolean | void | Promise<boolean>; }
export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(({ text, successText, disabled = false, title, icon: Icon, onClick, className = '', ...rest }, ref) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [succeed, setSucceed] = useState(false);
    const pending = useRef(false);
    const alive = useRef(true);
    const timer = useRef<ReturnType<typeof setTimeout>>();
    useEffect(() => () => { alive.current = false; clearTimeout(timer.current); }, []);
    const handleClick = async (event: MouseEvent) => {
        if (disabled || pending.current || !onClick) return;
        pending.current = true; setLoading(true);
        try {
            const result = await onClick(event);
            if (alive.current && result && successText) { setSucceed(true); timer.current = setTimeout(() => setSucceed(false), 2500); }
        } catch (error) { getExportHost()?.notify(`${t('Export failed')}: ${error.message}`); }
        finally { pending.current = false; if (alive.current) setLoading(false); }
    };
    return <button {...rest} ref={ref} type="button" className={`menu-item ${className}`} onClick={handleClick} disabled={disabled || loading} aria-busy={loading} title={title}>
        <span className="menu-item-icon">{loading ? <IconLoading /> : Icon ? <Icon /> : null}</span>
        <span className="menu-item-label">{succeed && successText ? successText : text}</span>
    </button>;
});
