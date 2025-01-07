import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = (fnCallback) => {
    const mutation = useMutation({
        mutationFn: fnCallback,
    });
    return mutation;
};

export const useSignUpMutation = (fnCallback) => {
    const mutation = useMutation({
        mutationFn: fnCallback,
    });
    return mutation;
};

export const useUpdatePlayerMutation = (fnCallback) => {
    const mutation = useMutation({
        mutationFn: fnCallback,
    });
    return mutation;
};

export const useCreateGameMutation = (fnCallback) => {
    const mutation = useMutation({
        mutationFn: fnCallback,
    });
    return mutation;
};
