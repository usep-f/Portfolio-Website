import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, FileText } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
}

export default function ResumeModal({ isOpen, onClose, pdfUrl = "" }: ResumeModalProps) {
  const handleOpenPDF = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-neutral-950/85 dark:bg-neutral-950/90 backdrop-blur-sm"
          id="resume-backdrop"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 rounded-none shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Header Actions */}
          <div className="p-5 border-b border-neutral-200 dark:border-neutral-900 flex justify-between items-center bg-neutral-50 dark:bg-neutral-1050">
            <div className="flex items-center space-x-3">
              <h3 className="font-serif italic font-normal text-xl text-neutral-950 dark:text-neutral-50 flex items-center gap-2">
                <FileText className="w-5 h-5 text-pink-500" /> Curriculum Vitae
              </h3>
              <span className="text-[9px] px-2 py-0.5 bg-neutral-950 dark:bg-gradient-to-r dark:from-violet-500 dark:to-pink-500 text-white dark:text-white font-mono rounded-none uppercase tracking-wider font-bold">
                PDF Viewer
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {pdfUrl && (
                <button
                  onClick={handleOpenPDF}
                  className="flex items-center gap-1.5 px-4 py-2 border border-neutral-300 dark:border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-950 transition rounded-none pointer-events-auto cursor-pointer font-bold"
                  id="open-pdf-btn"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open PDF</span>
                </button>
              )}
              
              <button
                onClick={onClose}
                className="p-2 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition pointer-events-auto cursor-pointer"
                id="close-cv-btn"
                aria-label="Close CV"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PDF Viewer Body */}
          <div className="flex-1 bg-neutral-100 dark:bg-neutral-950 flex flex-col overflow-hidden">
            {pdfUrl ? (
              <iframe
                src={`${pdfUrl}#toolbar=1`}
                className="w-full h-full border-none"
                title="Curriculum Vitae PDF"
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 bg-white dark:bg-neutral-1050">
                <FileText className="w-16 h-16 text-neutral-300 dark:text-neutral-700 animate-pulse" />
                <div className="space-y-1">
                  <h4 className="font-serif italic text-lg text-neutral-800 dark:text-neutral-200">
                    CV PDF not uploaded
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm">
                    Publisher has not yet uploaded their CV File.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
