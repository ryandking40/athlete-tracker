'use client';

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dummy data for events
const events = [
  {
    id: 1,
    title: "Team Practice",
    date: "2024-02-05",
    type: "practice",
    time: "3:30 PM",
    location: "Weight Room"
  },
  {
    id: 2,
    title: "Max Testing Day",
    date: "2024-02-07",
    type: "testing",
    time: "3:30 PM",
    location: "Weight Room"
  },
  {
    id: 3,
    title: "Regional Meet",
    date: "2024-02-15",
    type: "competition",
    time: "9:00 AM",
    location: "Conway Springs High School"
  },
  {
    id: 4,
    title: "Recovery Session",
    date: "2024-02-16",
    type: "practice",
    time: "3:30 PM",
    location: "Weight Room"
  }
];

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState("month");

  // Filter events for the selected date
  const selectedDateEvents = events.filter(event => 
    new Date(event.date).toDateString() === date?.toDateString()
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <Select value={view} onValueChange={setView}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month View</SelectItem>
            <SelectItem value="week">Week View</SelectItem>
            <SelectItem value="day">Day View</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <CardContent className="p-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                Events for {date?.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map(event => (
                    <div
                      key={event.id}
                      className={`p-4 rounded-lg border ${
                        event.type === 'competition' 
                          ? 'bg-red-50 border-red-200' 
                          : event.type === 'testing'
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="font-semibold">{event.title}</div>
                      <div className="text-sm text-gray-600">
                        <div>{event.time}</div>
                        <div>{event.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No events scheduled for this date</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events
                  .filter(event => new Date(event.date) >= new Date())
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 3)
                  .map(event => (
                    <div key={event.id} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 text-center">
                        <div className="text-sm font-semibold">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-gray-600">{event.time}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 