import {create} from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface useBackgroundBlur {
    blur: boolean
}


const useBackgroundBlur = create((set) => ({
    blur: false,
    setBlur: (x:boolean) => {
        set(() => ({
            blur: x
        }))
    }
}));

export default useBackgroundBlur;
