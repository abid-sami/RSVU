"use client";

import React, { useState } from "react";
import { useAdminData } from "@/contexts/AdminDataContext";
import { FormField, inputClass, selectClass } from "@/components/admin/FormModal";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { EmptyState } from "@/components/admin/EmptyState";
import { ArrowLeftRight, Plus, RotateCcw, Package, Search } from "lucide-react";

const SEMESTERS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const SECTIONS = ["A", "B", "C", "D", "E", "F", "G"];

type Tab = "give" | "active" | "history";

export default function AdminBorrowingsPage() {
  const { components, borrowings, addBorrowing, returnBorrowing } = useAdminData();
  const [activeTab, setActiveTab] = useState<Tab>("give");
  const [returnTarget, setReturnTarget] = useState<string | null>(null);

  // Form state
  const [borrowerName, setBorrowerName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [semester, setSemester] = useState(1);
  const [section, setSection] = useState("A");
  const [componentId, setComponentId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [givenDate, setGivenDate] = useState(new Date().toISOString().split("T")[0]);

  const activeBorrowings = borrowings.filter((b) => b.status === "borrowed");
  const historyBorrowings = borrowings.filter((b) => b.status === "returned");

  const availableComponents = components.filter((c) => c.availableQuantity > 0);
  const selectedComp = components.find((c) => c.id === componentId);

  const handleGive = (e: React.FormEvent) => {
    e.preventDefault();
    const comp = components.find((c) => c.id === componentId);
    if (!comp) return;

    addBorrowing({
      borrowerName,
      studentId,
      semester,
      section,
      componentId,
      componentName: comp.name,
      quantity,
      givenDate,
    });

    // Reset form
    setBorrowerName("");
    setStudentId("");
    setSemester(1);
    setSection("A");
    setComponentId("");
    setQuantity(1);
    setGivenDate(new Date().toISOString().split("T")[0]);
    setActiveTab("active");
  };

  const handleReturn = () => {
    if (returnTarget) {
      returnBorrowing(returnTarget);
      setReturnTarget(null);
    }
  };

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "give", label: "Give Component" },
    { id: "active", label: "Active Borrowings", count: activeBorrowings.length },
    { id: "history", label: "History", count: historyBorrowings.length },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-slate-900/50 border border-slate-800/60 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-cyan-500 text-cyan-950"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            {tab.label}
            {typeof tab.count === "number" && (
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                activeTab === tab.id ? "bg-cyan-600/30 text-cyan-100" : "bg-slate-800 text-slate-400"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Give Component Form */}
      {activeTab === "give" && (
        <div className="max-w-xl">
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Plus className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Give Component to Student</h3>
            </div>
            <form onSubmit={handleGive} className="space-y-4">
              <FormField label="Student Name" required>
                <input type="text" value={borrowerName} onChange={(e) => setBorrowerName(e.target.value)} required className={inputClass} placeholder="Full name" />
              </FormField>
              <FormField label="Student ID" required>
                <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required className={inputClass} placeholder="242411000" />
              </FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Semester" required>
                  <select value={semester} onChange={(e) => setSemester(parseInt(e.target.value))} className={selectClass}>
                    {SEMESTERS.map((s) => <option key={s} value={s}> {s}</option>)}
                  </select>
                </FormField>
                <FormField label="Section" required>
                  <select value={section} onChange={(e) => setSection(e.target.value)} className={selectClass}>
                    {SECTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <FormField label="Component" required>
                    <div className="relative">
                      <select
                        value={componentId}
                        onChange={(e) => {
                          setComponentId(e.target.value);
                          setQuantity(1);
                        }}
                        required
                        className={`${selectClass} pr-10 appearance-none cursor-pointer`}
                      >
                        <option value="">Select a component...</option>
                        {availableComponents.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} (Available: {c.availableQuantity})
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <Search className="w-4 h-4" />
                      </div>
                    </div>
                    {components.length === 0 && (
                      <p className="text-xs text-amber-400 mt-1">No components added yet. Add components first.</p>
                    )}
                  </FormField>
                </div>

                <div>
                  <FormField label="Quantity" required>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className={selectClass}
                      disabled={!componentId}
                    >
                      {Array.from(
                        { length: Math.min(Math.max(selectedComp?.availableQuantity || 1, 1), 100) },
                        (_, i) => i + 1
                      ).map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </FormField>
                </div>
              </div>
              <FormField label="Given Date" required>
                <input type="date" value={givenDate} onChange={(e) => setGivenDate(e.target.value)} required className={inputClass} />
              </FormField>
              <button
                type="submit"
                disabled={!componentId}
                className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-cyan-950 font-semibold text-sm transition-colors disabled:opacity-50"
              >
                Assign Component
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Active Borrowings */}
      {activeTab === "active" && (
        <>
          {activeBorrowings.length === 0 ? (
            <EmptyState
              title="No active borrowings"
              message="All components are currently returned."
              icon={<ArrowLeftRight className="w-8 h-8 text-slate-500" />}
            />
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-800/60">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900/50 border-b border-slate-800/60">
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">ID</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Sem/Sec</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Component</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Qty</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Given Date</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {activeBorrowings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3 text-slate-200 font-medium">{b.borrowerName}</td>
                      <td className="px-4 py-3 text-slate-400 font-mono text-xs">{b.studentId}</td>
                      <td className="px-4 py-3 text-slate-300">{b.semester}/{b.section}</td>
                      <td className="px-4 py-3 text-slate-300">{b.componentName}</td>
                      <td className="px-4 py-3 text-cyan-400 font-mono font-semibold">{b.quantity || 1}</td>
                      <td className="px-4 py-3 text-slate-400">{b.givenDate}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setReturnTarget(b.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 text-xs font-medium transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Return
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* History */}
      {activeTab === "history" && (
        <>
          {historyBorrowings.length === 0 ? (
            <EmptyState
              title="No return history"
              message="Returned components will appear here."
              icon={<Package className="w-8 h-8 text-slate-500" />}
            />
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-800/60">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900/50 border-b border-slate-800/60">
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">ID</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Component</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Qty</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Given Date</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Returned Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {historyBorrowings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3 text-slate-200">{b.borrowerName}</td>
                      <td className="px-4 py-3 text-slate-400 font-mono text-xs">{b.studentId}</td>
                      <td className="px-4 py-3 text-slate-300">{b.componentName}</td>
                      <td className="px-4 py-3 text-slate-300 font-mono">{b.quantity || 1}</td>
                      <td className="px-4 py-3 text-slate-400">{b.givenDate}</td>
                      <td className="px-4 py-3 text-emerald-400">{b.returnedDate ? new Date(b.returnedDate).toLocaleDateString() : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Return Confirmation */}
      <ConfirmModal
        isOpen={!!returnTarget}
        title="Return Component"
        message="Confirm that this component has been returned? The availability will be updated automatically."
        confirmLabel="Confirm Return"
        variant="info"
        onConfirm={handleReturn}
        onCancel={() => setReturnTarget(null)}
      />
    </div>
  );
}
