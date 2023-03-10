import * as React from 'react';

//import { SPUser } from '@microsoft/sp-page-context';
import { Toggle } from '@fluentui/react/lib/Toggle';

import { BaseComponentContext } from '@microsoft/sp-component-base';

import CreatedByFilter from './filterComponents/CreatedByFilter'
import FileTypeFilter from './filterComponents/FileTypeFilter'
import SaveUserQueryComponent from './userQueryComponents/SaveUserQueryComponent';
import LoadUserQueryComponent from './userQueryComponents/LoadUserQueryComponent';

export interface IAcSearchAdvancedOptions {
  context: BaseComponentContext
}

const AcSearcAdvancedOptons = ({ context }: IAcSearchAdvancedOptions) => {
  const [openAdvanced, setOpenAdvanced] = React.useState(true)

  return (
    <>
      <Toggle
        label="Advanced Options"
        inlineLabel
        checked={openAdvanced}
        onChange={e => setOpenAdvanced(!openAdvanced)}
      />
      {openAdvanced &&
        <div style={{ padding: '1rem' }}>
          <CreatedByFilter context={context} />
          <FileTypeFilter />

          <LoadUserQueryComponent />
          <SaveUserQueryComponent />
        </div>
      }
    </>
  );
}

export default AcSearcAdvancedOptons;