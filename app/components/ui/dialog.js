"use client";
import React from "react";

export function Dialog({ open, onOpenChange, children }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#121C33] p-6 rounded-xl w-full max-w-2xl relative">
                {children}
                <button
                    className="absolute top-4 right-4 text-white bg-red-500 px-3 py-1 rounded"
                    onClick={() => onOpenChange(false)}
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

export function DialogContent({ children }) {
    return <div>{children}</div>;
}

export function DialogHeader({ children }) {
    return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
    return <h2 className="text-2xl font-bold">{children}</h2>;
}

export function DialogDescription({ children }) {
    return <p className="text-gray-400">{children}</p>;
}
