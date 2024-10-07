import {ReactNode, Suspense, useEffect, useState} from "react";
import {AuthorSelect, Bookshelf, TagSelect} from "../../components";
import {Divider, IconButton, ModalClose} from "@mui/joy";
import {FallingLines} from "react-loader-spinner";
import {Controller, IConferenceProps} from "../../controller/controller.ts";
import {sortByLastName} from "../../components/bookshelf/bookshelf_functions.ts";

import "./conferences.css";

const stringToDate = (s: string) => {
    return new Date(s).getTime();
};

const containsAll = (arr1: string[], arr2: string[]) => {
    return arr2.every(item => arr1.includes(item));
}

const Conferences = (): ReactNode => {
    const [conferenceList, setConferenceList] = useState<Array<IConferenceProps>>([]);
    useEffect(() => {
        Controller.getAllConferences().then((conferences: Array<IConferenceProps>) => {
            setConferenceList(conferences.sort((a, b) => stringToDate(b.date) - stringToDate(a.date)));
        });
    }, []);

    const [tagSet, setTagSet] = useState<Set<string>>(new Set<string>());
    const [authorSet, setAuthorSet] = useState<Set<string>>(new Set<string>());
    useEffect(() => {
        const tags = new Set<string>();
        const authors = new Set<string>();

        conferenceList.forEach(conference => {
            conference.tags.forEach(tag => tags.add(tag));
            conference.authors.forEach(author => authors.add(author));
        });

        setTagSet(tags)
        setAuthorSet(authors)
    }, [conferenceList]);

    const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
    const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);

    const [displayedConferences, setDisplayedConferences] = useState<Array<IConferenceProps>>([]);
    useEffect(() => {
        let conferences: Array<IConferenceProps> = conferenceList;

        if (selectedTags.length > 0) {
            conferences = conferences.filter((value) => containsAll(value.tags, selectedTags));
        }

        if (selectedAuthor) {
            conferences = conferences.filter((value) => value.authors.some(author => selectedAuthor === author));
        }

        setDisplayedConferences(conferences);
    }, [conferenceList, selectedAuthor, selectedTags]);

    return (
        <div id="conferences">
            <Divider/>
            <Suspense fallback={
                <FallingLines
                    color="#06265e"
                    width="100"
                    visible={true}
                />}
            >
                <div className="bookshelf-filters">
                    <TagSelect
                        value={selectedTags}
                        tags={Array.from(tagSet)}
                        onChange={(_event, value) => setSelectedTags(value)}
                        {...(selectedTags.length > 0 && {
                            endDecorator: (
                                <IconButton
                                    size="sm"
                                    variant="plain"
                                    color="neutral"
                                    onMouseDown={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onClick={() => {
                                        setSelectedTags([]);
                                    }}
                                >
                                    <ModalClose />
                                </IconButton>
                            ),
                            indicator: null,
                        })}
                    />
                    <AuthorSelect
                        value={selectedAuthor ?? ""}
                        authors={sortByLastName(Array.from(authorSet))}
                        onChange={(_event, value) => setSelectedAuthor(value)}
                        {...(selectedAuthor && {
                            endDecorator: (
                                <IconButton
                                    size="sm"
                                    variant="plain"
                                    color="neutral"
                                    onMouseDown={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onClick={() => {
                                        setSelectedAuthor(null);
                                    }}
                                >
                                    <ModalClose />
                                </IconButton>
                            ),
                            indicator: null,
                        })}
                    />
                </div>
                <Bookshelf conferenceList={displayedConferences}/>
            </Suspense>
        </div>
    );
};

export {Conferences};
