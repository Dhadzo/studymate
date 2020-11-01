import { type } from "os"

export const addAllDiscussions = (discussions) => ({
    type: 'ADD_ALL_DISCUSSIONS',
    payload: discussions
})

export const addDiscussionsUsers = (users) => ({
    type: 'ADD_DISCUSSIONS_USERS',
    payload: users
})

export const addDiscussionsCreators = (creators) => ({
    type: 'ADD_DISCUSSIONS_CREATORS',
    payload: creators
})
export const addWatchVideos = (videos) => ({
    type: 'ADD_WATCH_VIDEOS',
    payload: videos
})