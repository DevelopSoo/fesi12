// src/components/Modal/index.tsx

"use client";

import React from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}
export default function Modal({ children, isOpen }: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-sm rounded-lg bg-white text-center">{children}</div>
    </div>,
    document.body,
  );
}

function ModalContent({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4 p-4">{children}</div>;
}

function ModalHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

function ModalTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-2xl font-bold">{children}</h1>;
}

function ModalDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-500">{children}</p>;
}

function ModalFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-between">{children}</div>;
}

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;
