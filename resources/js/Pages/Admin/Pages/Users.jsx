import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UserTable from "../UserTable";

const Users = ({ auth, usersPerPage, queryParams = null }) => {
    queryParams = queryParams || {};
    
    const TABLE_HEAD = ["ID", "Name", "Email", "Role", "Created At", "Updated At", "Email Status", "Action"];

    const users = usersPerPage.data;
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-medium text-xl text-gray-800 leading-tight">
                    Manage Users
                </h2>
            }>
            <div className="mt-10 max-w-full mx-auto px-4 sm:max-w-4xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
                <UserTable TABLE_HEAD={TABLE_HEAD} queryParams={queryParams} users={users} usersPerPage={usersPerPage} />
            </div>
        </AuthenticatedLayout>
    )
}

export default Users