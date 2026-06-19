import api from "@/lib/api";
import { AddressResponse, AddressPayload } from "@/types/AddressType";
import { ApiResponse } from "@/types/ApiType";

const AddressService = {

    async findAll(page = 1, perPage = 10): Promise<ApiResponse<AddressResponse[]>> {
        const { data } = await api.get<ApiResponse<AddressResponse[]>>('/addresses', {
            params: {
                page,
                per_page: perPage
            }
        });

        return data;
    },

    async findMyAddresses(): Promise<ApiResponse<AddressResponse[]>> {
        const { data } = await api.get<ApiResponse<AddressResponse[]>>(
            '/addresses/my_addresses'
        );

        return data;
    },

    async findById(id: number): Promise<ApiResponse<AddressResponse>> {
        const { data } = await api.get<ApiResponse<AddressResponse>>(`/addresses/${id}`);
        return data;
    },

    async create(payload: AddressPayload): Promise<ApiResponse<AddressResponse>> {
        const { data } = await api.post<ApiResponse<AddressResponse>>('/addresses', {
            address: payload
        });

        return data;
    },

    async update(id: number, payload: Partial<AddressPayload>): Promise<ApiResponse<AddressResponse>> {
        const { data } = await api.put<ApiResponse<AddressResponse>>(`/addresses/${id}`, {
            address: payload
        });

        return data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/addresses/${id}`);
    }
};

export default AddressService;