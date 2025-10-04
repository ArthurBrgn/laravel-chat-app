import { logout } from '@/routes';
import { Link, router } from '@inertiajs/react';

export default function Dashboard() {
    const handleLogout = () => {
        router.flushAll();
    };

    return (
        <>
            <h1>Dashboard</h1>
            <Link
                className="block w-full"
                href={logout()}
                as="button"
                onClick={handleLogout}
                data-test="logout-button"
            >
                Log out
            </Link>
        </>
    );
}
