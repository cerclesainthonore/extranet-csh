import {Select, Option, SelectProps} from "@mui/joy";
import {useTranslation} from "react-i18next";

const AuthorSelect = ({authors, ...props}: {authors: string[]} & SelectProps<string, false>) => {
    const {t} = useTranslation();

    return (
        <>
            <Select
                {...props}
                placeholder={t("conferences.placeholders.authors")}
                sx={{ minWidth: '15rem' }}
                slotProps={{
                    listbox: {
                        sx: {
                            width: '100%',
                        },
                    },
                }}
            >
                {authors.map(author => <Option value={author}>{author}</Option>)}
            </Select>
        </>
    );
}

export {AuthorSelect};