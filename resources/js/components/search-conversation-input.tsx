import { Input } from '@/components/ui/input';
import { useDebounceFn } from '@/hooks/use-debounce';
import { home } from '@/routes';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function SearchConversationInput() {
    const [search, setSearch] = useState('');

    const handleSearch = (value: string) => {
        setSearch(value);

        router.get(home(), value.trim().length ? { search: value } : {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ['conversations'],
        });
    };

    const debouncedSearch = useDebounceFn(handleSearch, 300);

    return (
        <Input
            type="text"
            placeholder="Rechercher"
            className="mb-4"
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                debouncedSearch(e.target.value);
            }}
        />
    );
}
