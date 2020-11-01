const INITIAL_STATE = {
   allDiscussions:[],
   watchVideos:[]
}   

const postsReducer = (state = INITIAL_STATE, action) => {

    switch(action.type){
        case 'ADD_ALL_DISCUSSIONS':
            return {
                ...state,
                allDiscussions: action.payload
            }
        case 'ADD_WATCH_VIDEOS':
            return {
                ...state,
                watchVideos: action.payload
            }
        default :
          return state
    }
}
export default postsReducer