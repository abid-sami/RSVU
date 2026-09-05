"use client";

import React, { useState } from "react";
import { useAdminData } from "@/contexts/AdminDataContext";
import { AdminGalleryImage } from "@/lib/adminTypes";
import { FormModal, FormField, inputClass, selectClass } from "@/components/admin/FormModal";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { EmptyState } from "@/components/admin/EmptyState";
import { Plus, Search, Edit2, Trash2, ImageIcon, Tag } from "lucide-react";

export default function AdminGalleryPage() {
  const {
    galleryImages, galleryCategories, addGalleryImage, updateGalleryImage,
    deleteGalleryImage, addGalleryCategory, updateGalleryCategory, deleteGalleryCategory,
  } = useAdminData();

  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminGalleryImage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminGalleryImage | null>(null);
  const [catFormOpen, setCatFormOpen] = useState(false);
  const [catName, setCatName] = useState("");
  const [editingCat, setEditingCat] = useState<{ id: string; name: string } | null>(null);
  const [deleteCatTarget, setDeleteCatTarget] = useState<{ id: string; name: string } | null>(null);

  // Image form state
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  const resetForm = () => {
    setTitle(""); setCategoryId(""); setImageUrl(""); setCaption(""); setEditing(null);
  };

  const openAdd = () => { resetForm(); setFormOpen(true); };

  const openEdit = (img: AdminGalleryImage) => {
    setEditing(img); setTitle(img.title); setCategoryId(img.categoryId);
    setImageUrl(img.image); setCaption(img.caption);
    setFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = galleryCategories.find((c) => c.id === categoryId);
    const data = {
      title,
      categoryId,
      categoryName: cat?.name || "Uncategorized",
      image: imageUrl,
      caption,
    };
    if (editing) {
      updateGalleryImage(editing.id, data);
    } else {
      addGalleryImage(data);
    }
    setFormOpen(false); resetForm();
  };

  const handleDelete = () => { if (deleteTarget) { deleteGalleryImage(deleteTarget.id); setDeleteTarget(null); } };

  // Category handlers
  const handleCatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCat) {
      updateGalleryCategory(editingCat.id, catName);
    } else {
      addGalleryCategory(catName);
    }
    setCatFormOpen(false); setCatName(""); setEditingCat(null);
  };

  const handleCatDelete = () => {
    if (deleteCatTarget) {
      deleteGalleryCategory(deleteCatTarget.id);
      setDeleteCatTarget(null);
    }
  };

  const filtered = galleryImages.filter((img) => {
    const matchesSearch = img.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCat === "All" || img.categoryId === filterCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8">
      {/* Category Management */}
      <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Gallery Categories</h3>
          </div>
          <button
            onClick={() => { setCatName(""); setEditingCat(null); setCatFormOpen(true); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25 text-xs font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Category
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {galleryCategories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 group">
              <span className="text-sm text-slate-300">{cat.name}</span>
              <button
                onClick={() => { setEditingCat(cat); setCatName(cat.name); setCatFormOpen(true); }}
                className="text-slate-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
              >
                <Edit2 className="w-3 h-3" />
              </button>
              <button
                onClick={() => setDeleteCatTarget(cat)}
                className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
          {galleryCategories.length === 0 && (
            <p className="text-xs text-slate-500">No categories yet.</p>
          )}
        </div>
      </div>

      {/* Image Management */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search images..." className="pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:border-cyan-400 focus:outline-none transition-colors placeholder:text-slate-500" />
            </div>
            <div className="flex gap-1 flex-wrap">
              <button onClick={() => setFilterCat("All")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterCat === "All" ? "bg-cyan-500 text-cyan-950" : "bg-slate-800/60 text-slate-400 hover:text-white"}`}>All</button>
              {galleryCategories.map((cat) => (
                <button key={cat.id} onClick={() => setFilterCat(cat.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterCat === cat.id ? "bg-cyan-500 text-cyan-950" : "bg-slate-800/60 text-slate-400 hover:text-white"}`}>{cat.name}</button>
              ))}
            </div>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-cyan-950 text-sm font-semibold transition-colors shrink-0">
            <Plus className="w-4 h-4" /> Add Image
          </button>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No images found" message={search || filterCat !== "All" ? "Try different filters." : "Upload your first gallery image."} actionLabel={!search && filterCat === "All" ? "Add Image" : undefined} onAction={!search && filterCat === "All" ? openAdd : undefined} icon={<ImageIcon className="w-8 h-8 text-slate-500" />} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((img) => (
              <div key={img.id} className="bg-slate-900/30 border border-slate-800/60 rounded-xl overflow-hidden hover:border-slate-700 transition-all group">
                <div className="relative h-40 bg-slate-800">
                  <img src={img.image} alt={img.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-slate-300 font-mono">{img.categoryName}</span>
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-medium text-white truncate">{img.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{img.caption}</p>
                  <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(img)} className="p-1.5 rounded hover:bg-slate-700/60 text-slate-400 hover:text-white transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeleteTarget(img)} className="p-1.5 rounded hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Image Modal */}
      <FormModal isOpen={formOpen} title={editing ? "Edit Image" : "Add Gallery Image"} onClose={() => { setFormOpen(false); resetForm(); }} onSubmit={handleSubmit} submitLabel={editing ? "Update" : "Add Image"}>
        <FormField label="Title" required><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className={inputClass} placeholder="Image title" /></FormField>
        <FormField label="Category" required>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className={selectClass}>
            <option value="">Select category...</option>
            {galleryCategories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </FormField>

        <ImageUploadField
          label="Gallery Image"
          value={imageUrl}
          onChange={setImageUrl}
          required
          helpText="Upload an image from your device or provide an image link."
        />

        <FormField label="Caption"><input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} className={inputClass} placeholder="Short description..." /></FormField>
      </FormModal>

      {/* Category Add/Edit Modal */}
      <FormModal isOpen={catFormOpen} title={editingCat ? "Edit Category" : "Add Category"} onClose={() => { setCatFormOpen(false); setEditingCat(null); setCatName(""); }} onSubmit={handleCatSubmit} submitLabel={editingCat ? "Update" : "Add"}>
        <FormField label="Category Name" required><input type="text" value={catName} onChange={(e) => setCatName(e.target.value)} required className={inputClass} placeholder="e.g. Competitions" /></FormField>
      </FormModal>

      <ConfirmModal isOpen={!!deleteTarget} title="Delete Image" message={`Delete "${deleteTarget?.title}"?`} confirmLabel="Delete" variant="danger" onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      <ConfirmModal isOpen={!!deleteCatTarget} title="Delete Category" message={`Delete category "${deleteCatTarget?.name}"? Images in this category won't be deleted.`} confirmLabel="Delete" variant="danger" onConfirm={handleCatDelete} onCancel={() => setDeleteCatTarget(null)} />
    </div>
  );
}
