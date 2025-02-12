'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

type ExerciseType = 'upper' | 'lower' | 'plyo' | 'speed';

interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  category: string;
  primaryMuscles: string[];
  description: string;
}

// Dummy data for exercises
const exercises: Exercise[] = [
  // Upper Body Exercises
  {
    id: "1",
    name: "Bench Press",
    type: "upper",
    category: "Push",
    primaryMuscles: ["Chest", "Shoulders", "Triceps"],
    description: "Compound pushing movement targeting chest development"
  },
  {
    id: "2",
    name: "Pull-ups",
    type: "upper",
    category: "Pull",
    primaryMuscles: ["Back", "Biceps"],
    description: "Upper body pulling exercise for back strength"
  },
  {
    id: "3",
    name: "Military Press",
    type: "upper",
    category: "Push",
    primaryMuscles: ["Shoulders", "Triceps"],
    description: "Overhead pressing movement for shoulder strength"
  },
  // Lower Body Exercises
  {
    id: "4",
    name: "Back Squat",
    type: "lower",
    category: "Legs",
    primaryMuscles: ["Quadriceps", "Glutes", "Hamstrings"],
    description: "Fundamental lower body strength movement"
  },
  {
    id: "5",
    name: "Romanian Deadlift",
    type: "lower",
    category: "Posterior Chain",
    primaryMuscles: ["Hamstrings", "Glutes", "Lower Back"],
    description: "Hip-hinge movement for posterior chain development"
  },
  // Plyometric Exercises
  {
    id: "6",
    name: "Box Jumps",
    type: "plyo",
    category: "Lower Body Power",
    primaryMuscles: ["Quadriceps", "Calves"],
    description: "Explosive jumping exercise for power development"
  },
  {
    id: "7",
    name: "Medicine Ball Slams",
    type: "plyo",
    category: "Full Body Power",
    primaryMuscles: ["Core", "Shoulders", "Back"],
    description: "Explosive full body exercise for power development"
  },
  // Speed/Jumping Exercises
  {
    id: "8",
    name: "Sprint Starts",
    type: "speed",
    category: "Speed",
    primaryMuscles: ["Quadriceps", "Hamstrings", "Calves"],
    description: "Acceleration and sprint technique development"
  },
  {
    id: "9",
    name: "Depth Jumps",
    type: "speed",
    category: "Jumping",
    primaryMuscles: ["Quadriceps", "Calves"],
    description: "Reactive jumping exercise for power development"
  }
];

export default function ExercisesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Exercises</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Exercise
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Exercises</TabsTrigger>
          <TabsTrigger value="upper">Upper Body</TabsTrigger>
          <TabsTrigger value="lower">Lower Body</TabsTrigger>
          <TabsTrigger value="plyo">Plyometrics</TabsTrigger>
          <TabsTrigger value="speed">Speed & Jumping</TabsTrigger>
        </TabsList>

        {["all", "upper", "lower", "plyo", "speed"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="grid grid-cols-2 gap-6">
              {exercises
                .filter(exercise => tab === "all" || exercise.type === tab)
                .map((exercise) => (
                  <Card key={exercise.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg font-bold">
                        {exercise.name}
                      </CardTitle>
                      <Badge variant="outline">
                        {exercise.category}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          {exercise.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.primaryMuscles.map((muscle) => (
                            <Badge key={muscle} variant="secondary">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 