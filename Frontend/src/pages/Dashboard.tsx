import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Trash2, Plus, StickyNote } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';

interface Note {
  _id: string;
  title: string;
  content: string;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteData, setNoteData] = useState({ title: '', content: '' });
  const [showForm, setShowForm] = useState(false);

  // 🔃 Get notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosInstance.get('/');
        setNotes(res.data); // Assuming: [{ _id, title, content }]
      } catch (err) {
        alert('Failed to fetch notes');
      }
    };

    fetchNotes();
  }, []);

  // 🔁 Input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  };

  // ✅ Create Note
  const handleCreateNote = async () => {
    if (!noteData.title.trim()) return;

    try {
      const res = await axiosInstance.post('/', noteData);
      setNotes([...notes, res.data]); // append new note
      setNoteData({ title: '', content: '' });
      setShowForm(false);
    } catch (err) {
      alert('Failed to create note');
    }
  };

  // ❌ Delete Note
  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/${id}`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      alert('Failed to delete note');
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9fb] px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-10 space-y-6 transition-all">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="bg-yellow-400 p-2 rounded-full shadow-md">
              <StickyNote className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-gray-600 bg-gray-100 px-4 py-3 rounded-xl cursor-pointer"
          >
            <LogOut size={18} />
            <span className="text-md font-medium">SignOut</span>
          </button>
        </div>

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl px-6 py-8 shadow">
          <h2 className="text-2xl font-semibold mb-2">Welcome, {user?.name || 'User'}!</h2>
          <p className="text-sm opacity-90">Email: {user?.email || 'user@example.com'}</p>
        </div>

        {/* Create Note Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 cursor-pointer rounded-2xl font-medium flex justify-center items-center gap-2"
        >
          <Plus size={18} />
          {showForm ? 'Close Form' : 'Create Note'}
        </button>

        {/* Note Form */}
        {showForm && (
          <div className="bg-gray-50 rounded-2xl p-6 shadow-inner border border-gray-200">
            <input
              type="text"
              name="title"
              placeholder="Note Title"
              value={noteData.title}
              onChange={handleChange}
              className="w-full mb-3 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-300 outline-none"
            />
            <textarea
              name="content"
              placeholder="Note Content"
              value={noteData.content}
              onChange={handleChange}
              className="w-full mb-4 border border-gray-300 rounded-lg p-3 h-28 resize-none focus:ring-2 focus:ring-indigo-300 outline-none"
            />
            <button
              onClick={handleCreateNote}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium px-5 py-2 rounded-lg cursor-pointer hover:shadow"
            >
              Save Note
            </button>
          </div>
        )}

        {/* Notes Section */}
        <div className="rounded-2xl p-6 bg-white border border-gray-200 shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Notes</h3>
          {notes.length === 0 ? (
            <p className="text-sm text-gray-500">No notes yet.</p>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="flex flex-col sm:flex-row justify-between sm:items-center bg-gray-50 rounded-xl px-4 py-3 shadow-sm hover:shadow transition"
                >
                  <div className="mb-2 sm:mb-0">
                    <h4 className="text-md font-semibold text-gray-800">{note.title}</h4>
                    <p className="text-sm text-gray-600">{note.content}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-gray-400 hover:text-red-500 self-end sm:self-auto cursor-pointer"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
