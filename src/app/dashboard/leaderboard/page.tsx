'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  PDFDownloadLink,
  Font 
} from '@react-pdf/renderer';
import React from "react";

type Gender = 'mens' | 'womens';

type Athlete = {
  rank: number;
  name: string;
  grade: string;
  score: string;
  lifts?: {
    bench: string;
    squat: string;
    clean: string;
  };
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

type PDFData = {
  strength: StrengthCategory;
  speed: SpeedCategory;
  jump: JumpCategory;
};

type LeaderboardPDFProps = {
  gender: Gender;
  data: PDFData;
};

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
      { 
        rank: 1, 
        name: "John Smith", 
        grade: "12", 
        score: "1400",
        lifts: {
          bench: "315",
          squat: "500",
          clean: "285"
        }
      },
      { 
        rank: 2, 
        name: "Chris Davis", 
        grade: "12", 
        score: "1350",
        lifts: {
          bench: "275",
          squat: "485",
          clean: "275"
        }
      },
      { 
        rank: 3, 
        name: "Mike Johnson", 
        grade: "11", 
        score: "1250",
        lifts: {
          bench: "285",
          squat: "445",
          clean: "285"
        }
      },
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
      { 
        rank: 1, 
        name: "Sarah Johnson", 
        grade: "12", 
        score: "875",
        lifts: {
          bench: "185",
          squat: "315",
          clean: "175"
        }
      },
      { 
        rank: 2, 
        name: "Emily Davis", 
        grade: "11", 
        score: "845",
        lifts: {
          bench: "175",
          squat: "295",
          clean: "185"
        }
      },
      { 
        rank: 3, 
        name: "Rachel Smith", 
        grade: "12", 
        score: "815",
        lifts: {
          bench: "165",
          squat: "285",
          clean: "165"
        }
      },
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

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column' as const,
    backgroundColor: '#fff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center' as const,
    color: '#dc2626', // red-600
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#111827', // gray-900
  },
  table: {
    display: 'flex' as const,
    width: 'auto',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb', // gray-200
    minHeight: 30,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f9fafb', // gray-50
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    padding: 5,
  },
  rankCell: {
    width: '15%',
  },
  nameCell: {
    width: '45%',
  },
  gradeCell: {
    width: '15%',
  },
  scoreCell: {
    width: '25%',
    textAlign: 'right',
  },
});

// PDF Document Component
const LeaderboardPDF = ({ gender, data }: LeaderboardPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Conway Springs Leaderboard</Text>
      <Text style={styles.subtitle}>{gender === 'mens' ? "Men's" : "Women's"} Rankings</Text>
      
      {/* Strength Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Strength</Text>
        {(Object.entries(data.strength) as [keyof StrengthCategory, Athlete[]][]).map(([category, leaders]) => (
          <View key={category}>
            <Text style={{ fontSize: 14, marginVertical: 5, color: '#4b5563' }}>
              {category === "total" ? "Total (Big 3)" : category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, styles.rankCell]}>Rank</Text>
                <Text style={[styles.tableCell, styles.nameCell]}>Name</Text>
                <Text style={[styles.tableCell, styles.gradeCell]}>Grade</Text>
                <Text style={[styles.tableCell, styles.scoreCell]}>Weight (lbs)</Text>
              </View>
              {leaders.slice(0, 3).map((leader) => (
                <View key={leader.rank} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.rankCell]}>#{leader.rank}</Text>
                  <Text style={[styles.tableCell, styles.nameCell]}>{leader.name}</Text>
                  <Text style={[styles.tableCell, styles.gradeCell]}>{leader.grade}</Text>
                  <Text style={[styles.tableCell, styles.scoreCell]}>{leader.score}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Speed Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Speed</Text>
        {(Object.entries(data.speed) as [keyof SpeedCategory, Athlete[]][]).map(([category, leaders]) => (
          <View key={category}>
            <Text style={{ fontSize: 14, marginVertical: 5, color: '#4b5563' }}>
              {category === "10m_fly" ? "10 Meter Fly" :
               category === "20yd" ? "20 Yard Dash" :
               category === "40yd" ? "40 Yard Dash" :
               "Pro Agility"}
            </Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, styles.rankCell]}>Rank</Text>
                <Text style={[styles.tableCell, styles.nameCell]}>Name</Text>
                <Text style={[styles.tableCell, styles.gradeCell]}>Grade</Text>
                <Text style={[styles.tableCell, styles.scoreCell]}>Time (sec)</Text>
              </View>
              {leaders.slice(0, 3).map((leader) => (
                <View key={leader.rank} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.rankCell]}>#{leader.rank}</Text>
                  <Text style={[styles.tableCell, styles.nameCell]}>{leader.name}</Text>
                  <Text style={[styles.tableCell, styles.gradeCell]}>{leader.grade}</Text>
                  <Text style={[styles.tableCell, styles.scoreCell]}>{leader.score}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Jump Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Jump</Text>
        {(Object.entries(data.jump) as [keyof JumpCategory, Athlete[]][]).map(([category, leaders]) => (
          <View key={category}>
            <Text style={{ fontSize: 14, marginVertical: 5, color: '#4b5563' }}>
              {category === "vertical" ? "Vertical Jump" : "Broad Jump"}
            </Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, styles.rankCell]}>Rank</Text>
                <Text style={[styles.tableCell, styles.nameCell]}>Name</Text>
                <Text style={[styles.tableCell, styles.gradeCell]}>Grade</Text>
                <Text style={[styles.tableCell, styles.scoreCell]}>
                  {category === "vertical" ? "Height (in)" : "Distance"}
                </Text>
              </View>
              {leaders.slice(0, 3).map((leader) => (
                <View key={leader.rank} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.rankCell]}>#{leader.rank}</Text>
                  <Text style={[styles.tableCell, styles.nameCell]}>{leader.name}</Text>
                  <Text style={[styles.tableCell, styles.gradeCell]}>{leader.grade}</Text>
                  <Text style={[styles.tableCell, styles.scoreCell]}>{leader.score}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default function LeaderboardPage() {
  const [selectedGender, setSelectedGender] = useState<Gender>('mens');

  const getPDFData = (gender: Gender) => ({
    strength: strengthLeaders[gender],
    speed: speedLeaders[gender],
    jump: jumpLeaders[gender],
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <div className="flex items-center gap-4">
          <PDFDownloadLink
            document={<LeaderboardPDF gender={selectedGender} data={getPDFData(selectedGender)} />}
            fileName={`leaderboard-${selectedGender}-${new Date().toISOString().split('T')[0]}.pdf`}
          >
            {({ loading }) => (
              <Button variant="outline" disabled={loading}>
                <Download className="w-4 h-4 mr-2" />
                {loading ? "Generating PDF..." : "Export PDF"}
              </Button>
            )}
          </PDFDownloadLink>
          <Badge variant="outline" className="text-red-600">
            Last Updated: Feb 5, 2024
          </Badge>
        </div>
      </div>

      <Tabs 
        defaultValue="mens" 
        className="space-y-4"
        onValueChange={(value) => setSelectedGender(value as Gender)}
      >
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
                              <React.Fragment key={leader.rank}>
                                <TableRow>
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
                                {category === "total" && leader.lifts && (
                                  <TableRow className="bg-muted/50">
                                    <TableCell colSpan={2} className="pl-14 text-sm text-muted-foreground">
                                      Bench: {leader.lifts.bench} | Squat: {leader.lifts.squat} | Clean: {leader.lifts.clean}
                                    </TableCell>
                                    <TableCell colSpan={2} />
                                  </TableRow>
                                )}
                              </React.Fragment>
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