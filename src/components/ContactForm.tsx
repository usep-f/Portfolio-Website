import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, AlertCircle, RefreshCw, MessageSquareCode, Trash } from "lucide-react";
import { ContactSubmission } from "../types";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "SaaS Dashboard",
    budget: "$2k - $5k",
    message: ""
  });

  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showInboxes, setShowInboxes] = useState(false);

  // Sync with local storage
  useEffect(() => {
    try {
      const cached = localStorage.getItem("portfolio_submissions_v1");
      if (cached) {
        setSubmissions(JSON.parse(cached));
      }
    } catch (e) {
      console.warn("Storage fetch skipped due to sandboxing", e);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearInboxes = () => {
    try {
      localStorage.removeItem("portfolio_submissions_v1");
      setSubmissions([]);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitError("Please provide a valid email address.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setSubmitError("Web3Forms Access Key is missing. Please configure VITE_WEB3FORMS_ACCESS_KEY in your .env file.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: `New Portfolio Contact: ${formData.name}`,
          from_name: "Portfolio Contact Form",
          message: formData.message,
          service: formData.service,
          budget: formData.budget,
        })
      });

      const result = await response.json();

      if (result.success) {
        const newSubmission: ContactSubmission = {
          id: Math.random().toString(36).substring(2, 9),
          name: formData.name,
          email: formData.email,
          service: formData.service,
          budget: formData.budget,
          message: formData.message,
          createdAt: new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) + ", Jun 21 2026"
        };

        try {
          const nextSubmissions = [newSubmission, ...submissions];
          localStorage.setItem("portfolio_submissions_v1", JSON.stringify(nextSubmissions));
          setSubmissions(nextSubmissions);
        } catch (err) {
          console.warn("Storage sync skipped", err);
        }

        setSubmitSuccess(true);
        // Reset form variables
        setFormData({
          name: "",
          email: "",
          service: "SaaS Dashboard",
          budget: "$2k - $5k",
          message: ""
        });
      } else {
        setSubmitError(result.message || "Failed to submit form.");
      }
    } catch (err) {
      console.error("Web3Forms submission error", err);
      setSubmitError("Failed to connect to the email service. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <AnimatePresence mode="wait">
        {!submitSuccess ? (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs rounded-none flex items-center gap-2 font-mono"
                id="error-msg-box"
              >
                <AlertCircle className="w-4 h-4 shrink-0 animate-pulse" />
                <span>ERR // {submitError.toUpperCase()}</span>
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase font-bold block">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Juan dela Cruz"
                  className="w-full text-sm px-4 py-3 rounded-none bg-neutral-50 dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-pink-500 transition-all font-sans"
                  id="contact-name"
                  disabled={isSubmitting}
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase font-bold block">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="juan@gmail.com"
                  className="w-full text-sm px-4 py-3 rounded-none bg-neutral-50 dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-pink-500 transition-all font-sans"
                  id="contact-email"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Desired Service */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase font-bold block">
                  What do you need help with?
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full text-sm px-4 py-3 rounded-none bg-neutral-50 dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-pink-500 transition font-sans"
                  id="contact-service"
                  disabled={isSubmitting}
                >
                  <option value="SaaS Dashboard">SaaS Dashboard / Web App</option>
                  <option value="Interactive Web App">Interactive Website</option>
                  <option value="Technical Redesign">Redesign & Optimization</option>
                  <option value="Full-Stack System">Hardware & Networking</option>
                </select>
              </div>

              {/* Budget Range */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase font-bold block">
                  Estimated Budget
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full text-sm px-4 py-3 rounded-none bg-neutral-50 dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-pink-500 transition font-sans"
                  id="contact-budget"
                  disabled={isSubmitting}
                >
                  <option value="<$2k">Less than $2,000</option>
                  <option value="$2k - $5k">$2,000 — $5,000</option>
                  <option value="$5k - $10k">$5,000 — $10,000</option>
                  <option value="$10k+">$10,000 +</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase font-bold block">
                Project Details
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Describe what you need help with (e.g., building a website, fixing a PC, drafting a CAD floor plan)..."
                className="w-full text-sm px-4 py-3 rounded-none bg-neutral-50 dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-900 dark:focus:border-pink-500 transition-all font-sans resize-none"
                id="contact-message"
                disabled={isSubmitting}
              />
            </div>

            {/* Launch Call-To-Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative py-4 bg-neutral-950 dark:bg-gradient-to-r dark:from-violet-600 dark:to-pink-600 dark:hover:opacity-90 disabled:bg-neutral-400 text-white font-mono text-xs tracking-[0.2em] font-bold uppercase rounded-none overflow-hidden transition-all duration-300 flex items-center justify-center gap-2.5 pointer-events-auto cursor-pointer"
              id="submit-contact-form"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success-box"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-neutral-50 dark:bg-neutral-900/20 border border-neutral-200 dark:border-neutral-900 text-center space-y-4"
          >
            <div className="inline-flex items-center justify-center p-3 text-neutral-950 dark:text-pink-400 border border-neutral-200 dark:border-neutral-800">
              <CheckCircle2 className="w-6 h-6 animate-pulse" />
            </div>
            
            <h4 className="text-xl font-serif italic text-neutral-950 dark:text-white">
              Message sent successfully!
            </h4>
            
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed font-sans">
              Thank you! Your message has been saved in local state. I will review it and get back to you as soon as I can.
            </p>

            <button
              onClick={() => setSubmitSuccess(false)}
              className="px-6 py-2.5 bg-neutral-950 dark:bg-neutral-900 text-white rounded-none text-xs font-mono tracking-widest uppercase transition hover:opacity-90 pointer-events-auto cursor-pointer"
              id="send-another-proposal"
            >
              Send Another Message
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Local Inbox administrative debugger drawer */}
      {submissions.length > 0 && (
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-900">
          <button
            onClick={() => setShowInboxes(!showInboxes)}
            className="flex items-center justify-between w-full text-left text-xs font-mono text-neutral-400 hover:text-neutral-600 dark:hover:text-pink-400 transition pointer-events-auto cursor-pointer uppercase tracking-wider"
            id="toggle-submissions"
          >
            <span className="flex items-center gap-1.5 font-bold">
              <MessageSquareCode className="w-4 h-4 text-neutral-400 dark:text-pink-500" />
              <span>Saved Messages ({submissions.length})</span>
            </span>
            <span className="text-[10px] bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5">{showInboxes ? "Hide" : "Show"}</span>
          </button>

          <AnimatePresence>
            {showInboxes && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-3 space-y-3 max-h-60 overflow-y-auto pr-1"
                id="submissions-list"
              >
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 bg-neutral-50 dark:bg-neutral-1050 border border-neutral-200 dark:border-neutral-900 text-[11px] font-mono flex flex-col gap-1.5 text-neutral-600 dark:text-neutral-400"
                  >
                    <div className="flex justify-between text-neutral-400 items-center">
                      <span>From: <strong className="text-neutral-800 dark:text-neutral-200">{sub.name}</strong> ({sub.email})</span>
                      <span>{sub.createdAt}</span>
                    </div>
                    <div className="text-neutral-950 dark:text-pink-400 font-bold uppercase tracking-wider text-[9px]">
                      {sub.service} // Budget {sub.budget}
                    </div>
                    <p className="font-serif italic text-xs text-neutral-800 dark:text-neutral-300 bg-white dark:bg-neutral-950 p-3 border border-neutral-200 dark:border-neutral-900 mt-1">
                      "{sub.message}"
                    </p>
                  </div>
                ))}

                <button
                  onClick={handleClearInboxes}
                  className="flex items-center justify-center gap-1 w-full text-[10px] py-2 border border-red-500/20 hover:bg-red-500/5 text-red-500 rounded-none font-mono uppercase tracking-wider transition"
                  id="clear-submissions-btn"
                >
                  <Trash className="w-3.5 h-3.5" />
                  <span>Clear Saved Messages</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
