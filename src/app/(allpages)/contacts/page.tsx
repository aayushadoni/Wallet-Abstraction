"use client";

import React, { useRef, useState,useEffect } from "react";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { AiOutlineCheck } from "react-icons/ai";
import { BsFillSendFill } from "react-icons/bs";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import axios from "axios";

interface Friend {
    id: number;
    name: string;
    address: string;
    transaction_no:number;
}

const Contacts = () => {
    const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSendModal, setShowSendModal] = useState(false);
    const [friendsData,setFriendsData] = useState<Friend[]>([]);
    console.log(friendsData);
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/contacts');
            setFriendsData(response.data.friendsData.friends);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {fetchData();}, []);

    const copyToClipboard = (address: string) => {
        navigator.clipboard.writeText(address);
        setCopiedAddress(address);
        setTimeout(() => setCopiedAddress(null), 3000);
    };

    const toggleAddModal = () => {
        setShowAddModal(!showAddModal);
    };

    const toggleSendModal = () => {
        setShowSendModal(!showSendModal);
    };

    const name = useRef("");
    const address = useRef("");

    const handleAddSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      try {
          const response = await axios.post('/api/contacts', { name:name.current, address:address.current });
          if (response.status === 200) {
              console.log('Contact added successfully');
              fetchData();
              toggleAddModal();
          }
      } catch (error) {
          console.error('Failed to add contact:', error);
      }
  };

  const handleSendSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
        const response = await axios.post('/api/contacts', { name:name.current, address:address.current });
        if (response.status === 200) {
            console.log('Contact added successfully');
            fetchData();
            toggleAddModal();
        }
    } catch (error) {
        console.error('Failed to add contact:', error);
    }
};

  const handleDelete = async (name:string,address:string) => {
    try {
        const response = await axios.delete('/api/contacts', { data:{name,address}});
        fetchData();
        if (response.status === 200) {
            console.log('Contact deleted successfully');
        }
    } catch (error) {
        console.error('Failed to delete contact:', error);
    }
};

    return (
        <div>
            <div className="bg-gray-800 rounded-xl mt-4 p-4 shadow-lg">
                <div className="grid grid-cols-4 py-2 px-4 text-gray-200 text-base font-semibold">
                    <div className="flex items-center">Name</div>
                    <div className="flex items-center">Address</div>
                    <div className="flex items-center justify-center">Sent</div>
                    <div className="flex items-center justify-end">
                        <button
                            onClick={toggleAddModal}
                            className="focus:outline-none"
                            aria-label="Add contact"
                        >
                            <IoAdd size={24} className="text-gray-200" />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-2 text-sm">
                    {friendsData.map((contact) => (
                        <React.Fragment key={contact.id}>
                            <div className="flex items-center text-gray-200">{contact.name}</div>
                            <div className="flex items-center justify-between bg-gray-700 px-2 py-2 rounded-lg shadow-inner">
                                <p className="text-white font-mono text-xs">
                                    {contact.address.substring(0, 28)}...{contact.address.substring(contact.address.length - 4)}
                                </p>
                                <button
                                    className="text-white hover:text-gray-300 focus:outline-none"
                                    onClick={() => copyToClipboard(contact.address)}
                                    aria-label="Copy wallet address"
                                >
                                    {copiedAddress === contact.address ? (
                                        <AiOutlineCheck className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <HiOutlineClipboardCopy className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <div className="flex items-center justify-center text-gray-200">{`Sent ${contact.transaction_no} times`}</div>
                            <div className="flex gap-2 justify-center">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-3 py-1 flex items-center transition duration-300 ease-in-out">
                                    Edit <MdEdit size={14} className="ml-1" />
                                </button>
                                <button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-3 py-1 flex items-center transition duration-300 ease-in-out">
                                    Send <BsFillSendFill size={14} className="ml-1" />
                                </button>
                                <button onClick={()=>handleDelete(contact.name,contact.address)}className="bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-1 flex items-center transition duration-300 ease-in-out">
                                    Delete <RiDeleteBinFill size={14} className="ml-1" />
                                </button>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {showAddModal && (
                <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 rounded-lg shadow-lg p-4 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
                            <h2 className="text-xl font-semibold text-gray-400">Add Contact</h2>
                            <button
                                onClick={toggleAddModal}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-400">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter name"
                                    onChange={(e) => (name.current = e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-400">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter address"
                                    onChange={(e) => (address.current = e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

{showSendModal && (
                <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 rounded-lg shadow-lg p-4 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
                            <h2 className="text-xl font-semibold text-gray-400">Add Contact</h2>
                            <button
                                onClick={toggleSendModal}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSendSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-400">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter name"
                                    onChange={(e) => (name.current = e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-400">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter address"
                                    onChange={(e) => (address.current = e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Contacts;
