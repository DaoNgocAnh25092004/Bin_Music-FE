import { useMutation } from '@tanstack/react-query';

export const useGenericMutation = (fnCallback) => {
    const mutation = useMutation({
        mutationFn: fnCallback,
    });

    return mutation;
};
