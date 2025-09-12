"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AuthGuard from "@/components/AuthGuard";
import Header from "@/components/Header";

const EventsPage = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    event_date: '',
    address: '',
    city: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/events`);
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newEvent,
          organizer_id: session.user.backendId
        }),
      });

      if (response.ok) {
        setNewEvent({ title: '', description: '', event_date: '', address: '', city: '' });
        setShowCreateForm(false);
        fetchEvents();
        alert('Event created successfully!');
      } else {
        alert('Failed to create event');
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert('Error creating event');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/events/${eventId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchEvents();
          alert('Event deleted successfully!');
        } else {
          alert('Failed to delete event');
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        alert('Error deleting event');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="flex flex-col">
        <Header name="My Events" />
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Event Management
            </h1>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              {showCreateForm ? 'Cancel' : 'Create Event'}
            </button>
          </div>

          {showCreateForm && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Create New Event
              </h2>
              <form onSubmit={handleCreateEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Event Title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
                <input
                  type="datetime-local"
                  value={newEvent.event_date}
                  onChange={(e) => setNewEvent({...newEvent, event_date: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={newEvent.city}
                  onChange={(e) => setNewEvent({...newEvent, city: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={newEvent.address}
                  onChange={(e) => setNewEvent({...newEvent, address: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
                <textarea
                  placeholder="Event Description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white md:col-span-2"
                  rows="3"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors md:col-span-2"
                >
                  Create Event
                </button>
              </form>
            </div>
          )}

          <div className="grid gap-6">
            {events.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No events created yet. Create your first event!
                </p>
              </div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>📅 {new Date(event.event_date).toLocaleString()}</span>
                        <span>📍 {event.address}, {event.city}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      new Date(event.event_date) > new Date() 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                    }`}>
                      {new Date(event.event_date) > new Date() ? 'Upcoming' : 'Past Event'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default EventsPage;
