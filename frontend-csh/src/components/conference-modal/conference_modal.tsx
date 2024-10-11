import {Modal, ModalClose, Typography, Box, Divider, Chip, ModalDialog} from "@mui/joy";
import {IConferenceDetailProps} from "../../controller/controller.ts";

const ConferenceModal = ({
                             _id,
                             title,
                             authors,
                             date,
                             tags,
                             summary,
                             link,
                             onClose
                         }: IConferenceDetailProps & { onClose: () => void }) => {

    const renderYouTubeEmbed = (link: string | undefined) => {
        return link ? (
            <Box sx={{mt: 2}}>
                <iframe
                    width="100%"
                    height="400"
                    src={link}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </Box>
        ) : null;
    };

    return (
        <Modal
            id={_id}
            open={true}
            onClose={onClose}
        >
            <ModalDialog>
                <ModalClose/>
                <Box sx={{p: 2}}>
                    <Typography component="h2" level="h4" sx={{mb: 1}}>
                        {title}
                    </Typography>

                    <Typography sx={{mb: 2}}>
                        {authors.join(", ")}
                    </Typography>

                    <Typography sx={{mb: 1}}>
                        Date: {date}
                    </Typography>

                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', mb: 2}}>
                        {tags.map((tag) => (
                            <Chip key={tag} size="sm" variant="soft" color="primary">
                                {tag}
                            </Chip>
                        ))}
                    </Box>

                    <Divider sx={{my: 2}}/>

                    <Typography sx={{mb: 2}}>
                        {summary}
                    </Typography>

                    {renderYouTubeEmbed(link)}
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export {ConferenceModal};
