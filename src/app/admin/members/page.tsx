"use client";

import React, { useState } from "react";
import { useAdminData } from "@/contexts/AdminDataContext";
import { AdminMember } from "@/lib/adminTypes";
import { FormModal, FormField, inputClass, selectClass } from "@/components/admin/FormModal";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { EmptyState } from "@/components/admin/EmptyState";
import { Plus, Search, Edit2, Trash2, Users, GraduationCap } from "lucide-react";

const BATCH_OPTIONS = [
  "31st Batch",
  "32nd Batch",
  "33rd Batch",
  "34th Batch",
  "35th Batch",
  "36th Batch",
  "37th Batch",
  "38th Batch",
  "39th Batch",
  "40th Batch",
];

export default function AdminMembersPage() {
  const { members, addMember, updateMember, deleteMember } = useAdminData();
  const [activeTab, setActiveTab] = useState<"student" | "faculty">("student");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<AdminMember | null>(null);

  // Student Member Form State
  const [studentFormOpen, setStudentFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<AdminMember | null>(null);
  const [studentName, setStudentName] = useState("");
  const [studentDesignation, setStudentDesignation] = useState("");
  const [studentDepartment, setStudentDepartment] = useState("Department of CSE");
  const [studentBatch, setStudentBatch] = useState("31st Batch");
  const [studentPhoto, setStudentPhoto] = useState("");

  // Faculty Advisor Form State
  const [facultyFormOpen, setFacultyFormOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<AdminMember | null>(null);
  const [facultyName, setFacultyName] = useState("");
  const [facultyRole, setFacultyRole] = useState("");
  const [facultyDesignation, setFacultyDesignation] = useState("");
  const [facultyDepartment, setFacultyDepartment] = useState("Department of Computer Science & Engineering");
  const [facultyPhoto, setFacultyPhoto] = useState("");

  // Student Form Handlers
  const resetStudentForm = () => {
    setStudentName("");
    setStudentDesignation("");
    setStudentDepartment("Department of CSE");
    setStudentBatch("31st Batch");
    setStudentPhoto("");
    setEditingStudent(null);
  };

  const openAddStudent = () => {
    resetStudentForm();
    setStudentFormOpen(true);
  };

  const openEditStudent = (m: AdminMember) => {
    setEditingStudent(m);
    setStudentName(m.name);
    setStudentDesignation(m.designation);
    setStudentDepartment(m.department || "Department of CSE");
    setStudentBatch(m.batch || "31st Batch");
    setStudentPhoto(m.photo);
    setStudentFormOpen(true);
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      updateMember(editingStudent.id, {
        name: studentName,
        designation: studentDesignation,
        department: studentDepartment,
        batch: studentBatch,
        memberType: "student",
        photo: studentPhoto,
      });
    } else {
      addMember({
        name: studentName,
        designation: studentDesignation,
        department: studentDepartment,
        batch: studentBatch,
        memberType: "student",
        photo: studentPhoto,
      });
    }
    setStudentFormOpen(false);
    resetStudentForm();
  };

  // Faculty Form Handlers
  const resetFacultyForm = () => {
    setFacultyName("");
    setFacultyRole("");
    setFacultyDesignation("");
    setFacultyDepartment("Department of Computer Science & Engineering");
    setFacultyPhoto("");
    setEditingFaculty(null);
  };

  const openAddFaculty = () => {
    resetFacultyForm();
    setFacultyFormOpen(true);
  };

  const openEditFaculty = (m: AdminMember) => {
    setEditingFaculty(m);
    setFacultyName(m.name);
    setFacultyRole(m.role || "");
    setFacultyDesignation(m.designation);
    setFacultyDepartment(m.department || "Department of Computer Science & Engineering");
    setFacultyPhoto(m.photo);
    setFacultyFormOpen(true);
  };

  const handleFacultySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaculty) {
      updateMember(editingFaculty.id, {
        name: facultyName,
        role: facultyRole,
        designation: facultyDesignation,
        department: facultyDepartment,
        memberType: "faculty",
        photo: facultyPhoto,
      });
    } else {
      addMember({
        name: facultyName,
        role: facultyRole,
        designation: facultyDesignation,
        department: facultyDepartment,
        memberType: "faculty",
        photo: facultyPhoto,
      });
    }
    setFacultyFormOpen(false);
    resetFacultyForm();
  };

  const handleDelete = () => {
    if (deleteTarget) {
      deleteMember(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const studentMembers = members.filter((m) => m.memberType !== "faculty");
  const facultyMembers = members.filter((m) => m.memberType === "faculty");

  const filteredStudents = studentMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.designation.toLowerCase().includes(search.toLowerCase()) ||
      (m.batch && m.batch.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredFaculty = facultyMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      (m.role && m.role.toLowerCase().includes(search.toLowerCase())) ||
      m.designation.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Category Tabs: Executive Members vs Faculty Advisors */}
      <div className="flex gap-3 border-b border-slate-800 pb-4">
        <button
          onClick={() => {
            setActiveTab("student");
            setSearch("");
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
            activeTab === "student"
              ? "bg-cyan-500 text-cyan-950 shadow-[0_0_15px_rgba(0,240,255,0.35)]"
              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Executive Members ({studentMembers.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("faculty");
            setSearch("");
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
            activeTab === "faculty"
              ? "bg-cyan-500 text-cyan-950 shadow-[0_0_15px_rgba(0,240,255,0.35)]"
              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Faculty Advisors ({facultyMembers.length})</span>
        </button>
      </div>

      {/* Action Header: Search + Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={activeTab === "student" ? "Search executive members..." : "Search faculty advisors..."}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:border-cyan-400 focus:outline-none transition-colors placeholder:text-slate-500"
          />
        </div>

        {activeTab === "student" ? (
          <button
            onClick={openAddStudent}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-cyan-950 text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Member
          </button>
        ) : (
          <button
            onClick={openAddFaculty}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-cyan-950 text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Faculty
          </button>
        )}
      </div>

      {/* Tab 1: Executive Members Grid */}
      {activeTab === "student" && (
        <>
          {filteredStudents.length === 0 ? (
            <EmptyState
              title="No executive members found"
              message={search ? "Try a different search." : "Add your first executive member."}
              actionLabel={!search ? "Add Member" : undefined}
              onAction={!search ? openAddStudent : undefined}
              icon={<Users className="w-8 h-8 text-slate-500" />}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredStudents.map((m) => (
                <div
                  key={m.id}
                  className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-4 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3">
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-14 aspect-[3/4] rounded-lg object-cover object-top bg-slate-800 shrink-0 border border-slate-700/50"
                        style={{ aspectRatio: "3 / 4" }}
                      />
                    ) : (
                      <div
                        className="w-14 aspect-[3/4] rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700/50"
                        style={{ aspectRatio: "3 / 4" }}
                      >
                        <Users className="w-6 h-6 text-slate-600" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">{m.name}</h4>
                      <p className="text-xs text-cyan-400 truncate">{m.designation}</p>
                      <p className="text-xs text-slate-400 mt-1 truncate">
                        {m.department || "Department of CSE"} • {m.batch || m.education || "31st Batch"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-end gap-1">
                    <button
                      onClick={() => openEditStudent(m)}
                      className="p-2 rounded-lg hover:bg-slate-700/60 text-slate-400 hover:text-white transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(m)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Tab 2: Faculty Advisors Grid */}
      {activeTab === "faculty" && (
        <>
          {filteredFaculty.length === 0 ? (
            <EmptyState
              title="No faculty advisors found"
              message={search ? "Try a different search." : "Add your first faculty advisor."}
              actionLabel={!search ? "Add Faculty" : undefined}
              onAction={!search ? openAddFaculty : undefined}
              icon={<GraduationCap className="w-8 h-8 text-slate-500" />}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFaculty.map((m) => (
                <div
                  key={m.id}
                  className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3">
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-14 aspect-[3/4] rounded-lg object-cover object-top bg-slate-800 shrink-0 border border-cyan-500/30"
                        style={{ aspectRatio: "3 / 4" }}
                      />
                    ) : (
                      <div
                        className="w-14 aspect-[3/4] rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700/50"
                        style={{ aspectRatio: "3 / 4" }}
                      >
                        <GraduationCap className="w-6 h-6 text-cyan-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">{m.name}</h4>
                      <div className="inline-block px-2 py-0.5 mt-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 truncate">
                        {m.role || "Faculty Advisor"}
                      </div>
                      <p className="text-xs text-slate-300 mt-1 truncate">{m.designation}</p>
                      <p className="text-[11px] text-slate-400 truncate">{m.department}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-end gap-1">
                    <button
                      onClick={() => openEditFaculty(m)}
                      className="p-2 rounded-lg hover:bg-slate-700/60 text-slate-400 hover:text-white transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(m)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Add / Edit Student Member Modal */}
      <FormModal
        isOpen={studentFormOpen}
        title={editingStudent ? "Edit Executive Member" : "Add Executive Member"}
        onClose={() => {
          setStudentFormOpen(false);
          resetStudentForm();
        }}
        onSubmit={handleStudentSubmit}
        submitLabel={editingStudent ? "Update Member" : "Add Member"}
      >
        <FormField label="Name" required>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
            className={inputClass}
            placeholder="Full name"
          />
        </FormField>
        <FormField label="Designation" required>
          <input
            type="text"
            value={studentDesignation}
            onChange={(e) => setStudentDesignation(e.target.value)}
            required
            className={inputClass}
            placeholder="e.g. President, Technical Lead"
          />
        </FormField>
        <FormField label="Department" required>
          <select
            value={studentDepartment}
            onChange={(e) => setStudentDepartment(e.target.value)}
            required
            className={selectClass}
          >
            <option value="Department of CSE">Department of CSE</option>
          </select>
        </FormField>
        <FormField label="Batch" required>
          <select
            value={studentBatch}
            onChange={(e) => setStudentBatch(e.target.value)}
            required
            className={selectClass}
          >
            {BATCH_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </FormField>
        <ImageUploadField
          label="Member Photo"
          value={studentPhoto}
          onChange={setStudentPhoto}
          aspectRatio="3:4"
          helpText="Upload photo from your device or provide a link."
        />
      </FormModal>

      {/* Add / Edit Faculty Advisor Modal */}
      <FormModal
        isOpen={facultyFormOpen}
        title={editingFaculty ? "Edit Faculty Advisor" : "Add Faculty Advisor"}
        onClose={() => {
          setFacultyFormOpen(false);
          resetFacultyForm();
        }}
        onSubmit={handleFacultySubmit}
        submitLabel={editingFaculty ? "Update Faculty" : "Add Faculty"}
      >
        <FormField label="Name" required>
          <input
            type="text"
            value={facultyName}
            onChange={(e) => setFacultyName(e.target.value)}
            required
            className={inputClass}
            placeholder="e.g. Prof. Dr. Md. Khademul Islam"
          />
        </FormField>
        <FormField label="Role" required>
          <input
            type="text"
            value={facultyRole}
            onChange={(e) => setFacultyRole(e.target.value)}
            required
            className={inputClass}
            placeholder="e.g. Chief Faculty Advisor, Technical Mentor"
          />
        </FormField>
        <FormField label="Designation" required>
          <input
            type="text"
            value={facultyDesignation}
            onChange={(e) => setFacultyDesignation(e.target.value)}
            required
            className={inputClass}
            placeholder="e.g. Professor & Head, Assistant Professor"
          />
        </FormField>
        <FormField label="Department" required>
          <input
            type="text"
            value={facultyDepartment}
            onChange={(e) => setFacultyDepartment(e.target.value)}
            required
            className={inputClass}
            placeholder="e.g. Department of Computer Science & Engineering"
          />
        </FormField>
        <ImageUploadField
          label="Faculty Photo"
          value={facultyPhoto}
          onChange={setFacultyPhoto}
          aspectRatio="3:4"
          helpText="Upload photo from your device or provide a link."
        />
      </FormModal>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title={deleteTarget?.memberType === "faculty" ? "Delete Faculty Advisor" : "Delete Member"}
        message={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
