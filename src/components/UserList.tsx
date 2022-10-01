import React, { FC } from "react";
import { useAuth, useStore } from "hooks";
import { AuthUserType, dateToLocale, ROLE, ROLES } from "utils/";
import { DialogBox } from "./DialogBox";
import { deleteUserExtend } from "api";
import { CreateUserForm } from "./CreateUserForm";
import { ErrorBoundary } from "./ErrorBoundary";
import { Link } from "react-router-dom";

export const UserList: FC<{ role: ROLE }> = ({ role }) => {
    const { userList, managerList, loadingManagers, loadingUsers } = useStore({});

    let list = role === "ADMIN_ROLE" ? managerList : userList;
    let loading = loadingManagers || loadingUsers;

    if (loading) return <span className="text-xs">Loading...</span>;

    if (!list.length) return <span className="text-xs">No data found</span>;

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-16">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                    <tr>
                        <th scope="col" className="py-2 px-3">
                            #
                        </th>
                        <th scope="col" className="py-2 px-3">
                            Name
                        </th>
                        <th scope="col" className="py-2 px-3">
                            email
                        </th>
                        <th scope="col" className="py-2 px-3">
                            Location
                        </th>
                        {role === "USER_ROLE" && (
                            <th scope="col" className="py-2 px-3">
                                Nbr. Reservations
                            </th>
                        )}
                        <th scope="col" className="py-2 px-3">
                            Subscribe on
                        </th>
                        <th scope="col" className="py-2 px-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((user, idx) => {
                        return <UserItem user={user} idx={idx} key={idx} />;
                    })}
                </tbody>
            </table>
            <div className="modal-alert"></div>
        </div>
    );
};

const UserItem: FC<{ user: AuthUserType; idx: number }> = ({ user, idx }) => {
    const { auth } = useAuth();
    const { email, timestamp, location, username, id, roles } = user;
    const { reservations } = useStore({ userId: id });
    const [dialogVisible, setDialogVisible] = React.useState(false);
    const [formVisible, setFormVisible] = React.useState(false);

    const isCurrentAdmin = () => auth?.user?.uid === id;

    const _delete = () => {
        setDialogVisible(false);
        deleteUserExtend(id!);
    };

    return (
        <>
            <ErrorBoundary>
                <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b`}>
                    <td className="py-2 px-3">{idx + 1}</td>
                    <td className="py-2 px-3">{username}</td>
                    <td className="py-2 px-3">{email}</td>
                    <td className="py-2 px-3">{location}</td>
                    {user.roles.includes(ROLES.User) && (
                        <td className="py-2 px-3">
                            {reservations.length}
                            {!!reservations.length && (
                                <Link to={`/users/${id}`}>
                                    <span className="font-bold text-black cursor-pointer mx-1">(Show Details)</span>
                                </Link>
                            )}
                        </td>
                    )}
                    <td className="py-2 px-3">{dateToLocale(timestamp!)}</td>
                    <td>
                        <span onClick={() => setFormVisible(true)} className="font-bold text-black cursor-pointer mr-4">
                            Edit
                        </span>
                        {!isCurrentAdmin() && (
                            <span
                                onClick={() => setDialogVisible(true)}
                                className="font-bold text-red-600 cursor-pointer"
                            >
                                Delete
                            </span>
                        )}
                    </td>
                </tr>
            </ErrorBoundary>

            <DialogBox
                visible={dialogVisible}
                title={`Confirm Deletion`}
                message={`Delete the user ${username}  - ${email}`}
                onCancel={() => setDialogVisible(false)}
                onAccept={_delete}
            />

            <CreateUserForm role={roles[0]} visible={formVisible} user={user} close={() => setFormVisible(false)} />
        </>
    );
};
