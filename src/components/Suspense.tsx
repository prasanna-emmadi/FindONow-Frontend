type WithFetchingProps<T> = ({ data }: { data: T }) => JSX.Element

interface Props<T> {
    data: T;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: any;
    Component: WithFetchingProps<T>;
}


const Suspense = <T,>({ data, isLoading, isSuccess, isError, error, Component }: Props<T>) => {
    let content

    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isSuccess) {
        content = <Component data={data} />

    } else if (isError) {
        content = <div>{error.toString()}</div>
    } else {
        content = <div />;
    }

    return content;
}

export default Suspense