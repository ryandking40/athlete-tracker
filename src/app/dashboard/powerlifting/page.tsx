'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type WeightClass = "148" | "165" | "181" | "198" | "220" | "242" | "275" | "275+";

// Dummy data for meets and performances
const meets = [
  {
    id: 1,
    name: "Regional Championship",
    date: "2024-02-15",
    location: "Conway Springs High School",
    status: "upcoming",
    registeredAthletes: 12,
  },
  {
    id: 2,
    name: "State Qualifiers",
    date: "2024-03-01",
    location: "Wichita Northwest High School",
    status: "upcoming",
    registeredAthletes: 8,
  },
  {
    id: 3,
    name: "Winter Invitational",
    date: "2023-12-10",
    location: "Garden Plain High School",
    status: "completed",
    results: [
      { athlete: "John Smith", weightClass: "220", place: "1st", total: "1400" },
      { athlete: "Mike Johnson", weightClass: "181", place: "2nd", total: "1250" },
      { athlete: "Chris Davis", weightClass: "242", place: "1st", total: "1350" },
    ]
  }
];

const weightClasses: WeightClass[] = ["148", "165", "181", "198", "220", "242", "275", "275+"];

const qualifyingTotals: Record<WeightClass, string> = {
  "148": "1000",
  "165": "1100",
  "181": "1200",
  "198": "1300",
  "220": "1400",
  "242": "1500",
  "275": "1600",
  "275+": "1650"
};

export default function PowerliftingPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Powerlifting</h1>
        <div className="flex gap-4">
          <Badge variant="outline" className="text-red-600 border-red-600">
            Next Meet: Regional Championship - Feb 15
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="meets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="meets">Meets</TabsTrigger>
          <TabsTrigger value="qualifying">Qualifying Totals</TabsTrigger>
          <TabsTrigger value="records">Meet Records</TabsTrigger>
        </TabsList>

        <TabsContent value="meets">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Meets</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Meet</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Registered Athletes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {meets
                      .filter(meet => meet.status === "upcoming")
                      .map(meet => (
                        <TableRow key={meet.id}>
                          <TableCell className="font-medium">{meet.name}</TableCell>
                          <TableCell>{new Date(meet.date).toLocaleDateString()}</TableCell>
                          <TableCell>{meet.location}</TableCell>
                          <TableCell>{meet.registeredAthletes}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Past Meet Results</CardTitle>
              </CardHeader>
              <CardContent>
                {meets
                  .filter(meet => meet.status === "completed")
                  .map(meet => (
                    <div key={meet.id} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{meet.name}</h3>
                        <span className="text-sm text-gray-500">
                          {new Date(meet.date).toLocaleDateString()}
                        </span>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Athlete</TableHead>
                            <TableHead>Weight Class</TableHead>
                            <TableHead>Place</TableHead>
                            <TableHead>Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {meet.results?.map((result, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{result.athlete}</TableCell>
                              <TableCell>{result.weightClass}</TableCell>
                              <TableCell>
                                <Badge variant={
                                  result.place === "1st" ? "default" :
                                  result.place === "2nd" ? "secondary" :
                                  "outline"
                                }>
                                  {result.place}
                                </Badge>
                              </TableCell>
                              <TableCell>{result.total}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="qualifying">
          <Card>
            <CardHeader>
              <CardTitle>State Qualifying Totals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {weightClasses.map(weightClass => (
                  <Card key={weightClass}>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {qualifyingTotals[weightClass]}
                        </div>
                        <div className="text-sm text-gray-500">
                          {weightClass} lbs Class
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>School Meet Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Meet records will be displayed here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 