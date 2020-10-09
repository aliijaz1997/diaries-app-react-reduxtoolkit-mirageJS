import { Response, Request } from 'miragejs';
import { handleErrors } from './server';
import { diary } from '../Interfaces/diary.interface';
import { entry } from '../Interfaces/entry.interface';
import dayjs from 'dayjs';
import { user } from '../Interfaces/user.interface';


export const create = (
    schema: any,
    req: Request
  ): { user: user; diary: diary } | Response => {
    try {
      const { titleofdiary, type, userid } = JSON.parse(req.requestBody) as Partial<
        diary
      >;
      const exUser = schema.users.findBy({ id: userid });
      if (!exUser) {
        return handleErrors(null, 'No such user exists.');
      }
      const now = dayjs().format();
      console.log(now);
      
      const diary = exUser.createDiary({
        titleofdiary,
        type,
        timeanddatewhendiarycreated: now,
        timeanddatewhendiaryupdated: now,
      });
      console.log(diary);
      
      return {
        user: {
          ...exUser.attrs,
        },
        diary: diary.attrs,
      };
    } catch (error) {
      return handleErrors(error, 'Failed to create Diary.');
    }
  };
  
  export const updateDiary = (schema: any, req: Request): diary | Response => {
    try {
      const diary = schema.diaries.find(req.params.id);
      const data = JSON.parse(req.requestBody) as Partial<diary>;
      const now = dayjs().format();
      
      diary.update({
        ...data,
        timeanddatewhendiaryupdated: now,
      });
      return diary.attrs as diary;
    } catch (error) {
      return handleErrors(error, 'Failed to update Diary.');
    }
  };
  
  export const getDiaries = (schema: any, req: Request): diary[] | Response => {
    try {
      const user = schema.users.find(req.params.id);
      return user.diary as diary[];
    } catch (error) {
      return handleErrors(error, 'Could not get user diaries.');
    }
  };

  export const addEntry = (
    schema: any,
    req: Request
  ): { diary: diary; entry: entry } | Response => {
    try {
      const diary = schema.diaries.find(req.params.id);
      const { titleofentry, description } = JSON.parse(req.requestBody) as Partial<entry>;
      const now = dayjs().format();
      const entry = diary.createEntry({
        titleofentry,
        description,
        timeanddatewhenentrycreated: now,
        timeanddatewhenentryupdated: now,
      });
      console.log(entry);
      
      diary.update({
        ...diary.attrs,
        timeanddatewhendiaryupdated: now,
      });
      return {
        diary: diary.attrs,
        entry: entry.attrs,
      };
    } catch (error) {
      return handleErrors(error, 'Failed to save entry.');
    }
  };
  
  export const getEntries = (
    schema: any,
    req: Request
  ): { entries: entry[] } | Response => {
    try {
      const diary = schema.diaries.find(req.params.id);
      return diary.entry;
    } catch (error) {
      return handleErrors(error, 'Failed to get Diary entries.');
    }
  };
  
  export const updateEntry = (schema: any, req: Request): entry | Response => {
    try {
      const entry = schema.entries.find(req.params.id);
      const data = JSON.parse(req.requestBody) as Partial<entry>;
      const now = dayjs().format();
      entry.update({
        ...data,
        timeanddatewhenentryupdated: now,
      });
      return entry.attrs as entry;
    } catch (error) {
      return handleErrors(error, 'Failed to update entry.');
    }
  };