
type GenericButtonProps = {
    title: string;
    onClick: () => void;
    icon?: React.ReactNode;
}

export function GenericButton({ onClick, icon, title }: GenericButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
                flex overflow-hidden justify-center items-center
                bg-transparent cursor-pointer text-white
                hover:bg-white hover:text-black px-4 py-2
            "
        >
            <div className="flex w-[30%] h-full justify-center items-center bg-inherit ">
                <span className="flex justify-start items-center w-7 h-7 text-inherit ">
                    {icon}
                </span>
            </div>

            <div className="flex w-[70%] h-full items-center justify-start pl-2 ">
                <span className="font-bold text-inherit">{title}</span>
            </div>
        </button>
    );
}