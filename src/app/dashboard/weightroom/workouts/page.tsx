'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Plus, ChevronDown, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Types
interface Exercise {
  id: string;
  name: string;
  type: 'upper' | 'lower' | 'plyo' | 'speed';
  category: string;
  primaryMuscles: string[];
  description: string;
}

interface SetConfig {
  reps: string;
  intensity: string;
}

interface WorkoutExercise {
  exerciseId: string;
  exercise: Exercise;
  sets: SetConfig[];
  notes?: string;
}

interface Workout {
  id: string;
  name: string;
  description: string;
  type: 'strength' | 'power' | 'conditioning';
  exercises: WorkoutExercise[];
}

interface TrainingBlock {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  workouts: Workout[];
}

// Mock data for exercises (simplified version of what we have in exercises page)
const availableExercises: Exercise[] = [
  {
    id: "1",
    name: "Bench Press",
    type: "upper",
    category: "Push",
    primaryMuscles: ["Chest", "Shoulders", "Triceps"],
    description: "Compound pushing movement"
  },
  {
    id: "2",
    name: "Back Squat",
    type: "lower",
    category: "Legs",
    primaryMuscles: ["Quadriceps", "Glutes"],
    description: "Compound lower body movement"
  },
  // Add more exercises as needed
];

// Mock data for training blocks
const initialBlocks: TrainingBlock[] = [
  {
    id: "1",
    name: "Pre-Season Strength Block",
    description: "Focus on building base strength and power",
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    workouts: [
      {
        id: "1",
        name: "Upper Body Strength A",
        description: "Primary push focus with supplementary pull movements",
        type: "strength",
        exercises: [
          {
            exerciseId: "1",
            exercise: availableExercises[0],
            sets: [
              { reps: "6-8", intensity: "75% 1RM" },
              { reps: "6-8", intensity: "75% 1RM" },
            ],
            notes: "Focus on controlled eccentric"
          },
          // Add more exercises
        ]
      },
      // Add more workouts
    ]
  },
  {
    id: "2",
    name: "In-Season Maintenance",
    description: "Maintain strength while managing fatigue",
    startDate: "2024-03-01",
    endDate: "2024-03-28",
    workouts: []
  }
];

// Update the exerciseConfigSchema
const exerciseConfigSchema = z.object({
  exerciseId: z.string().min(1, "Exercise is required"),
  sets: z.array(z.object({
    reps: z.string().min(1, "Reps are required"),
    intensity: z.string().min(1, "Intensity is required"),
  })),
  notes: z.string().optional(),
});

type ExerciseFormValues = z.infer<typeof exerciseConfigSchema>;

// Update the workoutFormSchema
const workoutFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["strength", "power", "conditioning"]),
  blockId: z.string().min(1, "Training block is required"),
  exercises: z.array(exerciseConfigSchema)
});

// Update the WorkoutFormValues type
type WorkoutFormValues = {
  name: string;
  description: string;
  type: 'strength' | 'power' | 'conditioning';
  blockId: string;
  exercises: WorkoutExercise[];
};

// Form schema for creating/editing a training block
const blockFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

type BlockFormValues = z.infer<typeof blockFormSchema>;

export default function WorkoutsPage() {
  const [blocks, setBlocks] = useState<TrainingBlock[]>(initialBlocks);
  const [isWorkoutDialogOpen, setIsWorkoutDialogOpen] = useState(false);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [expandedBlocks, setExpandedBlocks] = useState<string[]>([blocks[0]?.id]);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [editingBlock, setEditingBlock] = useState<TrainingBlock | null>(null);
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const workoutForm = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "strength",
      blockId: blocks[0]?.id,
      exercises: []
    }
  });

  const blockForm = useForm<BlockFormValues>({
    resolver: zodResolver(blockFormSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: ""
    }
  });

  const exerciseForm = useForm<ExerciseFormValues>({
    resolver: zodResolver(exerciseConfigSchema),
    defaultValues: {
      exerciseId: "",
      sets: [{ reps: "", intensity: "" }],
      notes: undefined
    }
  });

  useEffect(() => {
    if (editingWorkout) {
      workoutForm.reset({
        name: editingWorkout.name,
        description: editingWorkout.description,
        type: editingWorkout.type,
        blockId: blocks.find(block => 
          block.workouts.some(w => w.id === editingWorkout.id)
        )?.id || blocks[0]?.id,
        exercises: editingWorkout.exercises.map(e => ({
          exerciseId: e.exerciseId,
          sets: e.sets,
          notes: e.notes || ""
        }))
      });
    }
  }, [editingWorkout]);

  useEffect(() => {
    if (editingBlock) {
      blockForm.reset({
        name: editingBlock.name,
        description: editingBlock.description,
        startDate: editingBlock.startDate,
        endDate: editingBlock.endDate
      });
    }
  }, [editingBlock]);

  const onSubmitWorkout = (data: WorkoutFormValues) => {
    const workoutData: Workout = {
      id: editingWorkout?.id || Math.random().toString(36).substr(2, 9),
      name: data.name,
      description: data.description,
      type: data.type,
      exercises: data.exercises.map(exercise => ({
        exerciseId: exercise.exerciseId,
        exercise: availableExercises.find(e => e.id === exercise.exerciseId)!,
        sets: exercise.sets,
        notes: exercise.notes
      }))
    };

    if (editingWorkout) {
      setBlocks(prevBlocks => prevBlocks.map(block => ({
        ...block,
        workouts: block.workouts.map(workout =>
          workout.id === editingWorkout.id ? workoutData : workout
        )
      })));
    } else {
      setBlocks(prevBlocks => prevBlocks.map(block => 
        block.id === data.blockId
          ? { ...block, workouts: [...block.workouts, workoutData] }
          : block
      ));
    }

    setIsWorkoutDialogOpen(false);
    setEditingWorkout(null);
    workoutForm.reset();
  };

  const onSubmitBlock = (data: BlockFormValues) => {
    if (editingBlock) {
      // Update existing block
      setBlocks(blocks.map(block =>
        block.id === editingBlock.id
          ? { ...block, ...data }
          : block
      ));
    } else {
      // Create new block
      const newBlock: TrainingBlock = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        workouts: []
      };
      setBlocks([...blocks, newBlock]);
    }

    setIsBlockDialogOpen(false);
    setEditingBlock(null);
    blockForm.reset();
  };

  const deleteWorkout = (workoutId: string) => {
    setBlocks(blocks.map(block => ({
      ...block,
      workouts: block.workouts.filter(w => w.id !== workoutId)
    })));
  };

  const deleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(b => b.id !== blockId));
  };

  const toggleBlock = (blockId: string) => {
    setExpandedBlocks(prev =>
      prev.includes(blockId)
        ? prev.filter(id => id !== blockId)
        : [...prev, blockId]
    );
  };

  const onSubmitExercise = (data: ExerciseFormValues) => {
    const exercise = availableExercises.find(e => e.id === data.exerciseId);
    if (!exercise) return;

    const workoutExercise: WorkoutExercise = {
      exerciseId: data.exerciseId,
      exercise,
      sets: data.sets,
      notes: data.notes
    };

    const currentExercises = workoutForm.getValues("exercises") || [];
    workoutForm.setValue("exercises", [...currentExercises, workoutExercise]);

    setIsAddingExercise(false);
    exerciseForm.reset();
  };

  const removeExercise = (index: number) => {
    const currentExercises = workoutForm.getValues("exercises") || [];
    workoutForm.setValue("exercises", currentExercises.filter((_, i) => i !== index));
  };

  const removeSet = (index: number) => {
    const currentSets = exerciseForm.getValues("sets") || [];
    exerciseForm.setValue("sets", currentSets.filter((_: SetConfig, i: number) => i !== index));
  };

  const ExerciseConfigurationForm = ({ form, onSubmit, onCancel }: {
    form: UseFormReturn<ExerciseFormValues>;
    onSubmit: (data: ExerciseFormValues) => void;
    onCancel: () => void;
  }) => {
    const addSet = () => {
      const currentSets = form.getValues("sets") || [];
      form.setValue("sets", [...currentSets, { reps: "", intensity: "" }]);
    };

    useEffect(() => {
      // Initialize with one set
      form.setValue("sets", [{ reps: "", intensity: "" }]);
    }, [form]);

    return (
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="exerciseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exercise" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableExercises.map(exercise => (
                    <SelectItem key={exercise.id} value={exercise.id}>
                      {exercise.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Sets Configuration</h4>
            <Button type="button" variant="outline" size="sm" onClick={addSet}>
              <Plus className="w-4 h-4 mr-2" />
              Add Set
            </Button>
          </div>

          {form.watch("sets")?.map((set: SetConfig, index: number) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">Set {index + 1}</h5>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSet(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`sets.${index}.reps`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reps</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 8-10 or AMRAP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`sets.${index}.intensity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Intensity</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 70% 1RM or RPE 8" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (optional)</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Exercise</Button>
        </div>
      </form>
    );
  };

  const ExerciseDialog = () => (
    <Dialog open={isAddingExercise} onOpenChange={setIsAddingExercise}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Exercise</DialogTitle>
        </DialogHeader>
        <Form {...exerciseForm}>
          <ExerciseConfigurationForm
            form={exerciseForm}
            onSubmit={onSubmitExercise}
            onCancel={() => setIsAddingExercise(false)}
          />
        </Form>
      </DialogContent>
    </Dialog>
  );

  const ExerciseFormDisplay = ({ exercise, onRemove }: { exercise: WorkoutExercise; onRemove: () => void }) => {
    const exerciseDetails = availableExercises.find(e => e.id === exercise.exerciseId);
    if (!exerciseDetails) return null;

    return (
      <div className="flex items-center justify-between p-3 rounded-lg border">
        <div>
          <p className="font-medium">{exerciseDetails.name}</p>
          <div className="space-y-1">
            {exercise.sets.map((set: SetConfig, index: number) => (
              <p key={index} className="text-sm text-muted-foreground">
                Set {index + 1}: {set.reps} reps @ {set.intensity}
              </p>
            ))}
          </div>
          {exercise.notes && (
            <p className="text-sm text-muted-foreground mt-1">
              Note: {exercise.notes}
            </p>
          )}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  const ExerciseDisplay = ({ exercise }: { exercise: WorkoutExercise }) => (
    <div className="space-y-2 p-3 rounded-lg border">
      <div className="flex items-center justify-between">
        <p className="font-medium">{exercise.exercise.name}</p>
        {exercise.notes && (
          <Badge variant="secondary">{exercise.notes}</Badge>
        )}
      </div>
      <div className="space-y-1">
        {exercise.sets.map((set: SetConfig, index: number) => (
          <p key={index} className="text-sm text-muted-foreground">
            Set {index + 1}: {set.reps} reps @ {set.intensity}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Workouts</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => {
            setEditingBlock(null);
            setIsBlockDialogOpen(true);
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Create Block
          </Button>
          <Button onClick={() => {
            setEditingWorkout(null);
            setIsWorkoutDialogOpen(true);
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Create Workout
          </Button>
        </div>
      </div>

      {/* Block Dialog */}
      <Dialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingBlock ? "Edit Training Block" : "Create Training Block"}
            </DialogTitle>
          </DialogHeader>
          <Form {...blockForm}>
            <form onSubmit={blockForm.handleSubmit(onSubmitBlock)} className="space-y-4">
              <FormField
                control={blockForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Block Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter block name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={blockForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter block description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={blockForm.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={blockForm.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => {
                  setIsBlockDialogOpen(false);
                  setEditingBlock(null);
                }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBlock ? "Save Changes" : "Create Block"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Exercise Configuration Dialog */}
      <ExerciseDialog />

      {/* Workout Dialog */}
      <Dialog open={isWorkoutDialogOpen} onOpenChange={setIsWorkoutDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editingWorkout ? "Edit Workout" : "Create Workout"}
            </DialogTitle>
          </DialogHeader>
          <Form {...workoutForm}>
            <form onSubmit={workoutForm.handleSubmit(onSubmitWorkout)} className="space-y-4">
              <FormField
                control={workoutForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workout Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter workout name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={workoutForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter workout description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={workoutForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workout Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select workout type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="strength">Strength</SelectItem>
                        <SelectItem value="power">Power</SelectItem>
                        <SelectItem value="conditioning">Conditioning</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={workoutForm.control}
                name="blockId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Training Block</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select training block" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {blocks.map(block => (
                          <SelectItem key={block.id} value={block.id}>
                            {block.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Exercises</h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddingExercise(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Exercise
                  </Button>
                </div>

                <div className="space-y-2">
                  {workoutForm.watch("exercises")?.map((exercise, index) => (
                    <ExerciseFormDisplay key={index} exercise={exercise} onRemove={() => removeExercise(index)} />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => {
                  setIsWorkoutDialogOpen(false);
                  setEditingWorkout(null);
                }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingWorkout ? "Save Changes" : "Create Workout"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {blocks.map(block => (
          <Card key={block.id}>
            <Collapsible
              open={expandedBlocks.includes(block.id)}
              onOpenChange={() => toggleBlock(block.id)}
            >
              <CardHeader className="cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-4">
                      <CardTitle>{block.name}</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingBlock(block);
                            setIsBlockDialogOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Are you sure you want to delete this block?')) {
                              deleteBlock(block.id);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{block.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">
                      {new Date(block.startDate).toLocaleDateString()} - {new Date(block.endDate).toLocaleDateString()}
                    </Badge>
                    {expandedBlocks.includes(block.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-4">
                    {block.workouts.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No workouts in this block yet.</p>
                    ) : (
                      block.workouts.map(workout => (
                        <Card key={workout.id}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-4">
                                  <CardTitle className="text-lg">{workout.name}</CardTitle>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        setEditingWorkout(workout);
                                        setIsWorkoutDialogOpen(true);
                                      }}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        if (confirm('Are you sure you want to delete this workout?')) {
                                          deleteWorkout(workout.id);
                                        }
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{workout.description}</p>
                              </div>
                              <Badge>{workout.type}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            {workout.exercises.length === 0 ? (
                              <div className="flex justify-center py-4">
                                <Button variant="outline" size="sm">
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Exercises
                                </Button>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {workout.exercises.map((exercise, index) => (
                                  <ExerciseDisplay key={index} exercise={exercise} />
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
} 