import { Platform } from "react-native";
import AppleHealthKit, {
    HealthKitPermissions,
    HealthValue,
} from "react-native-health";

export default class AppleHealthKitService {
    public static current = new AppleHealthKitService();

    private isInitialized = false;

    private constructor() {}

    public init(): Promise<boolean> {
        return new Promise((resolve) => {
            if (Platform.OS !== "ios") {
                console.log(
                    "[AppleHealthKitService] Not iOS platform, skipping init.",
                );
                resolve(false);
                return;
            }

            // Check if HealthKit module is available
            if (!AppleHealthKit || typeof AppleHealthKit.initHealthKit !== "function") {
                console.warn(
                    "[AppleHealthKitService] AppleHealthKit native module is not available.",
                );
                resolve(false);
                return;
            }

            const stepsPermission = AppleHealthKit.Constants?.Permissions?.Steps || "Steps";

            const permissions: HealthKitPermissions = {
                permissions: {
                    read: [stepsPermission],
                    write: [],
                },
            };

            AppleHealthKit.initHealthKit(permissions, (error: string) => {
                if (error) {
                    console.error(
                        "[AppleHealthKitService] HealthKit initialization failed:",
                        error,
                    );
                    resolve(false);
                    return;
                }
                this.isInitialized = true;
                console.log(
                    "[AppleHealthKitService] HealthKit successfully initialized.",
                );
                resolve(true);
            });
        });
    }

    public getStepsToday(): Promise<number> {
        return new Promise((resolve) => {
            if (Platform.OS !== "ios") {
                // Return default mock steps for non-iOS platforms
                resolve(8432);
                return;
            }

            // Check if HealthKit is available before doing anything
            if (!AppleHealthKit || typeof AppleHealthKit.getStepCount !== "function") {
                resolve(8432);
                return;
            }

            const startOfToday = new Date();
            startOfToday.setHours(0, 0, 0, 0);

            const options = {
                startDate: startOfToday.toISOString(),
                endDate: new Date().toISOString(),
            };

            if (!this.isInitialized) {
                // Try initializing first
                this.init().then((success) => {
                    if (!success) {
                        resolve(8432);
                        return;
                    }
                    this.querySteps(options, resolve);
                });
            } else {
                this.querySteps(options, resolve);
            }
        });
    }

    private querySteps(
        options: { startDate: string; endDate: string },
        resolve: (val: number) => void,
    ): void {
        if (!AppleHealthKit || typeof AppleHealthKit.getStepCount !== "function") {
            resolve(8432);
            return;
        }

        AppleHealthKit.getStepCount(
            options,
            (err: object | string, results: HealthValue) => {
                if (err) {
                    console.error(
                        "[AppleHealthKitService] Error querying steps:",
                        err,
                    );
                    resolve(8432);
                    return;
                }
                resolve(results.value || 0);
            },
        );
    }
}
