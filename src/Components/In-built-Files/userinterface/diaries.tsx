import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { combinereducertype } from '../../ReduxStore/combinereducers';
import http from '../../Mirage-Server/Axios/axios-api';
import { diary } from '../../Interfaces/diary.interface';
import { addDiary, updateDiary } from './../../ReduxStore/diaryslice';
import Swal from 'sweetalert2';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { user } from '../../Interfaces/user.interface';
import { setuser } from '../../ReduxStore/userslice';
import { Link, Route, Switch } from 'react-router-dom';
import DiaryEntriesList from './diaryentrieslist';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Card, CardContent } from '@material-ui/core';
import { setCanEdit, setActiveDiaryId, setCurrentlyEditing } from '../../ReduxStore/editorslice';
import Editor from './editor';
import CommentIcon from '@material-ui/icons/Comment';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import './Dieries.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    gridd: {
      backgroundImage: `url(https://img.freepik.com/free-photo/bokeh-abstract-blurred-silver-white-beautiful-background-soft-color-light-glitter-sparkles_51768-59.jpg?size=626&ext=jpg)`
    },
    control: {
      padding: theme.spacing(2),
    },
    grid: {
      margin: '5px 5px 5px',
      boxShadow: '0px 5px 5px Navy'
    },
    button: {
      '& > *': {
        margin: theme.spacing(1),
      },
    }
  }),
);
// type proptype = {
//   diary : diary
// }

const Diaries: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const diaries = useSelector((state: combinereducertype) => state.diaries);
  const user = useSelector((state: combinereducertype) => state.user);
  const [priate, setPrivate] = useState(true);
  const [editor, setEditor] = useState(false);
  const [diary, setDiary] = useState<diary>();
  const [isEditing, setIsEditing] = useState(false);
  // const totalentries = diary?.entryids?.length;
  useEffect(() => {
    const fetchDiaries = async () => {
      if (user) {
        http.get<null, diary[]>(`diaries/${user.id}`).then((data) => {
          if (data && data.length > 0) {
            const sortedByUpdatedAt = data.sort((a, b) => {
              return dayjs(b.timeanddatewhendiaryupdated).unix() - dayjs(a.timeanddatewhendiaryupdated).unix();
            });
            dispatch(addDiary(sortedByUpdatedAt));
          }
        });
      }
    };
    fetchDiaries();
  }, [dispatch, user]);
  const saveChanges = () => {
    http
      .put<diary, diary>(`/diaries/${diary?.id}`, diary)
      .then((diary) => {
        if (diary) {
          dispatch(updateDiary(diary));
          //   showAlert('Saved!', 'success');
        }
      })
      .finally(() => {
        setIsEditing(false);
      });
  };
  const createDiary = async () => {
    const result: any = await Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next →',
      showCancelButton: true,
      progressSteps: ['1', '2'],
    }).queue([
      {
        titleText: 'Diary title',
        input: 'text',
      },
      {
        titleText: 'Private or public diary?',
        input: 'radio',
        inputOptions: {
          private: 'Private',
          public: 'Public',
        },
        inputValue: 'private',
      },
    ]);
    if (result.value) {
      const { value } = result;
      const {
        diary,
        user: _user,
      } = await http.post<Partial<diary>, { diary: diary; user: user }>('/diaries/', {
        titleofdiary: value[0],
        type: value[1],
        userid: user?.id,
      });
      if (diary && user) {
        dispatch(addDiary([diary] as diary[]));
        dispatch(addDiary([diary] as diary[]));
        dispatch(setuser(_user));
        return Swal.fire({
          titleText: 'All done!',
          confirmButtonText: 'OK!',
        });
      }
    }
    Swal.fire({
      titleText: 'Cancelled',
    });
  };

  return (
    <div className='backimage' >
      <Fab className = 'button333' onClick={() => setEditor(!editor)} color="primary">
        {!editor ? <CommentIcon /> : <KeyboardBackspaceIcon />}
      </Fab>
      {!editor ?
        <Switch>
          <Route path="/diary/:id">
            <DiaryEntriesList />
          </Route>
          <Route path='/' >
            <div className={classes.button}>
              <Fab onClick={createDiary} color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </div>
            <Grid container className={classes.root} spacing={2}>
              <span className='headingofdiaries'>Diaries</span>
              <Grid item xs={12}>
                <Grid container justify="center" >
                  {diaries.map((diary, idx) => (
                    <Grid key={idx} className={classes.grid} item >
                      <div className='Container' >
                        <Card className={classes.gridd}>
                          <CardContent>
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
                                  <span className='heading'>{diary.titleofdiary}</span>
                                )}
                              <hr />
                            </h2>
                            {/* <p className="subtitle"> {diary?.entryids} saved entries</p> */}
                            <div style={{ display: 'flex' }}>
                              <div className="timeinfo"><p className="time">Created at:</p> {diary.timeanddatewhendiarycreated}
                                {/* <br/> */}
                                <p className="time">Updated at:</p> {diary.timeanddatewhendiaryupdated}</div>

                            </div>
                          </CardContent>
                          <hr/>
                          <span>
                            <Link to={`diary/${diary.id}`} style={{ width: '100%' }}>
                              <button className='button' >
                                Vew Diary
                              </button>
                            </Link>
                          </span>
                          <span>
                            <button
                              className='button'
                              onClick={() => {
                                setEditor(!editor);
                                dispatch(setCanEdit(true));
                                dispatch(setActiveDiaryId(diary.id as string));
                                dispatch(setCurrentlyEditing(null));
                              }}
                            >
                              Add New Entry
                             </button>
                          </span>
                          <div onClick={() => setPrivate(!priate)} >
                            {priate ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon />}
                          </div>
                        </Card>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Route>
        </Switch>
        : <Editor visible={editor} />
      }
    </div >
  );
};

export default Diaries;