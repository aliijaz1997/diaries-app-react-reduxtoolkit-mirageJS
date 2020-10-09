import React, { FC, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { combinereducertype } from '../../ReduxStore/combinereducers';
import http from '../../Mirage-Server/Axios/axios-api';
import { entry } from '../../Interfaces/entry.interface';
import { setEntries } from '../../ReduxStore/entryslice';
import { setCurrentlyEditing, setCanEdit } from '../../ReduxStore/editorslice';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import Editor from './editor';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import LineStyleIcon from '@material-ui/icons/LineStyle';
import Fab from '@material-ui/core/Fab';
import './Dieries.css';

const useStyles = makeStyles({
  root: {
    minWidth: 375,
    minHeight: 310,
    background : 'cornSilk'
    
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    color : 'white'
  },
  pos: {
    marginBottom: 12,
  },
});

const DiaryEntriesList: FC = () => {
  const classes = useStyles();
  const { enteries } = useSelector((state: combinereducertype) => state);
  const dispatch = useDispatch();
  const [list, setList] = useState<boolean>(false)
  const { id } = useParams();

  useEffect(() => {
    if (id != null) {
      http
        .get<null, { entries: entry[] }>(`/diaries/entries/${id}`)
        .then(({ entries: _entries }) => {
          if (_entries) {
            const sortByLastUpdated = _entries.sort((a, b) => {
              return dayjs(b.timeanddatewhenentryupdated).unix() - dayjs(a.timeanddatewhenentryupdated).unix();
            });
            dispatch(setEntries(sortByLastUpdated));

          }
        });
    }
  }, [id, dispatch]);

  return (
    <>
      <br />
      <Fab className='button333' onClick={() => setList(!list)} color="primary" aria-label="add">
        {!list ? <FormatListBulletedIcon /> : <LineStyleIcon />}
      </Fab>
      {list ?
        <div className="entries">
          <header>
            <Link to="/">
              <Fab className='button333' color="primary" >
                <button style={{ backgroundColor: 'white' }} ><KeyboardBackspaceIcon /></button>
              </Fab>
            </Link>
          </header>
          {enteries.map((entry) => (
            < div className = 'mainentry'>
              <Card key={entry.id}
                onClick={() => {
                  dispatch(setCurrentlyEditing(entry));
                  dispatch(setCanEdit(true));
                }} className={classes.root}>
                <CardContent>
              <h1 className = 'tiltleofentry' >{entry.titleofentry}</h1>
              <br/>
              <h3 className = 'descofentry'>{entry.description}</h3>
              <br/>
              <p className = 'timeanddate'>Created at: {entry.timeanddatewhenentrycreated}</p>
              <p className = 'timeanddate'>Updated at: {entry.timeanddatewhenentryupdated}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        :
        <Editor visible={!list} />}
    </>
  );
};

export default DiaryEntriesList;