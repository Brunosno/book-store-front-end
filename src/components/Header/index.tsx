'use client'

import Image from 'next/image';
import style from './style.module.css';
import { BookOpen, LogOut, ShoppingCart, User} from "lucide-react";
import Link from 'next/link';
import CartService from '@/services/CartService';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function Header(){
    const { user, logout: logoutContext } = useAuth();
    const { totalItems } = useCart();
    const router = useRouter();

    const logout = () => {
        logoutContext()
        router.push('/auth/login')
    }

    return(
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.logo_title}>
                    <div className={style.logo_box}>
                        <BookOpen color="#FFF" size={32}/>
                    </div>
                    <h3>Book Store</h3>
                </div>

                <Link href='/home' className={style.menu_link}>Catálogo</Link>

                <div className={style.user_info}>
                    <span>{user ? user.username : <User />}</span>

                    <span onClick={() => router.push('/cart')}><ShoppingCart /> <small>{totalItems}</small></span>

                    <span onClick={logout}><LogOut /></span>
                </div>
            </div>
        </div>
    );
}