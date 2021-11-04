import create from 'zustand'



const useStore = create((set)=>({

  position: 0,
  mode: "day",

  setPosition: (position) => set((state)=>({position})),
  setMode: (mode) => set((state)=>({mode}))

}));


export default useStore;