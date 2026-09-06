"use client";

import React, { useState } from "react";
import { useAdminData } from "@/contexts/AdminDataContext";
import { AdminEvent, EventCategory } from "@/lib/adminTypes";
import { FormModal, FormField, inputClass, selectClass } from "@/components/admin/FormModal";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { EmptyState } from "@/components/admin/EmptyState";
import { Plus, Search, Edit2, Trash2, CalendarDays, Power, Radio } from "lucide-react";

const EVENT_CATEGORIES: EventCategory[] = ["Upcoming", "Past"];

export default function AdminEventsPage() {
  const { events, addEvent, updateEvent, deleteEvent, countdown, updateCountdown } = useAdminData();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<EventCategory | "All">("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminEvent | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminEvent | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState<EventCategory>("Upcoming");
  const [registration, setRegistration] = useState<"Open" | "Closed">("Open");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [prizePool, setPrizePool] = useState("");
  const [price, setPrice] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");

  // Countdown state
  const [countdownEnabled, setCountdownEnabled] = useState(countdown.isEnabled);
  const [countdownName, setCountdownName] = useState(countdown.eventName);
  const [countdownDate, setCountdownDate] = useState(countdown.eventDate ? countdown.eventDate.split("T")[0] : "");

  const resetForm = () => {
    setName(""); setCategory("Upcoming"); setRegistration("Open"); setDate(""); setPlace("");
    setPrizePool(""); setPrice(""); setRegistrationLink(""); setEditing(null);
  };

  const openAdd = () => { resetForm(); setFormOpen(true); };

  const openEdit = (ev: AdminEvent) => {
    setEditing(ev);
    setName(ev.name); setCategory(ev.category); setRegistration(ev.registration || "Open"); setDate(ev.date);
    setPlace(ev.place); setPrizePool(ev.prizePool); setPrice(ev.price || ""); setRegistrationLink(ev.registrationLink);
    setFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name, category, registration, date, place, prizePool, price, registrationLink };
    if (editing) {
      updateEvent(editing.id, data);
    } else {
      addEvent(data);
    }
    setFormOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (deleteTarget) { deleteEvent(deleteTarget.id); setDeleteTarget(null); }
  };

  const handleCountdownSave = () => {
    updateCountdown({
      isEnabled: countdownEnabled,
      eventName: countdownName,
      eventDate: countdownDate ? `${countdownDate}T09:00:00+06:00` : "",
    });
  };

  const filtered = events.filter((ev) => {
    const matchesSearch = ev.name.toLowerCase().includes(search.toLowerCase()) || ev.place.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCat === "All" || ev.category === filterCat;
    return matchesSearch && matchesCat;
  });

  const getCategoryColor = (cat: EventCategory) => {
    switch (cat) {
      case "Upcoming": return "bg-cyan-500/15 text-cyan-400 border-cyan-500/30";
      case "Past": return "bg-slate-500/15 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="space-y-8">
      {/* Countdown Control */}
      <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Radio className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Homepage Event Countdown</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCountdownEnabled(!countdownEnabled)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                countdownEnabled ? "bg-cyan-500" : "bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  countdownEnabled ? "translate-x-6.5 left-0.5" : "left-0.5"
                }`}
                style={{ transform: countdownEnabled ? "translateX(24px)" : "translateX(0)" }}
              />
            </button>
            <span className="text-sm text-slate-300">
              Countdown is <strong className={countdownEnabled ? "text-emerald-400" : "text-red-400"}>{countdownEnabled ? "ON" : "OFF"}</strong>
            </span>
          </div>

          {countdownEnabled && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Event Name">
                <input type="text" value={countdownName} onChange={(e) => setCountdownName(e.target.value)} className={inputClass} placeholder="ROBOSPARK 2026" />
              </FormField>
              <FormField label="Event Date">
                <input type="date" value={countdownDate} onChange={(e) => setCountdownDate(e.target.value)} className={inputClass} />
              </FormField>
            </div>
          )}

          <button
            onClick={handleCountdownSave}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-cyan-950 text-sm font-semibold transition-colors"
          >
            Save Countdown Settings
          </button>
        </div>
      </div>

      {/* Events Management */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events..."
                className="pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:border-cyan-400 focus:outline-none transition-colors placeholder:text-slate-500"
              />
            </div>
            <div className="flex gap-1">
              {(["All", ...EVENT_CATEGORIES] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCat(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    filterCat === cat
                      ? "bg-cyan-500 text-cyan-950"
                      : "bg-slate-800/60 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-cyan-950 text-sm font-semibold transition-colors">
            <Plus className="w-4 h-4" /> Add Event
          </button>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No events found"
            message={search || filterCat !== "All" ? "Try adjusting your filters." : "Create your first event."}
            actionLabel={!search && filterCat === "All" ? "Add Event" : undefined}
            onAction={!search && filterCat === "All" ? openAdd : undefined}
            icon={<CalendarDays className="w-8 h-8 text-slate-500" />}
          />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-800/60">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-800/60">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Event</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Registration</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Place</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Prize Pool</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Price</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {filtered.map((ev) => (
                  <tr key={ev.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-slate-200 font-medium">{ev.name}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded border text-xs ${getCategoryColor(ev.category)}`}>{ev.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded border text-xs font-mono font-semibold ${
                        ev.registration === "Closed"
                          ? "bg-red-500/15 text-red-400 border-red-500/30"
                          : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      }`}>
                        {ev.registration || "Open"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{ev.date}</td>
                    <td className="px-4 py-3 text-slate-300">{ev.place}</td>
                    <td className="px-4 py-3 text-amber-400">{ev.prizePool || "-"}</td>
                    <td className="px-4 py-3 text-emerald-400">{ev.price || "-"}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(ev)} className="p-2 rounded-lg hover:bg-slate-700/60 text-slate-400 hover:text-white transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteTarget(ev)} className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <FormModal
        isOpen={formOpen}
        title={editing ? "Edit Event" : "Add Event"}
        onClose={() => { setFormOpen(false); resetForm(); }}
        onSubmit={handleSubmit}
        submitLabel={editing ? "Update" : "Add Event"}
      >
        <FormField label="Event Name" required>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} placeholder="ROBOSPARK 2026" />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Category" required>
            <select value={category} onChange={(e) => setCategory(e.target.value as EventCategory)} className={selectClass}>
              {EVENT_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </FormField>
          <FormField label="Registration" required>
            <select value={registration} onChange={(e) => setRegistration(e.target.value as "Open" | "Closed")} className={selectClass}>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </FormField>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Date" required>
            <input type="text" value={date} onChange={(e) => setDate(e.target.value)} required className={inputClass} placeholder="November 28, 2026" />
          </FormField>
          <FormField label="Place" required>
            <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} required className={inputClass} placeholder="VU Main Campus" />
          </FormField>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Prize Pool">
            <input type="text" value={prizePool} onChange={(e) => setPrizePool(e.target.value)} className={inputClass} placeholder="BDT 50,000" />
          </FormField>
          <FormField label="Price (Entry Fee)">
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} placeholder="BDT 1,000 / Free" />
          </FormField>
        </div>
        <FormField label="Registration Link">
          <input type="url" value={registrationLink} onChange={(e) => setRegistrationLink(e.target.value)} className={inputClass} placeholder="https://..." />
        </FormField>
      </FormModal>

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Event"
        message={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
