import { ReactNode } from "react";

interface CenterColumnDivProps {
    children: ReactNode;
    backgroundColor?: string;
}

const CenterColumnDiv = ({
    children,
    backgroundColor,
}: CenterColumnDivProps) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                width: "100%",
                height: "100%",
                backgroundColor: backgroundColor,
            }}
        >
            {children}
        </div>
    );
};

export default CenterColumnDiv;