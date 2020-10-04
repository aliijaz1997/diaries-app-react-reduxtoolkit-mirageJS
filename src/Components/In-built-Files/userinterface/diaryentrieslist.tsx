import React, { FC, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { combinereducertype } from '../../ReduxStore/combinereducers';
import http from '../../Mirage-Server/Axios/axios-api';
import { entry } from '../../Interfaces/entry.interface';
import { setentries } from '../../ReduxStore/entryslice';
import { setCurrentlyEditing, setCanEdit } from '../../ReduxStore/editorslice';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

const DiaryEntriesList: FC = () => {
  
  const { enteries } = useSelector((state: combinereducertype) => state);
  const dispatch = useDispatch();
  const {  } = useParams();

  useEffect(() => {
    if (id != null) {
      http
        .get<null, { entries: entry[] }>(`/diaries/entries/${id}`)
        .then(({ entries: _entries }) => {
          if (_entries) {
            const sortByLastUpdated = _entries.sort((a, b) => {
              return dayjs(b.timeanddatewhenentryupdated).unix() - dayjs(a.timeanddatewhenentryupdated).unix();
            });
            dispatch(setentries(sortByLastUpdated));
          }
        });
    }
  }, [id, dispatch]);

  return (
    <div className="entries">
      <header>
        <Link to="/">
          <h3>← Go Back</h3>
        </Link>
      </header>
      <ul>
        {enteries.map((entry) => (
          <li
            key={entry.id}
            onClick={() => {
              dispatch(setCurrentlyEditing(entry));
              dispatch(setCanEdit(true));
            }}
          >
            {entry.titleofentry}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaryEntriesList;