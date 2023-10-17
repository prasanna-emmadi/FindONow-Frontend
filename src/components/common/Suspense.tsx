import { LinearProgress } from "@mui/material";

type WithFetchingProps<T> = ({ data }: { data: NonNullable<T> }) => JSX.Element;

// Usage of generics here
// since we do not know the type of the props being passed, we need to use a generic T
// props being passed, need to have a data which the Component would expect
// thus we generalize the Props for all the components
interface Props<T> {
    data: T;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: any;
    Component: WithFetchingProps<T>;
}

// Suspense is a Wrapper component which takes the result of hook from apiSlice
// it behaves as follows in the following cases
// in error case renders error
// in loading case shows loading indicator
// in success case renders the Component passed
const Suspense = <T,>({
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    Component,
}: Props<T>) => {
    let content;

    if (isLoading) {
        content = <LinearProgress />;
    } else if (isSuccess && data) {
        content = <Component data={data} />;
    } else if (isError) {
        content = <div>{error.toString()}</div>;
    } else {
        content = <div />;
    }

    return content;
};

export default Suspense;
