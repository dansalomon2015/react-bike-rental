import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, SideBar, ErrorBoundary } from "components";

function App() {
    return (
        <div className="flex">
            <ErrorBoundary>
                <SideBar />
            </ErrorBoundary>
            <div className="h-screen w-full">
                <Navbar />
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default App;
