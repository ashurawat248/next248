import { createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoaderState { 
    loading: boolean; 
    subTest: any; 
    purchaseStatus: { 
        BASIC: boolean; 
        STANDARD: boolean; 
        PREMIUM: boolean; 
    }; 
}

interface PurchaseStatusPayload { 
    planType: 'BASIC' | 'STANDARD' | 'PREMIUM'; 
    status: boolean; 
}

const initialState: LoaderState = { 
    loading: false, 
    subTest: null, 
    purchaseStatus: { 
        BASIC: false, 
        STANDARD: false, 
        PREMIUM: false, 
    }, 
};


export const loaderSlice = createSlice({
    name: "loader",
    initialState: {
        loading: false,
        subTest:null,
        purchaseStatus: {
            BASIC: false,
            STANDARD: false, 
            PREMIUM: false,
        }
    },
    reducers: {
        setLoading: (state, action:PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setSubTest: (state, action:PayloadAction<any>) => {
            state.subTest = action.payload
        },
        setPurchaseStatus: (state, action:PayloadAction<PurchaseStatusPayload>) => { 
            const { planType, status } = action.payload; 
            state.purchaseStatus[planType] = status; }

    }
})


export const {setLoading, setSubTest, setPurchaseStatus} = loaderSlice.actions;

export default loaderSlice.reducer