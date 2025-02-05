'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Dummy data for teams and athletes
const teams = {
  varsity: {
    name: "Varsity",
    athletes: [
      { id: 1, name: "John Smith", grade: "12", weight: "220", total: "1400", position: "Captain" },
      { id: 2, name: "Mike Johnson", grade: "11", weight: "181", total: "1250", position: "Member" },
      { id: 3, name: "Chris Davis", grade: "12", weight: "242", total: "1350", position: "Member" },
      { id: 4, name: "Tom Wilson", grade: "10", weight: "165", total: "1100", position: "Member" },
    ]
  },
  jv: {
    name: "Junior Varsity",
    athletes: [
      { id: 5, name: "Alex Brown", grade: "9", weight: "148", total: "850", position: "Member" },
      { id: 6, name: "Sam Lee", grade: "10", weight: "165", total: "950", position: "Member" },
      { id: 7, name: "James Wilson", grade: "9", weight: "181", total: "900", position: "Member" },
    ]
  }
};

export default function RostersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team Rosters</h1>
        <div className="flex gap-4">
          <Badge variant="outline" className="text-green-600 border-green-600">
            Total Athletes: {Object.values(teams).reduce((acc, team) => acc + team.athletes.length, 0)}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="varsity" className="space-y-4">
        <TabsList>
          {Object.entries(teams).map(([key, team]) => (
            <TabsTrigger key={key} value={key}>
              {team.name} ({team.athletes.length})
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(teams).map(([key, team]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{team.name} Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Weight Class</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Position</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {team.athletes.map((athlete) => (
                      <TableRow key={athlete.id}>
                        <TableCell className="font-medium">{athlete.name}</TableCell>
                        <TableCell>{athlete.grade}</TableCell>
                        <TableCell>{athlete.weight}</TableCell>
                        <TableCell>{athlete.total}</TableCell>
                        <TableCell>
                          <Badge variant={athlete.position === "Captain" ? "default" : "secondary"}>
                            {athlete.position}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Average Total:</dt>
                      <dd className="font-medium">
                        {Math.round(
                          team.athletes.reduce((acc, athlete) => acc + parseInt(athlete.total), 0) /
                          team.athletes.length
                        )}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Weight Classes:</dt>
                      <dd className="font-medium">
                        {new Set(team.athletes.map(a => a.weight)).size}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 