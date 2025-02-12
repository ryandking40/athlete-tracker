'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type ExerciseType = 'upper' | 'lower' | 'plyo' | 'speed';

interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  category: string;
  primaryMuscles: string[];
  description: string;
}

// Move exercises data to a constant
const initialExercises: Exercise[] = [
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

// Add categories constant
const categories = {
  upper: ["Push", "Pull", "Arms", "Shoulders"],
  lower: ["Legs", "Posterior Chain"],
  plyo: ["Lower Body Power", "Upper Body Power", "Full Body Power"],
  speed: ["Speed", "Jumping", "Agility"]
};

const muscleGroups = [
  "Chest", "Back", "Shoulders", "Triceps", "Biceps", 
  "Quadriceps", "Hamstrings", "Glutes", "Calves", 
  "Core", "Lower Back"
];

// Define the form schema
const exerciseFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["upper", "lower", "plyo", "speed"]),
  category: z.string().min(1, "Category is required"),
  primaryMuscles: z.array(z.string()).min(1, "At least one primary muscle is required"),
  description: z.string().min(1, "Description is required"),
});

type ExerciseFormValues = z.infer<typeof exerciseFormSchema>;

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<ExerciseFormValues>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      name: "",
      type: "upper",
      category: "",
      primaryMuscles: [],
      description: ""
    }
  });

  const onSubmit = (data: ExerciseFormValues) => {
    const newExercise: Exercise = {
      id: (exercises.length + 1).toString(),
      ...data
    };
    setExercises([...exercises, newExercise]);
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Exercises</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Exercise
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Exercise</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exercise Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter exercise name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exercise Type</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue("category", "");
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select exercise type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="upper">Upper Body</SelectItem>
                          <SelectItem value="lower">Lower Body</SelectItem>
                          <SelectItem value="plyo">Plyometrics</SelectItem>
                          <SelectItem value="speed">Speed & Jumping</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        disabled={!form.watch("type")}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {form.watch("type") &&
                            categories[form.watch("type") as keyof typeof categories].map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="primaryMuscles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Muscles</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const currentMuscles = field.value || [];
                          if (!currentMuscles.includes(value)) {
                            field.onChange([...currentMuscles, value]);
                          }
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select muscles" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {muscleGroups.map((muscle) => (
                            <SelectItem key={muscle} value={muscle}>
                              {muscle}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value?.map((muscle: string) => (
                          <Badge
                            key={muscle}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => {
                              field.onChange(
                                field.value.filter((m: string) => m !== muscle)
                              );
                            }}
                          >
                            {muscle} ×
                          </Badge>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter exercise description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Exercise</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
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
                .filter((exercise: Exercise) => tab === "all" || exercise.type === tab)
                .map((exercise: Exercise) => (
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
                          {exercise.primaryMuscles.map((muscle: string) => (
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