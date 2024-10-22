import {Modal, ModalClose, Typography, Box, Divider, Chip, ModalDialog} from "@mui/joy";
import {IConferenceDetailProps} from "../../controller/controller.ts";
import {useTranslation} from "react-i18next";

import "./conferences_modal.css";

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
    const {t} = useTranslation();

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
                <Box sx={[{p: 2}, { overflow: 'scroll' }]}>
                    <Typography component="h2" level="h4" sx={{mb: 1}} className="csh-conferences-modal-large">
                        {title}
                    </Typography>

                    <Typography sx={{mb: 2}} className="csh-conferences-modal-medium">
                        {authors.join(", ")}
                    </Typography>

                    <Typography sx={{mb: 1}} className="csh-conferences-modal-medium">
                        Date: {date}
                    </Typography>

                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', mb: 2}}>
                        {tags.map((tag) => (
                            <Chip key={tag} size="sm" variant="soft" color="primary">
                                {t("conferences.tags." + tag)}
                            </Chip>
                        ))}
                    </Box>

                    <Divider sx={{my: 2}}/>

                    <div className="csh-conferences-modal-summary">
                        <Typography sx={{mb: 2}} className="csh-conferences-modal-medium">
                            {summary}
                        </Typography>

                        {renderYouTubeEmbed(link)}
                    </div>
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export {ConferenceModal};
