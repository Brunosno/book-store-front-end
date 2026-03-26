import api from "@/lib/api";
import { BookResponse } from "@/types/BookType";
import { ApiResponse } from "@/types/ApiType";

interface BookPayload {
    title: string;
    description: string;
    price: number;
    stock: number;
    author_id: number;
    available: boolean;
}

function normalizeBook(book: any): BookResponse {
    return {
        ...book,
        price: Number(book.price)
    };
}

const BookService = {

    async findAll(page = 1, perPage = 10): Promise<ApiResponse<BookResponse[]>> {
        const { data } = await api.get<ApiResponse<BookResponse[]>>('/books', {
            params: {
                page,
                per_page: perPage
            }
        });

        return data;
    },

    async findById(id: number): Promise<ApiResponse<BookResponse>> {
        const { data } = await api.get<ApiResponse<BookResponse>>(`/books/${id}`);
        
        return {
            ...data,
            data: normalizeBook(data.data)
        };

    },

    async create(payload: BookPayload): Promise<ApiResponse<BookResponse>> {
        const { data } = await api.post<ApiResponse<BookResponse>>('/books', {
            book: payload
        });

        return data;
    },

    async update(id: number, payload: Partial<BookPayload>): Promise<ApiResponse<BookResponse>> {
        const { data } = await api.put<ApiResponse<BookResponse>>(`/books/${id}`, {
            book: payload
        });

        return data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/books/${id}`);
    }
};

export default BookService;