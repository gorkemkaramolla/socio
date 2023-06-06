import create from 'zustand';

interface UseChatToggleState {
    show: boolean;
    setShow: (x: boolean) => void;
}

const useChatToggle = create<UseChatToggleState>((set) => ({
    show: false,
    setShow: (x: boolean) => {
        set(() => ({
            show: x,
        }));
    },
}));

export default useChatToggle;
