// export const SET_LOADING = 'SET_LOADING';

// export const setLoading = (isLoading) => ({
//   type: SET_LOADING,
//   payload: isLoading,
// });

export const PAGE_LOADED = 'PAGE_LOADED';
export const SET_LOADING_ON = 'SET_LOADING_ON';
export const SET_LOADING_OFF = 'SET_LOADING_OFF';
 
export const pageLoaded = () => ({
    type: PAGE_LOADED,
  })
 
export const setLoading = (isLoading) => ({
    type: isLoading ? SET_LOADING_ON : SET_LOADING_OFF,
    payload: isLoading,
});
 
