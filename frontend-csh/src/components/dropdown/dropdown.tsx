import {ReactNode, useState} from "react";

import './dropdown.css';

interface IDropdownProps {
    className?: string;
    title: string;
    options: ReactNode[];
}

const Dropdown = (props: IDropdownProps) => {
    const [open, setOpen] = useState(true);

    return (
        <div
            className={"csh-dropdown " + props.className}
            onClick={() => {
                setOpen(!open)
            }}
            onBlur={() => setOpen(false)}
            tabIndex={0}
        >
            <div className="csh-dropdown-title">
                <span>
                    {props.title}
                    <div className={`csh-dropdown-arrow ${open ? "active" : ""}`}></div>
                </span>
            </div>
            <div className={`csh-dropdown-options ${open ? "active" : ""}`}>
                {props.options.map((option: ReactNode, index: number) => {
                    return (
                        <div className="csh-dropdown-option" key={index}>
                            <>{option}</>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export type {IDropdownProps};
export {Dropdown};