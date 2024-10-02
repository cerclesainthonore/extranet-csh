import {ReactNode, useState} from "react";
import {IConferenceProps} from "../../controller/controller.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {getRootCssStyles} from './cssUtils.js';
import {initials} from "./bookshelf_functions.ts";

import "./bookshelf.css";

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<Type>(array: Array<Type>) {
    return array[Math.floor(Math.random() * array.length)];
}

const availablePatterns = getRootCssStyles();

const availableColors = [
    "maroon",
    "darkgreen",
    "darkolivegreen",
    "brown",
    "saddlebrown",
    "sienna",
    "midnightblue",
];

const Book = ({
                  title,
                  author,
                  coverFilename,
              }: IConferenceProps) => {
    const [randomHeight] = useState(getRandomInt(220, 280))
    const [randomPattern] = useState(randomChoice<string>(availablePatterns));
    const [randomColor] = useState(randomChoice<string>(availableColors));

    return (
        <div
            className="book"
        >
            <div
                className="side spine"
                style={{
                    height: `${randomHeight}px`,
                    top: `${280 - randomHeight}px`,
                    backgroundImage: `var(${randomPattern})`,
                    backgroundColor: randomColor,
                }}
            >
                <span className="spine-title">{title}</span>
                <span
                    className="spine-author"
                    style={{
                        left: `${initials(author).length > 2 ? "10" : "20"}%`
                    }}
                >
                    {initials(author)}
                </span>
            </div>
            <div
                className="side top"
                style={{
                    top: `${280 - randomHeight}px`,
                }}
            ></div>
            <div
                className="side cover"
                style={{
                    backgroundImage: `url("/assets/conferences/${coverFilename ?? "notfound.png"}")`,
                    height: `${randomHeight}px`,
                    top: `${280 - randomHeight}px`
                }}
            ></div>
        </div>
    );
}

const Bookshelf = ({conferenceList}: {conferenceList: IConferenceProps[]}): ReactNode => {
    return (
        <div className="bookshelf">
            {conferenceList.map((conference) => <Book {...conference}/>)}
        </div>
    );
}

export {Bookshelf, Book}