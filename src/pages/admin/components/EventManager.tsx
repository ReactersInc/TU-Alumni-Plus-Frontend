import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  registrationLink: string;
  imageBase64?: string;
}

const EventManager = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventRegistrationLink, setEventRegistrationLink] = useState("");

  const [eventImage, setEventImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);

  /* ---------------- Fetch Events ---------------- */

  const fetchEvents = async () => {
    try {
      const res = await apiFetch("/upcoming");
      const data = await res.json();

      setEvents(data.events || []);
    } catch {
      toast.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /* ---------------- Image Upload ---------------- */

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setEventImage(file);

    const reader = new FileReader();

    reader.onloadend = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
    };

    reader.readAsDataURL(file);
  };

  /* ---------------- Submit Event ---------------- */

  const handleSubmit = async () => {
    if (
      !eventTitle ||
      !eventDescription ||
      !eventDate ||
      !eventTime ||
      !eventVenue ||
      !eventRegistrationLink
    ) {
      toast.warning("All fields are required");
      return;
    }

    const sendEvent = async (imageBase64?: string | null) => {
      try {
        const payload = {
          title: eventTitle,
          description: eventDescription,
          date: eventDate,
          time: eventTime,
          venue: eventVenue,
          registrationLink: eventRegistrationLink,
          imageBase64,
        };

        let res;

        if (editingId) {
          res = await apiFetch(`/upcoming/${editingId}`, {
            method: "PUT",
            body: JSON.stringify(payload),
          });
        } else {
          res = await apiFetch("/upcoming", {
            method: "POST",
            body: JSON.stringify(payload),
          });
        }

        if (res.ok) {
          toast.success(
            editingId ? "Event updated successfully" : "Event added successfully"
          );

          resetForm();
          fetchEvents();
        } else {
          toast.error("Failed to save event");
        }
      } catch {
        toast.error("Server error");
      }
    };

    if (eventImage) {
      const reader = new FileReader();

      reader.onloadend = (e) => {
        const result = e.target?.result as string;
        sendEvent(result);
      };

      reader.readAsDataURL(eventImage);
    } else {
      sendEvent(null);
    }
  };

  /* ---------------- Reset Form ---------------- */

  const resetForm = () => {
    setEventTitle("");
    setEventDescription("");
    setEventDate("");
    setEventTime("");
    setEventVenue("");
    setEventRegistrationLink("");
    setEventImage(null);
    setImagePreview(null);
    setEditingId(null);
  };

  /* ---------------- Delete Event ---------------- */

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;

    try {
      const res = await apiFetch(`/upcoming/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Event deleted");
        fetchEvents();
      } else {
        toast.error("Failed to delete event");
      }
    } catch {
      toast.error("Server error while deleting event");
    }
  };

  /* ---------------- Edit Event ---------------- */

  const handleEdit = (event: Event) => {
    setEventTitle(event.title);
    setEventDescription(event.description);
    setEventDate(event.date);
    setEventTime(event.time);
    setEventVenue(event.venue);
    setEventRegistrationLink(event.registrationLink);

    setImagePreview(event.imageBase64 || null);
    setEditingId(event._id);
  };

  /* ---------------- UI ---------------- */

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Manage Events</h2>

      {/* Event Form */}

      <div className="grid gap-3 mb-6">
        <input
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Event title"
          className="border rounded px-3 py-2"
        />

        <textarea
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          placeholder="Event description"
          className="border rounded px-3 py-2"
        />

        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="border rounded px-3 py-2"
        />

        <input
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          className="border rounded px-3 py-2"
        />

        <input
          value={eventVenue}
          onChange={(e) => setEventVenue(e.target.value)}
          placeholder="Venue"
          className="border rounded px-3 py-2"
        />

        <input
          value={eventRegistrationLink}
          onChange={(e) => setEventRegistrationLink(e.target.value)}
          placeholder="Registration link"
          className="border rounded px-3 py-2"
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded"
          />
        )}

        <Button onClick={handleSubmit}>
          {editingId ? "Update Event" : "Add Event"}
        </Button>
      </div>

      {/* Event List */}

      <div className="grid md:grid-cols-2 gap-4">
        {events.map((event) => (
          <Card key={event._id} className="p-4">
            <h3 className="font-semibold text-lg">{event.title}</h3>

            <p className="text-sm text-gray-600">{event.description}</p>

            <p className="text-sm">
              {event.date} • {event.time}
            </p>

            <p className="text-sm">{event.venue}</p>

            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm underline"
            >
              Registration Link
            </a>

            {event.imageBase64 && (
              <img
                src={event.imageBase64}
                className="w-full h-40 object-cover rounded mt-2"
              />
            )}

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleEdit(event)}
                className="text-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(event._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default EventManager;