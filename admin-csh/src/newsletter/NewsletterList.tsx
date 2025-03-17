import {List, Datagrid, TextField, EmailField, EditButton, DeleteButton, DateField, SelectField} from 'react-admin';
import {discoveredViaOptions} from "./discovered-via-options.ts";

export const NewsletterList = () => (
    <List>
        <Datagrid>
            <TextField source="name" />
            <EmailField source="mail" />
            <TextField source="phone" />
            <SelectField source="gender" choices={discoveredViaOptions} />
            <DateField source="createdAt" locales="fr-FR"/>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
