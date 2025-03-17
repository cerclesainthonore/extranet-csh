import {List, Datagrid, TextField, DateField, EditButton, DeleteButton, SelectField} from 'react-admin';

export const ConferenceList = () => (
    <List>
        <Datagrid>
            <TextField source="title" />
            <TextField source="authors" />
            <DateField source="date" locales="fr-FR"/>
            <SelectField source="tags" choices={tags}/>
            <TextField source="coverFilename" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
