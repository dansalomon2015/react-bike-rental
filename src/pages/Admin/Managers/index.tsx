import React, { useState } from "react";
import { CreateUserForm, UserList } from "components/";
import { ROLES } from "utils/";

export const Managers = () => {
    const [formVisible, setFormVisible] = useState(false);
    return (
        <div>
            <h3 className="text-3xl font-bold ">List of managers</h3>
            <div>
                <button
                    onClick={() => setFormVisible(true)}
                    className=" ml-auto block text-white bg-black hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="button"
                >
                    + Create Manager
                </button>
            </div>

            <UserList role={ROLES.Admin} />

            <CreateUserForm role={ROLES.Admin} visible={formVisible} close={() => setFormVisible(false)} />
        </div>
    );
};
