import create from 'zustand';

const useCountdowns = create((set) => ({
    countdowns: false,
    setCountdowns: (value) => set({ live: value }),
}));

export default useCountdowns;
