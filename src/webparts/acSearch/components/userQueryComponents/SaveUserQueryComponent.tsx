import * as React from 'react';

import { SearchContext } from '../../hooks/SearchContext';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { TextField } from '@fluentui/react/lib/TextField';
import UserSearchQueryService from '../../services/UserSearchQueryService';

const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Save your search query',
    subText: '',
};

const SaveUserQueryComponent = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [queryName, setQueryName] = React.useState('');
    const { searchReducer } = React.useContext(SearchContext);

    const save = () => {

        const userSerchService = UserSearchQueryService();
        userSerchService.saveSearchQuery(queryName, searchReducer);

        setOpenDialog(!openDialog);
    }

    return (
        <>
            <PrimaryButton text="Save Search" onClick={e => setOpenDialog(!openDialog)} />
            <Dialog
                hidden={!openDialog}
                onDismiss={e => setOpenDialog(!openDialog)}
                dialogContentProps={dialogContentProps}
            >
                <TextField label="Specify a Name" onChange={(e, name) => setQueryName(name)} />
                <DialogFooter>
                    <PrimaryButton onClick={save} text="Save" />
                    <PrimaryButton onClick={e => setOpenDialog(!openDialog)} text="Cancel" />
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default SaveUserQueryComponent;