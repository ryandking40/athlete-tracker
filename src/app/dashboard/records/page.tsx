'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const schoolRecords = [
  {
    lift: "Squat",
    weight: "500",
    athlete: "John Smith",
    class: "220",
    date: "2023-12-15",
  },
  {
    lift: "Bench",
    weight: "315",
    athlete: "Mike Johnson",
    class: "181",
    date: "2023-11-20",
  },
  {
    lift: "Deadlift",
    weight: "585",
    athlete: "Chris Davis",
    class: "242",
    date: "2024-01-10",
  },
  {
    lift: "Total",
    weight: "1400",
    athlete: "John Smith",
    class: "220",
    date: "2023-12-15",
  },
];

const classRecords = {
  "165": [
    { lift: "Squat", weight: "405", athlete: "Tom Wilson", date: "2023-10-15" },
    { lift: "Bench", weight: "275", athlete: "Alex Brown", date: "2023-09-20" },
    { lift: "Deadlift", weight: "495", athlete: "Sam Lee", date: "2024-01-05" },
  ],
  "181": [
    { lift: "Squat", weight: "445", athlete: "Mike Johnson", date: "2023-11-20" },
    { lift: "Bench", weight: "315", athlete: "Mike Johnson", date: "2023-11-20" },
    { lift: "Deadlift", weight: "525", athlete: "James Wilson", date: "2023-12-01" },
  ],
};

export default function RecordsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Records</h1>
        <div className="flex gap-2">
          <span className="text-sm text-gray-500">Last updated: Feb 5, 2024</span>
        </div>
      </div>

      <Tabs defaultValue="school" className="space-y-4">
        <TabsList>
          <TabsTrigger value="school">School Records</TabsTrigger>
          <TabsTrigger value="class">Records by Weight Class</TabsTrigger>
          <TabsTrigger value="yearly">Yearly Records</TabsTrigger>
        </TabsList>

        <TabsContent value="school" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All-Time School Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lift</TableHead>
                    <TableHead>Weight (lbs)</TableHead>
                    <TableHead>Athlete</TableHead>
                    <TableHead>Weight Class</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schoolRecords.map((record) => (
                    <TableRow key={record.lift}>
                      <TableCell className="font-medium">{record.lift}</TableCell>
                      <TableCell>{record.weight}</TableCell>
                      <TableCell>{record.athlete}</TableCell>
                      <TableCell>{record.class}</TableCell>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="class" className="space-y-4">
          {Object.entries(classRecords).map(([weightClass, records]) => (
            <Card key={weightClass}>
              <CardHeader>
                <CardTitle>{weightClass} lbs Weight Class Records</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lift</TableHead>
                      <TableHead>Weight (lbs)</TableHead>
                      <TableHead>Athlete</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((record) => (
                      <TableRow key={record.lift}>
                        <TableCell className="font-medium">{record.lift}</TableCell>
                        <TableCell>{record.weight}</TableCell>
                        <TableCell>{record.athlete}</TableCell>
                        <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="yearly">
          <Card>
            <CardHeader>
              <CardTitle>2024 Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Yearly records will be displayed here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 