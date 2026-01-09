'use client';

import AuthCard from '@/components/auth/AuthCard';
import style from './style.module.css';

export default function LoginPage(){

    return (
        <div className={style.container}>
            <AuthCard />
        </div>
    );
}