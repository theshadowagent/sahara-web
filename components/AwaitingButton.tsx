import { Button, CircularProgress } from '@mui/material';
import React from 'react';

export const AwaitingButton = (props) => {
    const {
        loadingState,
        loadingText,
        setLoadingState,
        children,
        onClick,
        disabled,
        ...rest
    } = props
    const overrideOnClick = rest.type !== "submit"
    const isStateLoading = () => loadingState === LoadingState.LOADING || loadingState === LoadingState.AWAITING_CONFIRMATION
    return <Button
        {...rest}
        disabled={(disabled ?? false) || (isStateLoading())}
        onClick={overrideOnClick ? (e) => {
            setLoadingState(LoadingState.LOADING)
            onClick(e)
        } : onClick}
    >
        {isStateLoading() &&
            <CircularProgress
                size={16}
                sx={{ mr: 2 }}
                color="inherit" />
        }
        {isStateLoading() ? (loadingText ?? "Loading...") : children}
    </Button>
}

export enum LoadingState {
    NOT_STARTED,
    AWAITING_CONFIRMATION,
    LOADING,
    SUCCESS,
    ERROR
}

export default AwaitingButton
