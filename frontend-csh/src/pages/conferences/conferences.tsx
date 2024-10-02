import {ReactNode, Suspense, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Bookshelf, TagSelect} from "../../components";
import {Divider} from "@mui/joy";
import {FallingLines} from "react-loader-spinner";
import {Controller, IConferenceProps} from "../../controller/controller.ts";

const stringToDate = (s: string) => {
    return new Date(s).getTime();
};

const containsAll = (arr1: string[], arr2: string[]) => {
    return arr2.every(item => arr1.includes(item));
}

const Conferences = (): ReactNode => {
    //const {t} = useTranslation();

    const [conferenceList, setConferenceList] = useState<Array<IConferenceProps>>([]);
    useEffect(() => {
        Controller.getAllConferences().then((conferences: Array<IConferenceProps>) => {
            setConferenceList(conferences.sort((a, b) => stringToDate(b.date) - stringToDate(a.date)));
        });
    }, []);

    const [tagList, setTagList] = useState<Array<string>>([]);
    useEffect(() => {
        Controller.getConferenceTags().then((tags: Array<string>) => {
            setTagList(tags);
        });
    }, []);

    const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

    const [displayedConferences, setDisplayedConferences] = useState<Array<IConferenceProps>>([]);
    useEffect(() => {
        if (selectedTags.length > 0) {
            setDisplayedConferences(conferenceList.filter((value) => containsAll(value.tags, selectedTags)));
        } else {
            setDisplayedConferences(conferenceList);
        }
    }, [conferenceList, selectedTags]);

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
                    <TagSelect tags={tagList} onChange={(_event, value) => setSelectedTags(value)}/>
                </div>
                <Bookshelf conferenceList={displayedConferences}/>
            </Suspense>
        </div>
    );
};

export {Conferences};
