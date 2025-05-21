"use client";

import { useState } from "react";

export default function CategoryForm({
  onSubmit,
  pending,
  initialValues = { name: "" },
}: {
  onSubmit: (formData: FormData) => void;
  pending: boolean;
  initialValues?: { name: string };
}) {
  const [name, setName] = useState(initialValues.name);

  return (
    <form
      action={(formData) => {
        onSubmit(formData);
      }}
      className="max-w-2xl mx-auto p-4 space-y-6"
    >
      <h1 className="text-2xl font-bold mb-6">
        {initialValues.name ? "Edit Category" : "Create New Category"}
      </h1>

      <div>
        <label htmlFor="name" className="block text-lg mb-2">
          Category Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 border rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        disabled={pending}
      >
        {pending
          ? initialValues.name
            ? "Saving..."
            : "Creating..."
          : initialValues.name
          ? "Save Changes"
          : "Create Category"}
      </button>
    </form>
  );
}
