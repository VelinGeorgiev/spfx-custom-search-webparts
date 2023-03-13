import * as React from 'react';

import { SearchContext } from '../../hooks/SearchContext';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const options: IDropdownOption[] = [
  { key: 'docx', text: 'Word' }, //todo: account for doc not only docx
  { key: 'pptx', text: 'PowerPoint' }, //todo: account for ppt not only pptx
  { key: 'pdf', text: 'PDF' },
  { key: 'xlsx', text: 'Excel' }, //todo: account for xls not only xlsx
  { key: 'txt', text: 'Text File' },
  { key: 'msg', text: 'Email File' },
  { key: 'one', text: 'OneNote' }
];

const FileTypeFilter = () => {
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const { searchReducer, dispatchSearchReducer } = React.useContext(SearchContext);

  React.useEffect(() => {

    if (searchReducer.lastActionType == 'load' &&
      searchReducer.filters &&
      searchReducer.filters.fileTypeFilter &&
      searchReducer.filters.fileTypeFilter.jsonValues
    ) {

      setSelectedOptions(searchReducer.filters.fileTypeFilter.jsonValues);

    } else if (searchReducer.lastActionType == 'load') {

      setSelectedOptions([]);
    }

  }, [searchReducer])

  const updateKqlQuery = (_: any, option: IDropdownOption) => {

    let kqlText = '';
    const options = selectedOptions;


    const idx = options.indexOf(option.key);
    idx > -1 ? options.splice(idx, 1) : options.push(option.key);

    setSelectedOptions(options);

    for (let i = 0; i < options.length; i++) {

      kqlText += `FileExtension:${options[i]} OR FileType:${options[i]}${i < options.length - 1 ? ` OR ` : ''}`;
    }

    dispatchSearchReducer({ type: 'fileTypeFilter', payload: { kqlText, jsonValues: options } })
  }

  return (
    <Dropdown
      placeholder="Select options"
      label="File Type"
      multiSelect
      options={options}
      selectedKeys={selectedOptions}
      styles={dropdownStyles}
      onChange={updateKqlQuery}
    />
  );
}

export default FileTypeFilter;