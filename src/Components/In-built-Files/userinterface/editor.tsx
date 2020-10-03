import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { combinereducertype } from '../../ReduxStore/combinereducers';
import Markdown from 'markdown-to-jsx';
import http from '../../Mirage-Server/Axios/axios-api';
import { entry } from './../../Interfaces/entry.interface';
import { diary } from '../../Interfaces/diary.interface';
import { setCurrentlyEditing, setCanEdit } from './../../ReduxStore/editorslice';
import { updatediary } from '../../ReduxStore/diaryslice';
import { updateentry } from './../../ReduxStore/entryslice';
// import { showAlert } from '../../util';
import { useDispatch } from 'react-redux';

const Editor: FC = () => {
  const { currentlyEditing: entry, canEdit, activeDiaryId } = useSelector(
    (state: combinereducertype) => state.editor
  );
  const [editedEntry, updateEditedEntry] = useState(entry);
  const dispatch = useDispatch();

  const saveEntry = async () => {
    if (activeDiaryId == null) {
    //   return showAlert('Please select a diary.', 'warning');
    }
    if (entry == null) {
      http
        .post<entry, { diary: diary; entry: entry }>(
          `/diaries/entry/${activeDiaryId}`,
          editedEntry
        )
        .then((data) => {
          if (data != null) {
            const { diary, entry: _entry } = data;
            dispatch(setCurrentlyEditing(_entry));
            dispatch(updatediary(diary));
          }
        });
    } else {
      http
        .put<entry, entry>(`diaries/entry/${entry.id}`, editedEntry)
        .then((_entry) => {
          if (_entry != null) {
            dispatch(setCurrentlyEditing(_entry));
            dispatch(updateentry(_entry));
          }
        });
    }
    dispatch(setCanEdit(false));
  };

  useEffect(() => {
    updateEditedEntry(entry);
  }, [entry]);

  return (
    <div className="editor">
      <header
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: '0.2em',
          paddingBottom: '0.2em',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        {entry && !canEdit ? (
          <h4>
            {entry.titleofentry}
            <a
              href="#edit"
              onClick={(e) => {
                e.preventDefault();
                if (entry != null) {
                  dispatch(setCanEdit(true));
                }
              }}
              style={{ marginLeft: '0.4em' }}
            >
              (Edit)
            </a>
          </h4>
        ) : (
          <input
            value={editedEntry?.titleofentry ?? ''}
            disabled={!canEdit}
            onChange={(e) => {
              if (editedEntry) {
                updateEditedEntry({
                  ...editedEntry,
                  titleofentry: e.target.value,
                });
              } else {
                updateEditedEntry({
                    titleofentry: e.target.value,
                  description: '',
                });
              }
            }}
          />
        )}
      </header>
      {entry && !canEdit ? (
        <Markdown>{entry.description}</Markdown>
      ) : (
        <>
          <textarea
            disabled={!canEdit}
            placeholder="Supports markdown!"
            value={editedEntry?.description ?? ''}
            onChange={(e) => {
              if (editedEntry) {
                updateEditedEntry({
                  ...editedEntry,
                  description: e.target.value,
                });
              } else {
                updateEditedEntry({
                    titleofentry: '',
                  description: e.target.value,
                });
              }
            }}
          />
          <button onClick={saveEntry} disabled={!canEdit}>
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default Editor;