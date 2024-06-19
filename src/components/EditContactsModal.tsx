import React, { useRef } from "react";
import axios from "axios";

interface EditModalProps {
    showEditModal: boolean;
    toggleEditModal: () => void;
    editId: number;
    editName: string;
    editAddress: string;
    setEditName: React.Dispatch<React.SetStateAction<string>>;
    setEditAddress: React.Dispatch<React.SetStateAction<string>>;
    fetchData: () => void;
}

const EditContactsModal: React.FC<EditModalProps> = ({ showEditModal, toggleEditModal, editId, editName, editAddress, setEditName, setEditAddress, fetchData }) => {
    const handleEditSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.patch('/api/contacts', { id: editId, name: editName, address: editAddress });
            if (response.status === 200) {
                console.log('Contact edited successfully');
                fetchData();
                toggleEditModal();
            }
        } catch (error) {
            console.error('Failed to edit contact:', error);
        }
    };

    return (
        <>
            {showEditModal && (
                <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 rounded-lg shadow-lg p-4 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
                            <h2 className="text-xl font-semibold text-gray-400">Edit Contact</h2>
                            <button
                                onClick={toggleEditModal}
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
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-400">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-400">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 border border-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={editAddress}
                                    onChange={(e) => setEditAddress(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditContactsModal;
