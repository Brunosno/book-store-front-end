'use client';

import AuthCard from "@/components/auth/AuthCard";
import style from './style.module.css'

export default function RegisterPage(){
    return(
        <div className={style.container}>
            <AuthCard/>
        </div>
    );
}