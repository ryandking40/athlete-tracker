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

type Gender = 'mens' | 'womens';

type Athlete = {
  rank: number;
  name: string;
  grade: string;
  score: string;
};

type StrengthCategory = {
  bench: Athlete[];
  squat: Athlete[];
  clean: Athlete[];
  incline: Athlete[];
  total: Athlete[];
};

type SpeedCategory = {
  "10m_fly": Athlete[];
  "20yd": Athlete[];
  "40yd": Athlete[];
  "pro_agility": Athlete[];
};

type JumpCategory = {
  vertical: Athlete[];
  broad: Athlete[];
};

type StrengthLeaders = Record<Gender, StrengthCategory>;
type SpeedLeaders = Record<Gender, SpeedCategory>;
type JumpLeaders = Record<Gender, JumpCategory>;

// Dummy data for leaderboards
const strengthLeaders: StrengthLeaders = {
  mens: {
    bench: [
      { rank: 1, name: "John Smith", grade: "12", score: "315" },
      { rank: 2, name: "Mike Johnson", grade: "11", score: "285" },
      { rank: 3, name: "Chris Davis", grade: "12", score: "275" },
      { rank: 4, name: "Tom Wilson", grade: "10", score: "245" },
      { rank: 5, name: "Alex Brown", grade: "11", score: "235" },
      { rank: 6, name: "James Wilson", grade: "12", score: "225" },
      { rank: 7, name: "Sam Lee", grade: "10", score: "215" },
      { rank: 8, name: "David Clark", grade: "11", score: "205" },
      { rank: 9, name: "Ryan White", grade: "9", score: "195" },
      { rank: 10, name: "Kevin Brown", grade: "10", score: "185" },
    ],
    squat: [
      { rank: 1, name: "John Smith", grade: "12", score: "500" },
      { rank: 2, name: "Chris Davis", grade: "12", score: "485" },
      { rank: 3, name: "Mike Johnson", grade: "11", score: "445" },
    ],
    clean: [
      { rank: 1, name: "Mike Johnson", grade: "11", score: "285" },
      { rank: 2, name: "John Smith", grade: "12", score: "275" },
      { rank: 3, name: "Tom Wilson", grade: "10", score: "245" },
    ],
    incline: [
      { rank: 1, name: "John Smith", grade: "12", score: "275" },
      { rank: 2, name: "Mike Johnson", grade: "11", score: "255" },
      { rank: 3, name: "Chris Davis", grade: "12", score: "245" },
    ],
    total: [
      { rank: 1, name: "John Smith", grade: "12", score: "1400" },
      { rank: 2, name: "Chris Davis", grade: "12", score: "1350" },
      { rank: 3, name: "Mike Johnson", grade: "11", score: "1250" },
    ],
  },
  womens: {
    bench: [
      { rank: 1, name: "Sarah Johnson", grade: "12", score: "185" },
      { rank: 2, name: "Emily Davis", grade: "11", score: "175" },
      { rank: 3, name: "Rachel Smith", grade: "12", score: "165" },
    ],
    squat: [
      { rank: 1, name: "Sarah Johnson", grade: "12", score: "315" },
      { rank: 2, name: "Emily Davis", grade: "11", score: "295" },
      { rank: 3, name: "Rachel Smith", grade: "12", score: "285" },
    ],
    clean: [
      { rank: 1, name: "Emily Davis", grade: "11", score: "185" },
      { rank: 2, name: "Sarah Johnson", grade: "12", score: "175" },
      { rank: 3, name: "Rachel Smith", grade: "12", score: "165" },
    ],
    incline: [
      { rank: 1, name: "Sarah Johnson", grade: "12", score: "165" },
      { rank: 2, name: "Emily Davis", grade: "11", score: "155" },
      { rank: 3, name: "Rachel Smith", grade: "12", score: "145" },
    ],
    total: [
      { rank: 1, name: "Sarah Johnson", grade: "12", score: "875" },
      { rank: 2, name: "Emily Davis", grade: "11", score: "845" },
      { rank: 3, name: "Rachel Smith", grade: "12", score: "815" },
    ],
  }
};

const speedLeaders: SpeedLeaders = {
  mens: {
    "10m_fly": [
      { rank: 1, name: "Tom Wilson", grade: "10", score: "1.09" },
      { rank: 2, name: "Mike Johnson", grade: "11", score: "1.12" },
      { rank: 3, name: "Sam Lee", grade: "10", score: "1.15" },
    ],
    "20yd": [
      { rank: 1, name: "Tom Wilson", grade: "10", score: "2.51" },
      { rank: 2, name: "Mike Johnson", grade: "11", score: "2.54" },
      { rank: 3, name: "Sam Lee", grade: "10", score: "2.58" },
    ],
    "40yd": [
      { rank: 1, name: "Tom Wilson", grade: "10", score: "4.65" },
      { rank: 2, name: "Mike Johnson", grade: "11", score: "4.68" },
      { rank: 3, name: "Sam Lee", grade: "10", score: "4.72" },
    ],
    "pro_agility": [
      { rank: 1, name: "Sam Lee", grade: "10", score: "4.21" },
      { rank: 2, name: "Tom Wilson", grade: "10", score: "4.25" },
      { rank: 3, name: "Mike Johnson", grade: "11", score: "4.28" },
    ],
  },
  womens: {
    "10m_fly": [
      { rank: 1, name: "Emily Davis", grade: "11", score: "1.15" },
      { rank: 2, name: "Sarah Johnson", grade: "12", score: "1.18" },
      { rank: 3, name: "Rachel Smith", grade: "12", score: "1.21" },
    ],
    "20yd": [
      { rank: 1, name: "Emily Davis", grade: "11", score: "2.65" },
      { rank: 2, name: "Sarah Johnson", grade: "12", score: "2.68" },
      { rank: 3, name: "Rachel Smith", grade: "12", score: "2.71" },
    ],
    "40yd": [
      { rank: 1, name: "Emily Davis", grade: "11", score: "5.15" },
      { rank: 2, name: "Sarah Johnson", grade: "12", score: "5.18" },
      { rank: 3, name: "Rachel Smith", grade: "12", score: "5.21" },
    ],
    "pro_agility": [
      { rank: 1, name: "Emily Davis", grade: "11", score: "4.45" },
      { rank: 2, name: "Sarah Johnson", grade: "12", score: "4.48" },
      { rank: 3, name: "Rachel Smith", grade: "12", score: "4.51" },
    ],
  }
};

const jumpLeaders: JumpLeaders = {
  mens: {
    vertical: [
      { rank: 1, name: "Tom Wilson", grade: "10", score: "34.5" },
      { rank: 2, name: "Mike Johnson", grade: "11", score: "33.0" },
      { rank: 3, name: "Sam Lee", grade: "10", score: "32.5" },
    ],
    broad: [
      { rank: 1, name: "Tom Wilson", grade: "10", score: "9'6\"" },
      { rank: 2, name: "Mike Johnson", grade: "11", score: "9'4\"" },
      { rank: 3, name: "Sam Lee", grade: "10", score: "9'2\"" },
    ],
  },
  womens: {
    vertical: [
      { rank: 1, name: "Emily Davis", grade: "11", score: "28.5" },
      { rank: 2, name: "Sarah Johnson", grade: "12", score: "27.0" },
      { rank: 3, name: "Rachel Smith", grade: "12", score: "26.5" },
    ],
    broad: [
      { rank: 1, name: "Emily Davis", grade: "11", score: "8'0\"" },
      { rank: 2, name: "Sarah Johnson", grade: "12", score: "7'10\"" },
      { rank: 3, name: "Rachel Smith", grade: "12", score: "7'8\"" },
    ],
  }
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

      <Tabs defaultValue="mens" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mens">Men's</TabsTrigger>
          <TabsTrigger value="womens">Women's</TabsTrigger>
        </TabsList>

        {(["mens", "womens"] as const).map((gender) => (
          <TabsContent key={gender} value={gender}>
            <Tabs defaultValue="strength" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="strength">Strength</TabsTrigger>
                <TabsTrigger value="speed">Speed</TabsTrigger>
                <TabsTrigger value="jump">Jump</TabsTrigger>
              </TabsList>

              <TabsContent value="strength">
                <div className="grid grid-cols-2 gap-6">
                  {(Object.entries(strengthLeaders[gender]) as [keyof StrengthCategory, Athlete[]][]).map(([category, leaders]) => (
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
                                    "outline"
                                  }>
                                    #{leader.rank}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-medium">{leader.name}</TableCell>
                                <TableCell>{leader.grade}</TableCell>
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
                <div className="grid grid-cols-2 gap-6">
                  {(Object.entries(speedLeaders[gender]) as [keyof SpeedCategory, Athlete[]][]).map(([category, leaders]) => (
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
                                    "outline"
                                  }>
                                    #{leader.rank}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-medium">{leader.name}</TableCell>
                                <TableCell>{leader.grade}</TableCell>
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
                <div className="grid grid-cols-2 gap-6">
                  {(Object.entries(jumpLeaders[gender]) as [keyof JumpCategory, Athlete[]][]).map(([category, leaders]) => (
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
                                    "outline"
                                  }>
                                    #{leader.rank}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-medium">{leader.name}</TableCell>
                                <TableCell>{leader.grade}</TableCell>
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 