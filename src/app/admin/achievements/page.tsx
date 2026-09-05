"use client";

import React, { useState } from "react";
import { useAdminData } from "@/contexts/AdminDataContext";
import { AdminAchievement } from "@/lib/adminTypes";
import { FormModal, FormField, inputClass } from "@/components/admin/FormModal";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { EmptyState } from "@/components/admin/EmptyState";
import { Plus, Search, Edit2, Trash2, Trophy } from "lucide-react";

export default function AdminAchievementsPage() {
  const { achievements, addAchievement, updateAchievement, deleteAchievement } = useAdminData();
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminAchievement | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminAchievement | null>(null);

  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [tournamentName, setTournamentName] = useState("");
  const [details, setDetails] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamMembersStr, setTeamMembersStr] = useState("");
  const [photo, setPhoto] = useState("");

  const resetForm = () => {
    setLocation(""); setCategory(""); setTournamentName(""); setDetails("");
    setTeamName(""); setTeamMembersStr(""); setPhoto(""); setEditing(null);
  };

  const openAdd = () => { resetForm(); setFormOpen(true); };

  const openEdit = (a: AdminAchievement) => {
    setEditing(a); setLocation(a.location); setCategory(a.category);
    setTournamentName(a.tournamentName); setDetails(a.details);
    setTeamName(a.teamName); setTeamMembersStr(a.teamMembers.join(", "));
    setPhoto(a.photo); setFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      location, category, tournamentName, details, teamName,
      teamMembers: teamMembersStr.split(",").map((s) => s.trim()).filter(Boolean),
      photo,
    };
    if (editing) {
      updateAchievement(editing.id, data);
    } else {
      addAchievement(data);
    }
    setFormOpen(false); resetForm();
  };

  const handleDelete = () => { if (deleteTarget) { deleteAchievement(deleteTarget.id); setDeleteTarget(null); } };

  const filtered = achievements.filter((a) =>
    a.tournamentName.toLowerCase().includes(search.toLowerCase()) ||
    a.teamName.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search achievements..." className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:border-cyan-400 focus:outline-none transition-colors placeholder:text-slate-500" />
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-cyan-950 text-sm font-semibold transition-colors">
          <Plus className="w-4 h-4" /> Add Achievement
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No achievements found" message={search ? "Try a different search." : "Record your first achievement."} actionLabel={!search ? "Add Achievement" : undefined} onAction={!search ? openAdd : undefined} icon={<Trophy className="w-8 h-8 text-slate-500" />} />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-800/60">
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Tournament</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Location</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Team</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Members</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {a.photo && <img src={a.photo} alt={a.tournamentName} className="w-10 h-10 rounded-lg object-cover bg-slate-800" />}
                      <span className="text-slate-200 font-medium">{a.tournamentName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 text-xs">{a.category}</span></td>
                  <td className="px-4 py-3 text-slate-300">{a.location}</td>
                  <td className="px-4 py-3 text-slate-300">{a.teamName}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{a.teamMembers.join(", ")}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(a)} className="p-2 rounded-lg hover:bg-slate-700/60 text-slate-400 hover:text-white transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteTarget(a)} className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <FormModal isOpen={formOpen} title={editing ? "Edit Achievement" : "Add Achievement"} onClose={() => { setFormOpen(false); resetForm(); }} onSubmit={handleSubmit} submitLabel={editing ? "Update" : "Add Achievement"} maxWidth="max-w-xl">
        <FormField label="Tournament Name" required><input type="text" value={tournamentName} onChange={(e) => setTournamentName(e.target.value)} required className={inputClass} placeholder="e.g. DUET TechFest Championship" /></FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Category" required><input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className={inputClass} placeholder="e.g. National Championship" /></FormField>
          <FormField label="Location" required><input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className={inputClass} placeholder="e.g. Dhaka, Bangladesh" /></FormField>
        </div>
        <FormField label="Details" required>
          <textarea value={details} onChange={(e) => setDetails(e.target.value)} required rows={3} className={inputClass} placeholder="Achievement details and highlights..." />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Team Name" required><input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} required className={inputClass} placeholder="e.g. Varendra Raptor" /></FormField>
          <FormField label="Team Members"><input type="text" value={teamMembersStr} onChange={(e) => setTeamMembersStr(e.target.value)} className={inputClass} placeholder="Comma separated names" /></FormField>
        </div>
        <ImageUploadField
          label="Achievement Photo / Trophy"
          value={photo}
          onChange={setPhoto}
          helpText="Upload a photo of the trophy, certificate, or ceremony from your device."
        />
      </FormModal>

      <ConfirmModal isOpen={!!deleteTarget} title="Delete Achievement" message={`Delete "${deleteTarget?.tournamentName}"?`} confirmLabel="Delete" variant="danger" onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </div>
  );
}
