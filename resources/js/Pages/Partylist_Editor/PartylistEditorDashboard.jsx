import React from 'react'
import { motion } from "framer-motion";
const PartylistEditorDashboard = () => {
    return (
        <div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <h1 className="text-xl font-bold">Welcome, Partylist Editor!</h1>
                </div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Hello, Framer Motion!
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default PartylistEditorDashboard