import {Box, Chip, Select, Option, SelectProps} from "@mui/joy";
import {useTranslation} from "react-i18next";

const TagSelect = ({tags, ...props}: {tags: string[]} & SelectProps<string, true>) => {
    const {t} = useTranslation();

    return (
        <>
            <Select
                {...props}
                placeholder={t("conferences.placeholders.tags")}
                multiple
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                        {selected.map((selectedOption) => (
                            <Chip variant="soft" color="primary">
                                {selectedOption.label}
                            </Chip>
                        ))}
                    </Box>
                )}
                sx={{ minWidth: '15rem' }}
                slotProps={{
                    listbox: {
                        sx: {
                            width: '100%',
                        },
                    },
                }}
            >
                {tags.map(tag => <Option value={tag}>{t("conferences.tags." + tag)}</Option>)}
            </Select>
        </>
    );
}

export {TagSelect};