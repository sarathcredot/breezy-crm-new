import React from 'react'
import { useState, useEffect } from 'react';
import { ClipLoader } from "react-spinners"

import {
    useGetAllInvoiceItems,
    useCreateInvoiceItem,
    useDeleteInvoiceItem
} from '../../hooks/useApi';
import { toast } from "react-toastify"
type Items = {
    particulars: string;
    quantity: string | number;
    price: string | number;
};


function Table() {

    const { data: invoiceItems, isLoading: invoiceItemsLoading } = useGetAllInvoiceItems()
    const { mutateAsync: createInvoiceItem, isPending: invoiceItemPending } = useCreateInvoiceItem()
    const { mutateAsync: deleteInvoiceItem, isPending: deleteItemPending } = useDeleteInvoiceItem()

    const sampleData: Items[] = [
        { particulars: "ac water service", quantity: "1", price: "1200" },
        { particulars: "board service", quantity: "1", price: "800" },
        { particulars: "ac service", quantity: "1", price: "600" },

    ];

    const [formData, setFormData] = useState<Items>({
        particulars: "",
        quantity: "",
        price: "",
    });
    const [deletingItemId, setDeletingItemId] = useState(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'price') {
            const price = Number(value)
            setFormData({ ...formData, [name]: price });
        } else if (name === 'quantity') {
            const quantity = Number(value)
            setFormData({ ...formData, [name]: quantity });
        }
        else {
            setFormData({ ...formData, [name]: value });
        }

    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {

        try {

            if (!formData.particulars || !formData.quantity) {

                toast.error("please fill all required fileds")
                return;
            }

            const res = await createInvoiceItem(formData)

            toast.success("new item added")

            setFormData({
                particulars: "",
                price: "",
                quantity: ""
            })


        } catch (error) {
            toast.error("network error")
        }
    };


    const handleDeleteItem = async (id: any) => {

        try {
            setDeletingItemId(() => id)
            const res = await deleteInvoiceItem(id)
            toast.success("item deleted")

        } catch (error) {
            toast.error("network error")
        }
    }


    return (
        <div className="p-4">
            <div className='w-full h-[200px] flex  gap-10 rounded-xl mb-5' >

                <div>
                    <label className='font-semibold' htmlFor="particulars">Particulars</label><br />
                    <input
                        type="text"
                        id="particulars"
                        name='particulars'
                        placeholder='particulars'
                        className='w-[400px] h-[50px] rounded-sm pl-5 shadow-lg border border-[#1f709f] focus:outline-none focus:border-[#1f709f] focus:ring-0'
                        onChange={handleChange}
                        value={formData.particulars}
                    />

                </div>
                <div>
                    <label className='font-semibold' htmlFor="quantity">Quantity</label><br />
                    <input
                        type="text"
                        id="quantity"
                        name='quantity'
                        placeholder='quantity'
                        className='w-[400px] h-[50px] rounded-sm pl-5 shadow-lg border border-[#1f709f] focus:outline-none focus:border-[#1f709f] focus:ring-0'
                        onChange={handleChange}
                        value={formData.quantity}
                    />

                </div>
                <div>
                    <label className='font-semibold' htmlFor="price">Price</label><br />
                    <input
                        type="text"
                        id="price"
                        name='price'
                        placeholder='price'
                        className='w-[400px] h-[50px] rounded-sm pl-5 shadow-lg border border-[#1f709f] focus:outline-none focus:border-[#1f709f] focus:ring-0'
                        onChange={handleChange}
                        value={formData.price}
                    />

                </div>

                <div>
                    <button onClick={handleSubmit} className='bg-[#1f709f] mt-[24px]  text-white px-10 py-3 rounded-sm'>

                        {
                            invoiceItemPending ?
                                <ClipLoader size={20} color='white' />
                                : "Add"


                        }


                    </button>
                </div>


            </div>





            {/* <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-y-auto max-h-[600px]">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#1f709f] sticky top-0 z-10 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left font-medium  border-r" style={{ borderColor: '#1f709f' }}>Particulars</th>
                                <th className="px-6 py-3 text-left font-medium  border-r" style={{ borderColor: '#1f709f' }}>Quantity</th>
                                <th className="px-6 py-3 text-left font-medium  border-r" style={{ borderColor: '#1f709f' }}>Price</th>
                                <th className="px-6 py-3 text-left font-medium  border-r" style={{ borderColor: '#1f709f' }}>Action</th>
                            </tr>
                        </thead>


                        <tbody className="bg-white divide-y divide-gray-200">
                            {invoiceItems?.data?.data?.map((person: any, index: any) => (

                                <tr key={index} className='hover:bg-slate-200' >
                                    <td className="px-6 py-4 border-r" style={{ borderColor: '#1f709f' }}>{person?.particulars}</td>
                                    <td className="px-6 py-4 border-r" style={{ borderColor: '#1f709f' }}>{person?.quantity}</td>
                                    <td className="px-6 py-4 border-r" style={{ borderColor: '#1f709f' }}>{person?.price}</td>
                                    <td className="px-6 py-4 border-r" style={{ borderColor: '#1f709f' }}>
                                        <button
                                            onClick={() => { handleDeleteItem(person?._id) }}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                            {deleteItemPending && deletingItemId === person?._id
                                                ? <ClipLoader size={20} color='white' />
                                                : "Delete"}
                                        </button>
                                    </td>
                                </tr>

                            ))}




                        </tbody>

                       


                    </table>
                </div>
            </div> */}

            <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-y-auto max-h-[600px] relative">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#1f709f] sticky top-0 z-10 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left font-medium border-r" style={{ borderColor: '#1f709f' }}>Particulars</th>
                                <th className="px-6 py-3 text-left font-medium border-r" style={{ borderColor: '#1f709f' }}>Quantity</th>
                                <th className="px-6 py-3 text-left font-medium border-r" style={{ borderColor: '#1f709f' }}>Price</th>
                                <th className="px-6 py-3 text-left font-medium border-r" style={{ borderColor: '#1f709f' }}>Action</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {invoiceItemsLoading ? (
                                // Show loader
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center">
                                        <ClipLoader size={40} color="#1f709f" />
                                    </td>
                                </tr>
                            ) : invoiceItems?.data?.data?.length === 0 ? (
                                // Show "No record found"
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                                        No record found
                                    </td>
                                </tr>
                            ) : (
                                invoiceItems?.data?.data?.map((person: any, index: any) => (
                                    <tr key={index} className="hover:bg-slate-200">
                                        <td className="px-6 py-4 border-r" style={{ borderColor: '#1f709f' }}>{person?.particulars}</td>
                                        <td className="px-6 py-4 border-r" style={{ borderColor: '#1f709f' }}>{person?.quantity}</td>
                                        <td className="px-6 py-4 border-r" style={{ borderColor: '#1f709f' }}>{person?.price}</td>
                                        <td className="px-6 py-4 border-r" style={{ borderColor: '#1f709f' }}>
                                            <button
                                                onClick={() => { handleDeleteItem(person?._id) }}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                {deleteItemPending && deletingItemId === person?._id
                                                    ? <ClipLoader size={20} color='white' />
                                                    : "Delete"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>







        </div>
    )
}

export default Table