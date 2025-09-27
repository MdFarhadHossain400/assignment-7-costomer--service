import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function TicketDashboard() {
  const [tickets, setTickets] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [resolvedTasks, setResolvedTasks] = useState([]);

  
  const inProgressCount = selectedTasks.length;
  const resolvedCount = resolvedTasks.length;

  
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch((err) => console.error("Failed to fetch tickets:", err));
  }, []);


  const handleCardClick = (ticket) => {
    if (!selectedTasks.some((t) => t.id === ticket.id)) {
      const updatedTicket = { ...ticket, status: "In-Progress" };
      setSelectedTasks([...selectedTasks, updatedTicket]);

      
      const updatedTickets = tickets.map((t) =>
        t.id === ticket.id ? updatedTicket : t
      );
      setTickets(updatedTickets);
       toast.success("In-Process")
    }
  };

  
  const handleComplete = (task) => {
    setSelectedTasks(selectedTasks.filter((t) => t.id !== task.id));
    setTickets(tickets.filter((t) => t.id !== task.id));
    setResolvedTasks([...resolvedTasks, { ...task, status: "Resolved" }]);
      toast.success(" Completed ");
  };

  return (
    <div className="p-6">
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-purple-500 text-white rounded-xl p-6 text-center">
           <div className="absolute position">
            <img src="../image/vector1.png" alt="" />
            <img src="../image/vector2.png" alt="" />
           </div>
           <div className="absolute position left-3">
            <img src="../image/vector1.png" alt="" />
            <img src="../image/vector2.png" alt="" />
           </div>

          <h2 className="text-xl font-semibold">In-Progress</h2>
          <p className="text-4xl font-bold">{inProgressCount}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-500 text-white rounded-xl p-6 text-center">
              <div className="absolute position">
            <img src="../image/vector1.png" alt="" />
            <img src="../image/vector2.png" alt="" />
           </div>
              <div className="absolute position left-3">
            <img src="../image/vector1.png" alt="" />
            <img src="../image/vector2.png" alt="" />
           </div>
          <h2 className="text-xl font-semibold">Resolved</h2>
          <p className="text-4xl font-bold">{resolvedCount}</p>
        </div>
      </div>
        <h3 className="font-bold text-lg mb-2">Customer Tickets</h3>
      <div className="grid grid-cols-4 gap-6">
        
        
        <div className="col-span-3 grid grid-cols-2 gap-3 space-y-4">
          {/* <h3 className="font-bold text-lg mb-2">Customer Tickets</h3> */}
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => handleCardClick(ticket)}
              className="cursor-pointer border rounded-lg p-4 shadow hover:shadow-lg transition bg-white"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">{ticket.title}</h4>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    ticket.status === "Open"
                      ? "bg-green-100 text-green-700"
                      : ticket.status === "In-Progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{ticket.description}</p>
              <div className="flex justify-between text-xs text-gray-500 mt-3">
                <span>Customer: {ticket.customer}</span>
                <span>Priority: {ticket.priority}</span>
                <span>{ticket.createdAt}</span>
              </div>
            </div>
          ))}
        </div>

        
        <div className="col-span-1">
          <h3 className="font-bold text-lg mb-2">Task Status</h3>
          {selectedTasks.length > 0 ? (
            <div className="space-y-4">
              {selectedTasks.map((task) => (
                <div
                  key={task.id}
                  className="border rounded-lg p-4 shadow bg-white"
                >
                  <h4 className="font-semibold">{task.title}</h4>
                  <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                  <button
                    onClick={() => handleComplete(task)}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Complete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No selected task yet.</p>
          )}

          <h3 className="font-bold text-lg mt-6">Resolved Task</h3>
          <ul className="mt-2 space-y-2">
            {resolvedTasks.map((task) => (
              <li
                key={task.id}
                className="text-sm bg-green-50 text-green-700 px-3 py-2 rounded"
              >
                {task.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


