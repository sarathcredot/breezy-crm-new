import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

// API base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://server-api-breezy.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService={

      getAllInvoiceItems:()=>{

         return api.get('/invoice/invoice-items')
      },
      createInvoiceItem:(data:any)=>{

        return api.post('/invoice/invoice-items',data)
      },
      deleteInvoiceItem:(itemId:any)=>{

          return api.delete(`/invoice/invoice-items/${itemId}`)
      }
}


export const useGetAllInvoiceItems=()=>{

    return useQuery({
        
        queryKey:['invoice-items'],
         queryFn:apiService.getAllInvoiceItems
    })
}   

export const useCreateInvoiceItem=()=>{

    const queryClient=useQueryClient()

    return useMutation({
        
        mutationFn:apiService.createInvoiceItem,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['invoice-items']})
           
        },
        onError:(error:any)=>{
            toast.error(error?.response?.data?.message || 'Failed to create invoice item');
        }
    })
}



export const useDeleteInvoiceItem=()=>{

    const queryClient=useQueryClient()

    return useMutation({
        
        mutationFn:apiService.deleteInvoiceItem,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['invoice-items']})
           
        },
        onError:(error:any)=>{
            toast.error(error?.response?.data?.message || 'Failed to deletd invoice item');
        }
    })
}