"use client";
import React, { createContext, useContext, useState } from "react";

const DrawerContext = createContext();

export function Drawer({ children, side = "right" }) {
    const [open, setOpen] = useState(false);
    return (
        <DrawerContext.Provider value={{ open, setOpen, side }}>
            {children}
        </DrawerContext.Provider>
    );
}

export function DrawerTrigger({ children }) {
    const { setOpen } = useContext(DrawerContext);
    return React.cloneElement(children, {
        onClick: () => setOpen(true),
    });
}

export function DrawerClose({ children }) {
    const { setOpen } = useContext(DrawerContext);
    return React.cloneElement(children, {
        onClick: () => setOpen(false),
    });
}

export function DrawerContent({ children }) {
    const { open, setOpen, side } = useContext(DrawerContext);
    if (!open) return null;

    // Determine drawer panel position
    let panelClasses = "absolute bg-[#121C33] shadow-lg p-6 overflow-y-auto transition-transform";
    if (side === "right") panelClasses += " right-0 top-0 h-full w-80 sm:w-96";
    if (side === "bottom") panelClasses += " left-0 bottom-0 w-full max-h-[80vh] rounded-t-xl";

    return (
        <div className="fixed inset-0 z-50 flex justify-end items-end">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setOpen(false)}
            ></div>

            {/* Drawer panel */}
            <div className={panelClasses}>
                {children}
            </div>
        </div>
    );
}

export function DrawerHeader({ children }) {
    return <div className="mb-4">{children}</div>;
}

export function DrawerTitle({ children }) {
    return <h2 className="text-2xl font-bold">{children}</h2>;
}

export function DrawerDescription({ children }) {
    return <p className="text-gray-400">{children}</p>;
}

export function DrawerFooter({ children }) {
    return <div className="mt-6 flex justify-end gap-3">{children}</div>;
}
