# Coding Rules

Add your rules below. Kiro will follow these before writing any code.

## General

- (e.g. Always use TypeScript, never use `any`)
- (e.g. Use as much code splitting, into components or controller as you can, the code space must be need and clean).
- (e.g. Always use singleon default exported function if the funciton is not a functional component.)

    ```typescript
    // Defination
    export default class SomeClass {
        public static current = new SomeClass();

        public function isWorking(): boolean {
            return true;
        }
    }

    // Useage
    SomeClass.current.isWorking();
    ```

- Everything should be fully typed:
    ```typescript
    export default function App(): React.JSX.Element {
        return (
            <View>
            </View>
        )
    }
    ```

## Styling

- (e.g. Use NativeWind/Tailwind classes only, no inline styles)
- (e.g. Take reference from `DESIGN.md` file before writing any code. )
- (e.g. Always write code for components and styles for dark mode only.)
- **All colors must come from `app/Constants/ColorFactoryCON.tsx`. Never hardcode a color string (e.g. `"#fff"`, `"black"`, `"rgba(...)"`) anywhere in the codebase. If the required color does not exist in `ColorFactoryCON`, add it there first, then use it.**

    ```typescript
    // Wrong
    <View style={{ backgroundColor: "#111111" }} />

    // Correct
    import ColorFactoryCON from "@/Constants/ColorFactoryCON";
    <View style={{ backgroundColor: ColorFactoryCON.INK }} />
    ```

- **All padding, margin, gap, and spacing values must come from `app/Constants/EdgeInsetsCON.tsx`. Never hardcode a numeric spacing value inline. If the required value does not exist in `EdgeInsetsCON`, add it there first, then use it.**

    ```typescript
    // Wrong
    <View style={{ padding: 16, marginTop: 24 }} />

    // Correct
    import EdgeInsetsCON from "@/Constants/EdgeInsetsCON";
    <View style={{ padding: EdgeInsetsCON.LG, marginTop: EdgeInsetsCON.XL }} />
    ```

- (e.g. If you really need to use inline styles, create a file like `app/features/${folderName}/Styles/HomeScreenStyles.tsx`, the name of the file should end with `*Styles`, and should be in PascalCase).

    ```typescript
    // Defination
    export default class HomeScreenStyles {
        public static BUTTON_STYLES = StyleSheet.create({
            BUTTON_WRAPPER: {}
        });
    }

    // Usage
    <View style={HomeScreenStyles.BUTTON_STYLES.BUTTON_WRAPPER}>
    </View>
    ```

## Components

- (e.g. Always use functional Components with named exports, `export default FunctionName()`)

## File Structure

- (e.g. If a component is only used in one file, the it should go in the `app/features/${folderName}/Components/static/` folder, and the name of the file should be something like `${folderName}${componentName}StaticComponent`, example if the feature name is `HomeScreen` then `app/features/HomeScreen/Components/static/HomeScreenHeroSectionStaticComponent.tsx`)
- (e.g. If a component is used in more than one file, the it should go in the `app/features/${folderName}/Components/shared/` folder, example `app/features/HomeScreen/Components/shared/HomeScreenButtonComponent.tsx`)
- (e.g. Every features folder should have a root controller file, if the name of the folder is `app/features/HomeScreen`, then this is the files / folder it should have.)
  Root Controller: `app/features/HomeScreen/HomeScreenController.tsx`
  Static Components Folder: `app/features/HomeScreen/Components/static`
  Shared Components Folder: `app/features/HomeScreen/Components/shared`
  Service Folder: `app/features/HomeScreen/Services`
  Controllers Components Folder: `app/features/HomeScreen/Controllers`
  Constants Folder: `app/features/HomeScreen/Constants`

## Naming

- (e.g. If a component that will have other Components in it should have the name `*ScreenController`, and should be in PascalCase, example, fileName: HomeScreenController.tsx, componentName: HomeScreenController)
- (e.g. If a component that does not have any other component in it should have the name `*ScreenComponent`, and should be in PascalCase, fileName: ButtonComponent.tsx, componentName: ButtonComponent)
- (e.g. All the constants should be stored in the `app/features/${folderName}/Constants`)
    - The name of the constant file should end with `*CON`, should be in PascalCase, all the constant value in the constant class should be in full caps ( and should be public static readonly ).

    ```typescript
    // Defination
    export default class HomeScreenCON {
        public static readonly PAGE_NAME: string = "HomeScreen";
    }

    // Usage
    const something = HomeScreenCON.PAGE_NAME;
    ```

- (e.g. All the controller views should be stored in the `app/features/${folderName}/Controllers`)
    - The name of the controller file should end with `*Controller`, should be in PascalCase.

    ```typescript
    // Defination
    export default function HomeScreenTwinButtonController {
        return (
            <View>
            </View>
        )
    }

    // Usage
    <HomeScreenTwinButtonController />
    ```

- (e.g. All the helper class should be stored in the `app/Helpers`)
    - The name of the helper file should end with `*Helper`, should be in PascalCase. It should be a singleton.

    ```typescript
    // Defination
    export default class HomeScreenHelper {
        public static current = new HomeScreenHelper();

        public void doSomething() {

        }
    }

    // Usage
    HomeScreenHelper.current.doSomething();
    ```

- (e.g. All the util class should be stored in the `app/Utils`)
    - The name of the helper file should end with `*Utility`, should be in PascalCase. It should be a singleton.

    ```typescript
    // Defination
    export default class HomeScreenUtility {
        public static current = new HomeScreenUtility();

        public void doSomething() {

        }
    }

    // Usage
    HomeScreenUtility.current.doSomething();
    ```
