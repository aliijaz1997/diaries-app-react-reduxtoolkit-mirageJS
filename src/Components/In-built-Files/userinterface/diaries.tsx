import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { combinereducertype } from '../../ReduxStore/combinereducers';
import http from '../../Mirage-Server/Axios/axios-api';
import { diary } from '../../Interfaces/diary.interface';
import { creatediary } from './../../ReduxStore/diaryslice';
import Swal from 'sweetalert2';
import { setuser } from '../../ReduxStore/userslice';
import DiaryTile from './diaryface';
import { user } from '../../Interfaces/user.interface';
import { Route, Switch } from 'react-router-dom';
import DiaryEntriesList from './diaryentrieslist';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

const Diaries: FC = () => {
  const dispatch = useDispatch();
  const diaries = useSelector((state: combinereducertype) => state.diaries);
  const user = useSelector((state: combinereducertype) => state.user);

  useEffect(() => {
    const fetchDiaries = async () => {
      if (user) {
        http.get<null, diary[]>(`diaries/${user.id}`).then((data) => {
          if (data && data.length > 0) {
            const sortedByUpdatedAt = data.sort((a, b) => {
              return dayjs(b.timeanddatewhendiaryupdated).unix() - dayjs(a.timeanddatewhendiaryupdated).unix();
            });
            dispatch(creatediary(sortedByUpdatedAt));
          }
        });
      }
    };
    fetchDiaries();
  }, [dispatch, user]);

  const createDiary = async () => {
    const result : any = await Swal.mixin({
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
        title: value[0],
        type: value[1],
        userId: user?.id,
      });
      if (diary && user) {
        dispatch(creatediary([diary] as diary[]));
        dispatch(creatediary([diary] as diary[]));
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
    <div style={{ padding: '1em 0.4em' }}>
      <Switch>
        <Route path="/diary/:id">
          <DiaryEntriesList />
        </Route>
        <Route path="/">
          <button onClick={createDiary}>Create New</button>
          {diaries.map((diary, idx) => (
            <DiaryTile key={idx} diary={diary} />
          ))}
        </Route>
      </Switch>
    </div>
  );
};

export default Diaries;