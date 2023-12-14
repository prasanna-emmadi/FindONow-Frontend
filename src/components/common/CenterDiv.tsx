import { ReactNode } from "react";

interface ChildrenProps {
    children: ReactNode;
}

const CenterDiv = ({ children }: ChildrenProps) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            {children}
        </div>
    );
};

export default CenterDiv;