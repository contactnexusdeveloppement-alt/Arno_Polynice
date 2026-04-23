'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function PressEmpty() {
    const { t } = useLanguage();
    return <p>{t('press.empty')}</p>;
}
