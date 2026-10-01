import Wrap from "../ui/Wrap";

// Loading / error line in place of the chapters (not part of the redesign); children = optional action
export default function WorkStatus({ role, message, children }) {
    return (
        <Wrap className="flex flex-wrap items-center gap-x-[26px] gap-y-3.5 py-16 text-cream-soft">
            <p role={role}>{message}</p>
            {children}
        </Wrap>
    );
}
