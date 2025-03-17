import {Create, SelectInput, SimpleForm, TextInput} from 'react-admin';
import {discoveredViaOptions} from "./discovered-via-options.ts";

export const NewsletterCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="mail" />
            <SelectInput source="gender" choices={discoveredViaOptions} />
            <TextInput source="phone" />
        </SimpleForm>
    </Create>
);
