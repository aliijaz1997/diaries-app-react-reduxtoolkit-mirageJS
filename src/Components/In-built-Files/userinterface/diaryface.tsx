import React, { FC, useState } from 'react';
import { diary } from '../../Interfaces/diary.interface';
import http from '../../Mirage-Server/Axios/axios-api';
import { updatediary } from './../../ReduxStore/diaryslice';
import { setCanEdit, setActiveDiaryId, setCurrentlyEditing } from '../../ReduxStore/editorslice';
// import { showAlert } from '../../util';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface Props {
  diary: diary;
}

const buttonStyle: React.CSSProperties = {
  fontSize: '0.7em',
  margin: '0 0.5em',
};

const DiaryTile: FC<Props> = (props) => {
  const [diary, setDiary] = useState(props.diary);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const totalEntries = props.diary?.entryids?.length;

  const saveChanges = () => {
    http
      .put<diary, diary>(`/diaries/${diary.id}`, diary)
      .then((diary) => {
        if (diary) {
          dispatch(updatediary(diary));
        //   showAlert('Saved!', 'success');
        }
      })
      .finally(() => {
        setIsEditing(false);
      });
  };

  return (
    <div className="diary-tile">
      <h2
        className="title"
        title="Click to edit"
        onClick={() => setIsEditing(true)}
        style={{
          cursor: 'pointer',
        }}
      >
        {isEditing ? (
          <input
            value={diary.titleofdiary}
            onChange={(e) => {
              setDiary({
                ...diary,
                titleofdiary: e.target.value,
              });
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                saveChanges();
              }
            }}
          />
        ) : (
          <span>{diary.titleofdiary}</span>
        )}
      </h2>
      <p className="subtitle">{totalEntries ?? '0'} saved entries</p>
      <div style={{ display: 'flex' }}>
        <button
          style={buttonStyle}
          onClick={() => {
            dispatch(setCanEdit(true));
            dispatch(setActiveDiaryId(diary.id as string));
            dispatch(setCurrentlyEditing(null));
          }}
        >
          Add New Entry
        </button>
        <Link to={`diary/${diary.id}`} style={{ width: '100%' }}>
          <button className="secondary" style={buttonStyle}>
            View all →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DiaryTile;