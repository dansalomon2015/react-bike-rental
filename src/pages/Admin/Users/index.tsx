import React, { useState } from "react";
import { UserList } from "components/UserList";
import { Outlet } from "react-router-dom";
import { ROLES } from "utils";
import { CreateUserForm } from "components/";

export const Users = () => {
    const [formVisible, setFormVisible] = useState(false);
    return (
        <div>
            <h3 className="text-3xl font-bold ">List of users</h3>
            <div>
                <button
                    onClick={() => setFormVisible(true)}
                    className=" ml-auto block text-white bg-black hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="button"
                >
                    + Create User
                </button>
            </div>
            <UserList role={ROLES.User} />

            <CreateUserForm role={ROLES.User} visible={formVisible} close={() => setFormVisible(false)} />

            <Outlet></Outlet>
        </div>
    );
};
