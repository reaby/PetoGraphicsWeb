import { create } from 'zustand';

const useCountdowns = create((set, get) => ({
    countdowns: [],
    setCountdowns: (value) => {
        if (value instanceof Function) {
            const { countdowns } = get();
            set({ countdowns: value(countdowns) });
        } else {
            set({ countdowns: value });
        }
    },
}));

export default useCountdowns;
