// import axios from 'axios';
import { Activity } from './../store/useActivityStore';
import { ActivityKeyword } from '../store/useActivityKeywordStore';
import axiosInstance from './axiosInstance';

export interface NewActivity {
  title: string;
  content: string;
  startDate: Date;
  endDate: Date;
  projectTitle?: string;
  keywords: ActivityKeyword[] | number;
}

// 경험 수동 생성
export const createActivity = async (activity: Activity) => {
  try {
    const response = await axiosInstance.post('/activities', {
      title: activity.title,
      content: activity.content,
      startDate: activity.startDate,
      endDate: activity.endDate,
      keywords: activity.keywords,
      projectId: activity.projectId,
    });
    console.log('경험 수동 생성 성공: ', response.data);
    return response.data;
  } catch (error) {
    console.error('경험 수동 생성 실패: ', error);
  }
};

// 경험 수정
export const updateActivity = async (
  activityId: number,
  activity: Activity,
) => {
  try {
    const response = await axiosInstance.patch(`/activities/${activityId}`, {
      title: activity.title,
      content: activity.content,
      startDate: activity.startDate,
      endDate: activity.endDate,
      keywords: activity.keywords,
      projectId: activity.projectId,
    });
    return response.data;
  } catch (error) {
    console.error('경험 수정 실패: ', error);
  }
};

// 경험 목록 조회
export const fetchActivities = async (
  word: string | null,
  keywords: number[],
  projects: number[],
) => {
  try {
    const response = await axiosInstance.post('/activities/search', {
      word: word,
      keywords: keywords,
      projects: projects,
    });

    return response.data.activities;
  } catch (error) {
    console.error('경험 목록 조회 실패: ', error);
  }
};

// 경험 id 조회
export const fetchActivityById = async (activityId: number) => {
  try {
    const response = await axiosInstance.get(`/activities/${activityId}`);
    return response.data;
  } catch (error) {
    console.error('경험 상세 조회 실패: ', error);
  }
};

export const deleteActivity = async (activityId: number) => {
  try {
    await axiosInstance.delete(`/activities/${activityId}`);
  } catch (error) {
    console.error('경험 삭제 실패: ', error);
  }
};

// 경험 AI 생성
export const createActivityAi = async (content: string) => {
  const data = await axiosInstance.get('/keywords');

  // console.log(data.data.keywords);

  const response = await axiosInstance.post(
    '/rabbitmq/send/experience',
    // const response = await axios.post(
    //   'https://bbogle.me/ai/generate/experience',
    {
      retrospective_content: content,
      keywords: data.data.keywords,
    },
    { timeout: 300000 }, // 3분 타임아웃
  );

  console.log(response.data);
  return response.data.experiences;
};

// 추출된 경험 선택
export const saveActivityApi = async (
  projectId: number,
  savedActivities: number[],
  newActivities: NewActivity[],
) => {
  try {
    const transformedActivities = newActivities.map((activity) => ({
      ...activity,
      keywords: activity.keywords[0].id, // keywords를 id만 포함
    }));

    await axiosInstance.post(`/projects/${projectId}/activities`, {
      savedActivities: savedActivities,
      newActivities: transformedActivities,
    });
  } catch (error) {
    console.error('경험 선택 저장 실패: ', error);
  }
};
