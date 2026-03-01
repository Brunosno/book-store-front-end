import api from "@/lib/api"

const BookService = {
    async findAll(): Promise<any>{
        const { data } = await api.get('/books');
        return data;
    }
}

export default BookService;