"use client";

import React, { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { AiOutlineCheck } from "react-icons/ai";
import AddContactsModal from "@/components/AddContactsModal";
import SendContactsModal from "@/components/SendContactsModal";
import EditContactsModal from "@/components/EditContactsModal";
import axios from "axios";

interface Friend {
    id: number;
    name: string;
    address: string;
    transaction_no: number;
}

const Contacts = () => {
    const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSendModal, setShowSendModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [friendsData, setFriendsData] = useState<Friend[]>([]);
    const [editId, setEditId] = useState(-1);
    const [editName, setEditName] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [sendId, setSendId] = useState(-1);
    const [sendName, setSendName] = useState("");
    const [sendAddress, setSendAddress] = useState("");

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/contacts');
            setFriendsData(response.data.friendsData.friends);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    const toggleEditModal = () => {
        setShowEditModal(!showEditModal);
    };

    const handleDelete = async (name: string, address: string) => {
        try {
            const response = await axios.delete('/api/contacts', { data: { name, address } });
            fetchData();
            if (response.status === 200) {
                console.log('Contact deleted successfully');
            }
        } catch (error) {
            console.error('Failed to delete contact:', error);
        }
    };

    const handleEditModal = (id: number, name: string, address: string) => {
        setEditId(id);
        setEditName(name);
        setEditAddress(address);
        toggleEditModal();
    };

    const handleSendModal = (id: number, name: string, address: string) => {
        setSendId(id);
        setSendName(name);
        setSendAddress(address);
        toggleSendModal();
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
                                <button onClick={() => {handleEditModal(contact.id, contact.name, contact.address)}} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-3 py-1 flex items-center transition duration-300 ease-in-out">
                                    Edit <MdEdit size={14} className="ml-1" />
                                </button>
                                <button onClick={()=>{handleSendModal(contact.id, contact.name, contact.address)}} className="bg-green-600 hover:bg-green-700 text-white rounded-full px-3 py-1 flex items-center transition duration-300 ease-in-out">
                                    Send <BsFillSendFill size={14} className="ml-1" />
                                </button>
                                <button onClick={() => handleDelete(contact.name, contact.address)} className="bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-1 flex items-center transition duration-300 ease-in-out">
                                    Delete <RiDeleteBinFill size={14} className="ml-1" />
                                </button>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <AddContactsModal
                showAddModal={showAddModal}
                toggleAddModal={toggleAddModal}
                fetchData={fetchData}
            />

            <SendContactsModal
                showSendModal={showSendModal}
                toggleSendModal={toggleSendModal}
                sendData={{id:sendId, name:sendName, address:sendAddress}}
            />

            <EditContactsModal
                showEditModal={showEditModal}
                toggleEditModal={toggleEditModal}
                editId={editId}
                editName={editName}
                editAddress={editAddress}
                setEditName={setEditName}
                setEditAddress={setEditAddress}
                fetchData={fetchData}
            />
        </div>
    );
};

export default Contacts;
