import create from 'zustand';

const useLive = create((set, get) => ({
    live: false,
    setLive: (value) => {
        if (value instanceof Function) {
            const { live } = get();
            set({ live: value(live) });
        } else {
            set({ live: value });
        }
    },
}));

export default useLive;
