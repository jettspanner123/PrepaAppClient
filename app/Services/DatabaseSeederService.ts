import { database } from "@/app/Configurations/FirebaseConfiguration";
import { WorkoutSessionDataType } from "@/app/Types/WorkoutSessionDataType";
import { push, ref, set } from "firebase/database";
import DatabaseService from "./DatabaseService";

export default class DatabaseSeederService {
    public static current = new DatabaseSeederService();

    private constructor() {}

    /**
     * Seeds completed workout sessions if the database is currently empty
     */
    public async seedIfEmpty(): Promise<void> {
        try {
            const sessions = await DatabaseService.getInstance().getWorkoutSessions();
            if (!sessions || Object.keys(sessions).length === 0) {
                console.log(
                    "[DatabaseSeederService] No sessions found, seeding example workout history...",
                );
                await this.seedExampleSessions();
            }
        } catch (error) {
            console.error(
                "[DatabaseSeederService] Error checking/seeding sessions:",
                error,
            );
        }
    }

    /**
     * Push sample workout session history entries to Firebase
     */
    public async seedExampleSessions(): Promise<void> {
        const sessionsRef = ref(database, "users/jettspanner123/sessions");

        const now = Date.now();
        const twoHoursAgo = now - 2 * 60 * 60 * 1000;
        const oneDayAgo = now - 24 * 60 * 60 * 1000;
        const threeDaysAgo = now - 3 * 24 * 60 * 60 * 1000;

        const exampleSessions: WorkoutSessionDataType[] = [
            {
                workoutId: "chest",
                workoutName: "Chest Day",
                durationSeconds: 2850,
                completedAt: twoHoursAgo,
                exercises: [
                    {
                        id: "1",
                        index: 1,
                        category: "Strength",
                        name: "Bench Press",
                        sets: [
                            {
                                id: "1-1",
                                setNumber: 1,
                                totalSets: 3,
                                weightPlaceholder: "80",
                                repsPlaceholder: "10",
                                completed: true,
                            },
                            {
                                id: "1-2",
                                setNumber: 2,
                                totalSets: 3,
                                weightPlaceholder: "80",
                                repsPlaceholder: "9",
                                completed: true,
                            },
                            {
                                id: "1-3",
                                setNumber: 3,
                                totalSets: 3,
                                weightPlaceholder: "80",
                                repsPlaceholder: "8",
                                completed: true,
                            },
                        ],
                    },
                    {
                        id: "2",
                        index: 2,
                        category: "Hypertrophy",
                        name: "Cable Fly / Pec Dec",
                        sets: [
                            {
                                id: "2-1",
                                setNumber: 1,
                                totalSets: 2,
                                weightPlaceholder: "25",
                                repsPlaceholder: "12",
                                completed: true,
                            },
                            {
                                id: "2-2",
                                setNumber: 2,
                                totalSets: 2,
                                weightPlaceholder: "25",
                                repsPlaceholder: "11",
                                completed: true,
                            },
                        ],
                    },
                ],
            },
            {
                workoutId: "back",
                workoutName: "Back Day",
                durationSeconds: 3120,
                completedAt: oneDayAgo,
                exercises: [
                    {
                        id: "1",
                        index: 1,
                        category: "Strength",
                        name: "Deadlift",
                        sets: [
                            {
                                id: "1-1",
                                setNumber: 1,
                                totalSets: 4,
                                weightPlaceholder: "100",
                                repsPlaceholder: "8",
                                completed: true,
                            },
                            {
                                id: "1-2",
                                setNumber: 2,
                                totalSets: 4,
                                weightPlaceholder: "100",
                                repsPlaceholder: "8",
                                completed: true,
                            },
                            {
                                id: "1-3",
                                setNumber: 3,
                                totalSets: 4,
                                weightPlaceholder: "100",
                                repsPlaceholder: "6",
                                completed: true,
                            },
                            {
                                id: "1-4",
                                setNumber: 4,
                                totalSets: 4,
                                weightPlaceholder: "100",
                                repsPlaceholder: "5",
                                completed: true,
                            },
                        ],
                    },
                    {
                        id: "2",
                        index: 2,
                        category: "Volume",
                        name: "Lat Pulldowns",
                        sets: [
                            {
                                id: "2-1",
                                setNumber: 1,
                                totalSets: 3,
                                weightPlaceholder: "60",
                                repsPlaceholder: "10",
                                completed: true,
                            },
                            {
                                id: "2-2",
                                setNumber: 2,
                                totalSets: 3,
                                weightPlaceholder: "60",
                                repsPlaceholder: "10",
                                completed: true,
                            },
                            {
                                id: "2-3",
                                setNumber: 3,
                                totalSets: 3,
                                weightPlaceholder: "60",
                                repsPlaceholder: "8",
                                completed: true,
                            },
                        ],
                    },
                ],
            },
            {
                workoutId: "arms",
                workoutName: "Arms Day",
                durationSeconds: 2400,
                completedAt: threeDaysAgo,
                exercises: [
                    {
                        id: "1",
                        index: 1,
                        category: "Hypertrophy",
                        name: "EZ Bar Curls",
                        sets: [
                            {
                                id: "1-1",
                                setNumber: 1,
                                totalSets: 3,
                                weightPlaceholder: "30",
                                repsPlaceholder: "12",
                                completed: true,
                            },
                            {
                                id: "1-2",
                                setNumber: 2,
                                totalSets: 3,
                                weightPlaceholder: "30",
                                repsPlaceholder: "11",
                                completed: true,
                            },
                            {
                                id: "1-3",
                                setNumber: 3,
                                totalSets: 3,
                                weightPlaceholder: "30",
                                repsPlaceholder: "10",
                                completed: true,
                            },
                        ],
                    },
                    {
                        id: "2",
                        index: 2,
                        category: "Isolation",
                        name: "Skull Crushers",
                        sets: [
                            {
                                id: "2-1",
                                setNumber: 1,
                                totalSets: 3,
                                weightPlaceholder: "25",
                                repsPlaceholder: "12",
                                completed: true,
                            },
                            {
                                id: "2-2",
                                setNumber: 2,
                                totalSets: 3,
                                weightPlaceholder: "25",
                                repsPlaceholder: "10",
                                completed: true,
                            },
                            {
                                id: "2-3",
                                setNumber: 3,
                                totalSets: 3,
                                weightPlaceholder: "25",
                                repsPlaceholder: "10",
                                completed: true,
                            },
                        ],
                    },
                ],
            },
        ];

        for (const session of exampleSessions) {
            const newSessionRef = push(sessionsRef);
            await set(newSessionRef, session);
        }
        console.log("[DatabaseSeederService] Successfully seeded 3 workout sessions.");
    }
}
