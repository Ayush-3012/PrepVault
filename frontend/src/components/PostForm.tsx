import { useEffect, useState } from "react";
import type { Post } from "../pages/ManagePost";

interface PostFormProps {
  initialValues?: Post;
  onSubmit: (data: Post) => void;
}

const PostForm = ({ initialValues, onSubmit }: PostFormProps) => {
  const [title, setTitle] = useState<string>(initialValues?.title || "");
  const [content, setContent] = useState<string>(initialValues?.content || "");
  const [file, setFile] = useState<File | string | null>(
    initialValues?.file || null
  );
  const [subject, setSubject] = useState<string>(initialValues?.subject || "");
  const [course, setCourse] = useState<string>(initialValues?.course || "");

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title || "");
      setContent(initialValues.content || "");
      setFile(initialValues.file || null);
      setSubject(initialValues.subject || "");
      setCourse(initialValues.course || "");
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: Post = {
      title,
      content,
      file,
      subject,
      course,
    };
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded shadow-sm bg-white"
    >
      <h2 className="text-xl font-semibold mb-2">
        {initialValues ? "Edit Post" : "Create Post"}
      </h2>

      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-1 border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mt-1 border px-3 py-2 rounded"
          rows={6}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Upload File</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const selected = e.target.files?.[0];
            if (selected) setFile(selected);
          }}
          className="w-full mt-1 border px-3 py-2 rounded"
        />
        {initialValues?.fileUrl && (
          <p className="mt-2 text-blue-600 underline">
            Existing file will remain unless replaced
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full mt-1 border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Course</label>
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full mt-1 border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-600 hover:scale-x-110 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {initialValues ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
