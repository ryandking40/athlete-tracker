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

// Dummy data for leaderboards
const strengthLeaders = {
  bench: [
    { rank: 1, name: "John Smith", grade: "12", weight: "220", score: "315" },
    { rank: 2, name: "Mike Johnson", grade: "11", weight: "181", score: "285" },
    { rank: 3, name: "Chris Davis", grade: "12", weight: "242", score: "275" },
    { rank: 4, name: "Tom Wilson", grade: "10", weight: "165", score: "245" },
    { rank: 5, name: "Alex Brown", grade: "11", weight: "198", score: "235" },
    { rank: 6, name: "James Wilson", grade: "12", weight: "181", score: "225" },
    { rank: 7, name: "Sam Lee", grade: "10", weight: "165", score: "215" },
    { rank: 8, name: "David Clark", grade: "11", weight: "198", score: "205" },
    { rank: 9, name: "Ryan White", grade: "9", weight: "148", score: "195" },
    { rank: 10, name: "Kevin Brown", grade: "10", weight: "165", score: "185" },
  ],
  squat: [
    { rank: 1, name: "John Smith", grade: "12", weight: "220", score: "500" },
    { rank: 2, name: "Chris Davis", grade: "12", weight: "242", score: "485" },
    { rank: 3, name: "Mike Johnson", grade: "11", weight: "181", score: "445" },
    // ... similar structure for other athletes
  ],
  clean: [
    { rank: 1, name: "Mike Johnson", grade: "11", weight: "181", score: "285" },
    { rank: 2, name: "John Smith", grade: "12", weight: "220", score: "275" },
    { rank: 3, name: "Tom Wilson", grade: "10", weight: "165", score: "245" },
    // ... similar structure for other athletes
  ],
  incline: [
    { rank: 1, name: "John Smith", grade: "12", weight: "220", score: "275" },
    { rank: 2, name: "Mike Johnson", grade: "11", weight: "181", score: "255" },
    { rank: 3, name: "Chris Davis", grade: "12", weight: "242", score: "245" },
    // ... similar structure for other athletes
  ],
  total: [
    { rank: 1, name: "John Smith", grade: "12", weight: "220", score: "1400" },
    { rank: 2, name: "Chris Davis", grade: "12", weight: "242", score: "1350" },
    { rank: 3, name: "Mike Johnson", grade: "11", weight: "181", score: "1250" },
    // ... similar structure for other athletes
  ],
};

const speedLeaders = {
  "10m_fly": [
    { rank: 1, name: "Tom Wilson", grade: "10", weight: "165", score: "1.09" },
    { rank: 2, name: "Mike Johnson", grade: "11", weight: "181", score: "1.12" },
    { rank: 3, name: "Sam Lee", grade: "10", weight: "165", score: "1.15" },
    // ... similar structure for other athletes
  ],
  "20yd": [
    { rank: 1, name: "Tom Wilson", grade: "10", weight: "165", score: "2.51" },
    { rank: 2, name: "Mike Johnson", grade: "11", weight: "181", score: "2.54" },
    { rank: 3, name: "Sam Lee", grade: "10", weight: "165", score: "2.58" },
    // ... similar structure for other athletes
  ],
  "40yd": [
    { rank: 1, name: "Tom Wilson", grade: "10", weight: "165", score: "4.65" },
    { rank: 2, name: "Mike Johnson", grade: "11", weight: "181", score: "4.68" },
    { rank: 3, name: "Sam Lee", grade: "10", weight: "165", score: "4.72" },
    // ... similar structure for other athletes
  ],
  "pro_agility": [
    { rank: 1, name: "Sam Lee", grade: "10", weight: "165", score: "4.21" },
    { rank: 2, name: "Tom Wilson", grade: "10", weight: "165", score: "4.25" },
    { rank: 3, name: "Mike Johnson", grade: "11", weight: "181", score: "4.28" },
    // ... similar structure for other athletes
  ],
};

const jumpLeaders = {
  vertical: [
    { rank: 1, name: "Tom Wilson", grade: "10", weight: "165", score: "34.5" },
    { rank: 2, name: "Mike Johnson", grade: "11", weight: "181", score: "33.0" },
    { rank: 3, name: "Sam Lee", grade: "10", weight: "165", score: "32.5" },
    // ... similar structure for other athletes
  ],
  broad: [
    { rank: 1, name: "Tom Wilson", grade: "10", weight: "165", score: "9'6\"" },
    { rank: 2, name: "Mike Johnson", grade: "11", weight: "181", score: "9'4\"" },
    { rank: 3, name: "Sam Lee", grade: "10", weight: "165", score: "9'2\"" },
    // ... similar structure for other athletes
  ],
};

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <Badge variant="outline" className="text-red-600">
          Last Updated: Feb 5, 2024
        </Badge>
      </div>

      <Tabs defaultValue="strength" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="strength">Strength</TabsTrigger>
          <TabsTrigger value="speed">Speed</TabsTrigger>
          <TabsTrigger value="jump">Jump</TabsTrigger>
        </TabsList>

        <TabsContent value="strength">
          <div className="grid gap-6">
            {Object.entries(strengthLeaders).map(([category, leaders]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="capitalize">
                    {category === "total" ? "Total (Big 3)" : category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Rank</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Weight Class</TableHead>
                        <TableHead className="text-right">
                          {category === "total" ? "Total (lbs)" : "Weight (lbs)"}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaders.map((leader) => (
                        <TableRow key={leader.rank}>
                          <TableCell>
                            <Badge variant={
                              leader.rank === 1 ? "default" :
                              leader.rank === 2 ? "secondary" :
                              leader.rank === 3 ? "outline" :
                              "outline"
                            }>
                              #{leader.rank}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{leader.name}</TableCell>
                          <TableCell>{leader.grade}</TableCell>
                          <TableCell>{leader.weight}</TableCell>
                          <TableCell className="text-right">{leader.score}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="speed">
          <div className="grid gap-6">
            {Object.entries(speedLeaders).map(([category, leaders]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>
                    {category === "10m_fly" ? "10 Meter Fly" :
                     category === "20yd" ? "20 Yard Dash" :
                     category === "40yd" ? "40 Yard Dash" :
                     "Pro Agility"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Rank</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Weight Class</TableHead>
                        <TableHead className="text-right">Time (sec)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaders.map((leader) => (
                        <TableRow key={leader.rank}>
                          <TableCell>
                            <Badge variant={
                              leader.rank === 1 ? "default" :
                              leader.rank === 2 ? "secondary" :
                              leader.rank === 3 ? "outline" :
                              "outline"
                            }>
                              #{leader.rank}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{leader.name}</TableCell>
                          <TableCell>{leader.grade}</TableCell>
                          <TableCell>{leader.weight}</TableCell>
                          <TableCell className="text-right">{leader.score}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="jump">
          <div className="grid gap-6">
            {Object.entries(jumpLeaders).map(([category, leaders]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>
                    {category === "vertical" ? "Vertical Jump" : "Broad Jump"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Rank</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Weight Class</TableHead>
                        <TableHead className="text-right">
                          {category === "vertical" ? "Height (in)" : "Distance"}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaders.map((leader) => (
                        <TableRow key={leader.rank}>
                          <TableCell>
                            <Badge variant={
                              leader.rank === 1 ? "default" :
                              leader.rank === 2 ? "secondary" :
                              leader.rank === 3 ? "outline" :
                              "outline"
                            }>
                              #{leader.rank}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{leader.name}</TableCell>
                          <TableCell>{leader.grade}</TableCell>
                          <TableCell>{leader.weight}</TableCell>
                          <TableCell className="text-right">{leader.score}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 