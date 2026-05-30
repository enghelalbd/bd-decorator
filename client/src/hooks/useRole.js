import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import { axiosPublic } from './useAxios';

export default function useRole() {
    const { user, loading } = useAuth();
    const { data, isLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/auth/users/${user.email}`);
            return data;
        },
    });
    return { role: data?.role || 'user', status: data?.status, isLoading: loading || isLoading };
}
