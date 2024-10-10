import { selector } from "recoil";
import { courseState } from "../atoms/course";


export const isCourseLoading = selector({
    key:"isCourseLoadingstate",
    get:({get})=>{
         const state = get(courseState);
         return state.isLoading
    } 
});


export const courseTitle = selector({
    key:"courseTitleState",
    get:({get})=>{
         const state = get(courseState)
         if(state.course){
             return state.course.title;
         }
         return ""
    }
});


export const coursePrice = selector({
    key:"coursePriceState",
    get:({get})=>{
        const state = get(courseState);
        if(state.course){
             return state.course.price
        }
        return ""
    }
})

export const courseDetails = selector({
    key: 'courseDetailsState',
    get: ({get}) => {
      const state = get(courseState);
  
      return state.course;
    },
  });

export const courseDescription = selector({
    key:"courseDescriptionState",
    get:({get})=>{
        const state = get(courseState);
        if(state.course){
             return state.course.description
        }
        return ""
    }
})

export const courseAuthor = selector({
    key:"courseAuthorState",
    get:({get})=>{
        const state = get(courseState);
        if(state.course){
             return state.course.author
        }
        return ""
    }
})