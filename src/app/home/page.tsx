'use client'

import Header from '@/components/Header';
import style from './style.module.css';
import CardProduct from '@/components/CardProduct';
import { useEffect, useState } from 'react';
import BookService from '@/services/BookService';
import { BookResponse } from '@/types/BookType';
import { Search } from 'lucide-react';

export default function Home(){

    const [books, setBooks] = useState<BookResponse[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function loadBooks(){
            try{
                const { data } = await BookService.findAll();
                console.log(data)

                const active_books = data.filter((book: BookResponse) => book.available);
                setBooks(active_books);
            } catch(error){
                console.error(error);
            }
        }

        loadBooks();
    }, []);

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
    );

    return(
        <>
            <Header/>
            <div className={style.container}>

                <h1>Catálogo de Livros</h1>

                <div className={style.search_input}>
                    <Search className={style.search_icon} size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por título..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className={style.books_container}>
                    {filteredBooks.map((book) => (
                        <CardProduct
                            key={book.id}
                            product={book}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
