import {Select, Option, SelectProps} from "@mui/joy";

const AuthorSelect = ({authors, ...props}: {authors: string[]} & SelectProps<string, false>) => {
    return (
        <>
            <Select
                {...props}
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