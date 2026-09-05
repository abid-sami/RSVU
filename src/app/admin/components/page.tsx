"use client";

import React, { useState } from "react";
import { useAdminData } from "@/contexts/AdminDataContext";
import { AdminComponent } from "@/lib/adminTypes";
import { FormModal, FormField, inputClass, selectClass } from "@/components/admin/FormModal";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { EmptyState } from "@/components/admin/EmptyState";
import { Plus, Search, Edit2, Trash2, Cpu } from "lucide-react";

const CATEGORIES = ["Microcontrollers", "Sensors", "Motors & Drivers", "Power & Battery", "Wireless & IoT", "Chassis & Hardware"];

export default function AdminComponentsPage() {
  const { components, addComponent, updateComponent, deleteComponent } = useAdminData();
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminComponent | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminComponent | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const resetForm = () => {
    setName("");
    setCategory(CATEGORIES[0]);
    setImage("");
    setQuantity(1);
    setEditing(null);
  };

  const openAdd = () => {
    resetForm();
    setFormOpen(true);
  };

  const openEdit = (c: AdminComponent) => {
    setEditing(c);
    setName(c.name);
    setCategory(c.category);
    setImage(c.image);
    setQuantity(c.quantity);
    setFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateComponent(editing.id, { name, category, image, quantity });
    } else {
      addComponent({ name, category, image, quantity });
    }
    setFormOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (deleteTarget) {
      deleteComponent(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const filtered = components.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search components..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:border-cyan-400 focus:outline-none transition-colors placeholder:text-slate-500"
          />
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-cyan-950 text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Component
        </button>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No components found"
          message={search ? "Try a different search term." : "Add your first component to get started."}
          actionLabel={!search ? "Add Component" : undefined}
          onAction={!search ? openAdd : undefined}
          icon={<Cpu className="w-8 h-8 text-slate-500" />}
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-800/60">
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Component</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Qty</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Available</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {c.image && (
                        <img src={c.image} alt={c.name} className="w-10 h-10 rounded-lg object-cover bg-slate-800" />
                      )}
                      <span className="text-slate-200 font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs">{c.category}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{c.quantity}</td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${c.availableQuantity > 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {c.availableQuantity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(c)}
                        className="p-2 rounded-lg hover:bg-slate-700/60 text-slate-400 hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(c)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      <FormModal
        isOpen={formOpen}
        title={editing ? "Edit Component" : "Add Component"}
        onClose={() => { setFormOpen(false); resetForm(); }}
        onSubmit={handleSubmit}
        submitLabel={editing ? "Update" : "Add Component"}
      >
        <FormField label="Component Name" required>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} placeholder="e.g. ESP32-S3 DevBoard" />
        </FormField>
        <FormField label="Category" required>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
            {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </FormField>
        <ImageUploadField
          label="Component Image"
          value={image}
          onChange={setImage}
          helpText="Upload an image from your device or provide a link."
        />
        <FormField label="Quantity" required>
          <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} min={1} required className={inputClass} />
        </FormField>
      </FormModal>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Component"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
