import create from 'zustand';

const useLive = create((set) => ({
    live: false,
    setLive: (value) => set({ live: value }),
}));

export default useLive;
