"use client";

import React, { useState } from "react";
import { useAdminData } from "@/contexts/AdminDataContext";
import { AdminMember } from "@/lib/adminTypes";
import { FormModal, FormField, inputClass } from "@/components/admin/FormModal";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { EmptyState } from "@/components/admin/EmptyState";
import { Plus, Search, Edit2, Trash2, Users } from "lucide-react";

export default function AdminMembersPage() {
  const { members, addMember, updateMember, deleteMember } = useAdminData();
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminMember | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminMember | null>(null);

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");

  const resetForm = () => { setName(""); setDesignation(""); setEducation(""); setPhoto(""); setEditing(null); };
  const openAdd = () => { resetForm(); setFormOpen(true); };

  const openEdit = (m: AdminMember) => {
    setEditing(m); setName(m.name); setDesignation(m.designation);
    setEducation(m.education); setPhoto(m.photo); setFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateMember(editing.id, { name, designation, education, photo });
    } else {
      addMember({ name, designation, education, photo });
    }
    setFormOpen(false); resetForm();
  };

  const handleDelete = () => { if (deleteTarget) { deleteMember(deleteTarget.id); setDeleteTarget(null); } };

  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search members..." className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:border-cyan-400 focus:outline-none transition-colors placeholder:text-slate-500" />
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-cyan-950 text-sm font-semibold transition-colors">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No members found" message={search ? "Try a different search." : "Add your first member."} actionLabel={!search ? "Add Member" : undefined} onAction={!search ? openAdd : undefined} icon={<Users className="w-8 h-8 text-slate-500" />} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((m) => (
            <div key={m.id} className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-4 hover:border-slate-700 transition-all">
              <div className="flex items-start gap-3">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className="w-14 h-14 rounded-lg object-cover bg-slate-800 shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-slate-600" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate">{m.name}</h4>
                  <p className="text-xs text-cyan-400 truncate">{m.designation}</p>
                  <p className="text-xs text-slate-400 mt-1 truncate">{m.education}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-end gap-1">
                <button onClick={() => openEdit(m)} className="p-2 rounded-lg hover:bg-slate-700/60 text-slate-400 hover:text-white transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                <button onClick={() => setDeleteTarget(m)} className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <FormModal isOpen={formOpen} title={editing ? "Edit Member" : "Add Member"} onClose={() => { setFormOpen(false); resetForm(); }} onSubmit={handleSubmit} submitLabel={editing ? "Update" : "Add Member"}>
        <FormField label="Name" required><input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} placeholder="Full name" /></FormField>
        <FormField label="Designation" required><input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} required className={inputClass} placeholder="e.g. President, Technical Lead" /></FormField>
        <FormField label="Education" required><input type="text" value={education} onChange={(e) => setEducation(e.target.value)} required className={inputClass} placeholder="e.g. Dept. of CSE, 18th Batch" /></FormField>
        <ImageUploadField
          label="Member Photo"
          value={photo}
          onChange={setPhoto}
          helpText="Upload a portrait photo from your device or provide a link."
        />
      </FormModal>

      <ConfirmModal isOpen={!!deleteTarget} title="Delete Member" message={`Are you sure you want to delete "${deleteTarget?.name}"?`} confirmLabel="Delete" variant="danger" onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </div>
  );
}
